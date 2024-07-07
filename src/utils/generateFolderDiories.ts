import { IDataClient } from '@diory/client-js'

import { IDiories, IFolderPath } from '../types'
import { generateFolderDiory } from '../folderDiory'

export const generateFolderDiories = (
  rootUrl: string,
  folders: IFolderPath[],
  client: IDataClient,
): IDiories => {
  const folderDiories: IDiories = {}
  folders.forEach(({ path }) => {
    folderDiories[path] = generateFolderDiory(rootUrl, path, client)
    console.log(path, folderDiories[path])
  })

  return folderDiories
}
