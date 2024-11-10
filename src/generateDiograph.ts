import { IDataClient, IDiographObject } from '@diory/types'

import { IDiories, IFolderPath, IPaths, GenerateDiographOptions } from './types'

import { getFolderPaths } from './utils/getFolderPaths'
import { getDiories } from './utils/getDiories'
import { getNewFilePaths } from './utils/getNewFilePaths'
import { getNewFolderPaths } from './utils/getNewFolderPaths'
import { convertToDiographAndPaths } from './utils/convertToDiographAndPaths'
import { saveDiories } from './utils/saveDiories'

import { generateFileDiories } from './generateFileDiories/generateFileDiories'
import { generateFolderDiories } from './generateFolderDiories/generateFolderDiories'
import { updateFolderDiories } from './updateFolderDiories/updateFolderDiories'

export const generateDiograph = async (
  rootUrl: string,
  client: IDataClient,
  options?: GenerateDiographOptions,
): Promise<{ diograph: IDiographObject; paths: IPaths }> => {
  const folderPaths: IFolderPath[] = await getFolderPaths(rootUrl, '/', client, options?.level)

  const oldDiories: IDiories = await getDiories(rootUrl, client, folderPaths)

  const newFilePaths: IFolderPath[] = getNewFilePaths(folderPaths, oldDiories)
  const newFileDiories: IDiories = await generateFileDiories(rootUrl, client, newFilePaths)

  const newFolderPaths: string[] = getNewFolderPaths(folderPaths, oldDiories)
  const newFolderDiories: IDiories = await generateFolderDiories(rootUrl, client, newFolderPaths)

  const diories = { ...newFileDiories, ...newFolderDiories, ...oldDiories }

  updateFolderDiories(diories, folderPaths)

  if (options?.saveDiories) {
    saveDiories(rootUrl, client, folderPaths, diories)
  }

  return convertToDiographAndPaths(diories)
}
