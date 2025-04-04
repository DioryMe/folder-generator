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

const resolvePath = (address: string, dioryObject: IDioryObject) => {
  const { data = [] } = dioryObject
  const { contentUrl = '' } = data.find(({ contentUrl }) => contentUrl) || {}
  return contentUrl ? contentUrl : address
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
      const id = dioryObject.id === diograph['/'].id ? '/' : key
      const path = join(folderPath, resolvePath(id, dioryObject))
      diories[path] = new Diory(dioryObject)
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
