import { IDataClient } from '@diory/types'

import { IDiories, IFolderPath } from '../types'
import { generateFolderDiory } from './folderDiory'

export const generateFolderDiories = (
  rootUrl: string,
  client: IDataClient,
  newFolderPaths: IFolderPath[],
): IDiories => {
  const folderDiories: IDiories = {}
  newFolderPaths.forEach(({ path }) => {
    folderDiories[path] = generateFolderDiory(rootUrl, path, client)
  })

  return folderDiories
}
