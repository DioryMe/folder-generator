import { join } from 'path-browserify'
import { IDataClient } from '@diory/types'
import { Diory, IDioryObject, IDiographObject } from '@diograph/diograph'

import { IDiories, IFolderPath } from '../types'

const getDiograph = async (
  rootUrl: string,
  folderPath: string,
  client: IDataClient,
): Promise<IDiographObject> => {
  const folderUrl = join(rootUrl, folderPath, 'diograph.json')
  let diograph: IDiographObject = {}
  try {
    const diographString = await client.readTextItem(folderUrl)
    diograph = JSON.parse(diographString)
  } catch (error) {
    // diories.json not found
  }
  return diograph
}

const getRelativeContentDiories = (folderPath: string, dioryObject: IDioryObject): IDiories => {
  const { data = [] } = dioryObject
  const updatedData = data.map(({ contentUrl, ...item }) => ({
    contentUrl: contentUrl.startsWith('/') ? join(folderPath, contentUrl) : contentUrl,
    ...item,
  }))

  return data
    .map(({ contentUrl }) => contentUrl)
    .filter((contentUrl) => contentUrl && contentUrl.startsWith('/'))
    .reduce((diories: IDiories, contentUrl: string) => {
      const path = join(folderPath, contentUrl)
      diories[path] = new Diory({ ...dioryObject, data: updatedData })
      return diories
    }, {})
}

const getFolderDiories = async (
  rootUrl: string,
  folderPath: string,
  client: IDataClient,
): Promise<IDiories> => {
  const diograph: IDiographObject = await getDiograph(rootUrl, folderPath, client)
  // Validate diograph
  return Object.entries(diograph)
    .filter(([key]) => key !== '/')
    .reduce((diories: IDiories, [key, dioryObject]: [string, IDioryObject]) => {
      const contentDiories = getRelativeContentDiories(folderPath, dioryObject)
      Object.assign(diories, contentDiories)

      if (!Object.keys(contentDiories).length) {
        const id = dioryObject.id === diograph['/'].id ? '/' : key
        const path = join(folderPath, id)
        Object.assign(diories, { [path]: new Diory(dioryObject) })
      }

      return diories
    }, {})
}

export const getDiories = async (
  rootUrl: string,
  client: IDataClient,
  folderPaths: IFolderPath[],
): Promise<IDiories> => {
  const diories: IDiories = {}
  await Promise.all(
    folderPaths.map(async ({ path, subfolderNames }) => {
      const folderDiories = await getFolderDiories(rootUrl, path, client)
      Object.assign(diories, folderDiories) // Parent before children
      return
    }),
  )
  return diories
}
