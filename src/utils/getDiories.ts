import { join } from 'path-browserify'
import { Diory, IDioryObject } from '@diograph/diograph'
import { IDataClient } from '@diory/client-js'

import { IDiories, IFolderPath } from '../types'

const getFolderDiories = async (
  rootUrl: string,
  folderPath: string,
  client: IDataClient,
): Promise<IDiories> => {
  const folderUrl = join(rootUrl, folderPath, 'diories.json')
  let diories: IDiories = {}
  try {
    const dioriesString = await client.readTextItem(folderUrl)
    diories = JSON.parse(dioriesString)
  } catch (error) {
    console.info('diories.json not found from', folderPath)
  }
  return Object.entries(diories).reduce(
    (diories: IDiories, [name, dioryObject]: [string, IDioryObject]) => {
      const path = join(folderPath, name)
      diories[path] = new Diory(dioryObject)
      return diories
    },
    {},
  )
}

export const getDiories = async (
  rootUrl: string,
  client: IDataClient,
  folderPaths: IFolderPath[],
): Promise<IDiories> => {
  const diories: IDiories = {}
  await Promise.all(
    folderPaths.map(async ({ path }) => {
      const folderDiories = await getFolderDiories(rootUrl, path, client)
      Object.assign(diories, folderDiories)
      return
    }),
  )
  return diories
}
