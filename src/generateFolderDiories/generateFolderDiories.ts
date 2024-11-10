import { IDataClient } from '@diory/types'

import { IDiories } from '../types'
import { generateFolderDiory } from './folderDiory'

export const generateFolderDiories = (
  rootUrl: string,
  client: IDataClient,
  newFolderPaths: string[],
): IDiories => {
  const folderDiories: IDiories = {}
  newFolderPaths.forEach((path) => {
    folderDiories[path] = generateFolderDiory(rootUrl, path, client)
  })

  return folderDiories
}
