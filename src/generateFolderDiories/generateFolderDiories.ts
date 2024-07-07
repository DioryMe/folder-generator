import { IDataClient } from '@diory/types'

import { IDiories, IFolderPath } from '../types'
import { generateFolderDiory } from './folderDiory'

const getNewFolderPaths = (folderPaths: IFolderPath[], oldDiories: IDiories) =>
  folderPaths.filter(({ path }) => !Object.keys(oldDiories).includes(path))

export const generateFolderDiories = (
  rootUrl: string,
  client: IDataClient,
  folderPaths: IFolderPath[],
  oldDiories: IDiories,
): IDiories => {
  const newFolderPaths: IFolderPath[] = getNewFolderPaths(folderPaths, oldDiories)
  console.info('Generating new folder diories', newFolderPaths)

  const folderDiories: IDiories = {}
  newFolderPaths.forEach(({ path }) => {
    folderDiories[path] = generateFolderDiory(rootUrl, path, client)
    console.log(path, folderDiories[path])
  })

  return folderDiories
}
