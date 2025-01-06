import { join } from 'path-browserify'
import { Diory } from '@diograph/diograph'
import { IDioryObject, IDataClient, IDiographObject } from '@diory/types'

import { IDiories, IFolderPath } from '../types'

const getFolderDiories = async (
  rootUrl: string,
  folderPath: string,
  client: IDataClient,
): Promise<IDiories> => {
  const folderUrl = join(rootUrl, folderPath, 'diograph.json')
  let diograph: IDiographObject = {}
  try {
    const diographString = await client.readTextItem(folderUrl)
    diograph = JSON.parse(diographString)
  } catch (error) {
    // diories.json not found
  }
  return Object.entries(diograph)
    .filter(([key, { id }]) => key !== id)
    .reduce((diories: IDiories, [name, { id }]: [string, IDioryObject]) => {
      const dioryObject = diograph[id]
      if (dioryObject) {
        const path = name === '/' ? folderPath : join(folderPath, name)
        diories[path] = new Diory(dioryObject)
      }
      return diories
    }, {})
}

const getSubfolderDiories = async (
  rootUrl: string,
  subfolderPaths: string[],
  client: IDataClient,
) => {
  let diories: IDiories = {}
  await Promise.all(
    subfolderPaths.map(async (subfolderPath) => {
      const subfolderDiories = await getFolderDiories(rootUrl, subfolderPath, client)
      const subfolderDiory = subfolderDiories[subfolderPath]
      if (subfolderDiory) {
        Object.assign(diories, { [subfolderPath]: subfolderDiory })
      }
      return
    }),
  )
  return diories
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
      Object.assign(diories, folderDiories)
      if (subfolderNames) {
        const subfolderPaths = subfolderNames.map((subfolderName) => join(path, subfolderName))
        const subfolderDiories = await getSubfolderDiories(rootUrl, subfolderPaths, client)
        Object.assign(diories, subfolderDiories)
      }
      return
    }),
  )
  return diories
}
