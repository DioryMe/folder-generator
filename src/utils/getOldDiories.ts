import { join } from 'path-browserify'
import { IDataClient } from '@diory/types'
import { Diory, IDiory, IDioryObject, IDiographObject } from '@diograph/diograph'

import { IDiories, IFolderPath } from '../types'

const getDiograph = async (
  rootUrl: string,
  folderPath: string,
  client: IDataClient,
): Promise<IDiographObject> => {
  try {
    const folderUrl = join(rootUrl, folderPath, 'diograph.json')
    const diographString = await client.readTextItem(folderUrl)
    return JSON.parse(diographString)
  } catch (error) {
    // diories.json not found
    return {}
  }
}

const isRootKey = (key: string) => key === '/'
const isFolderKey = (key: string) => key.endsWith('/')
const isNotFolderDiory =
  (diograph: IDiographObject) =>
  ([dioryKey, dioryObject]: [string, IDioryObject]) =>
    isFolderKey(dioryKey) ||
    !Object.keys(diograph)
      .filter((key) => key.startsWith('/'))
      .some((key) => diograph[key].id === dioryObject.id)

const mapRootDiory =
  (rootDiory: IDioryObject) =>
  ([key, dioryObject]: [string, IDioryObject]): [string, IDioryObject] => {
    if (isRootKey(key)) {
      return [key, rootDiory]
    }
    return [key, dioryObject]
  }

const hasRelativeContentUrl = (dioryObject: IDioryObject) =>
  dioryObject.data?.some(({ contentUrl }) => contentUrl && contentUrl.startsWith('/'))

const getContentUrlPaths = (folderPath: string, { data = [] }: IDioryObject): string[] =>
  data
    .map(({ contentUrl }) => contentUrl)
    .filter((contentUrl) => contentUrl && contentUrl.startsWith('/'))
    .map((contentUrl) => join(folderPath, contentUrl))

const resolvePaths =
  (folderPath: string) =>
  ([key, dioryObject]: [string, IDioryObject]): [string, IDioryObject][] => {
    const dioryPath = join(folderPath, key)
    if (isRootKey(key)) {
      return [[dioryPath, dioryObject]]
    }
    if (hasRelativeContentUrl(dioryObject)) {
      return getContentUrlPaths(folderPath, dioryObject).map((path) => [path, dioryObject])
    }
    return [[dioryPath, dioryObject]]
  }

const updateData = (dioryPath: string, { data = [] }: IDioryObject) => {
  return data.map(({ contentUrl, ...item }) => ({
    contentUrl: contentUrl.startsWith('/') ? dioryPath : contentUrl,
    ...item,
  }))
}

const mapContentDiory = ([dioryPath, dioryObject]: [string, IDioryObject]): [
  string,
  IDioryObject,
] => {
  if (hasRelativeContentUrl(dioryObject)) {
    return [dioryPath, { ...dioryObject, data: updateData(dioryPath, dioryObject) }]
  }
  return [dioryPath, dioryObject]
}

const mapSubFolderDiory =
  (rootUrl: string, client: IDataClient) =>
  async ([dioryPath, dioryObject]: [string, IDioryObject]): Promise<[string, IDioryObject]> => {
    if (isFolderKey(dioryPath)) {
      const subFolderDiograph = await getDiograph(rootUrl, dioryPath, client)
      const rootId = subFolderDiograph['/']?.id
      if (rootId && subFolderDiograph[rootId]) {
        return [dioryPath, subFolderDiograph[rootId]]
      }
    }

    return [dioryPath, dioryObject]
  }

const getOldDioriesFromFolder = async (
  rootUrl: string,
  folderPath: string,
  client: IDataClient,
): Promise<IDiories> => {
  const diograph: IDiographObject = await getDiograph(rootUrl, folderPath, client)
  const rootDiory = diograph[diograph['/']?.id]

  const dioryEntries = await Promise.all(
    Object.entries(diograph)
      .filter(isNotFolderDiory(diograph)) // TODO: Revert logic to use actual diories
      .flatMap(resolvePaths(folderPath))
      .map(mapRootDiory(rootDiory))
      .map(mapContentDiory)
      .map(mapSubFolderDiory(rootUrl, client)),
  )

  return Object.fromEntries(
    dioryEntries.map(([dioryPath, dioryObject]) => [dioryPath, new Diory(dioryObject)]),
  )
}

export const getOldDiories = async (
  rootUrl: string,
  folderPaths: IFolderPath[],
  client: IDataClient,
): Promise<IDiories> => {
  const diories: IDiories = {}

  await Promise.all(
    folderPaths.map(async ({ path }) => {
      const folderDiories = await getOldDioriesFromFolder(rootUrl, path, client)
      Object.assign(diories, folderDiories) // Parent before children
      return
    }),
  )
  return diories
}
