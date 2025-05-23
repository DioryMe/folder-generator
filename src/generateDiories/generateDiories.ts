import { IDataClient } from '@diory/types'
import { IDiories, IFolderPath } from '../types'

import { getNewFilePaths } from '../utils/getNewFilePaths'
import { getNewFolderPaths } from '../utils/getNewFolderPaths'

import { generateFileDiories } from './generateFileDiories'
import { generateFolderDiories } from './generateFolderDiories'
import { updateFolderDiories } from '../updateFolderDiories/updateFolderDiories'

export const generateDiories = async (
  rootUrl: string,
  folderPaths: IFolderPath[],
  oldDiories: IDiories,
  client: IDataClient,
): Promise<IDiories> => {
  const newFilePaths: IFolderPath[] = getNewFilePaths(folderPaths, oldDiories)
  const newFileDiories: IDiories = await generateFileDiories(rootUrl, client, newFilePaths)

  const newFolderPaths: IFolderPath[] = getNewFolderPaths(folderPaths, oldDiories)
  const newFolderDiories: IDiories = await generateFolderDiories(rootUrl, client, newFolderPaths)

  const diories = { ...newFileDiories, ...newFolderDiories, ...oldDiories }

  updateFolderDiories(diories, folderPaths)

  return diories
}
