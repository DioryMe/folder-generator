import { IDiograph, IDataClient } from '@diory/types'

import { IDiories, IFolderPath, IPaths, GenerateDiographOptions } from './types'

import { getFolderPaths } from './utils/getFolderPaths'
import { getDiories } from './utils/getDiories'
import { generateFileDiories } from './generateFileDiories/generateFileDiories'
import { generateFolderDiories } from './generateFolderDiories/generateFolderDiories'

import { updateFolderDiories } from './updateFolderDiories/updateFolderDiories'
import { saveDiories } from './utils/saveDiories'
import { convertToDiographAndPaths } from './utils/convertToDiographAndPaths'

export const generateDiograph = async (
  rootUrl: string,
  client: IDataClient,
  options?: GenerateDiographOptions,
): Promise<{ diograph: IDiograph; paths: IPaths }> => {
  const folderPaths: IFolderPath[] = await getFolderPaths(rootUrl, '/', client, options?.level)

  const oldDiories: IDiories = await getDiories(rootUrl, client, folderPaths)
  const newFileDiories: IDiories = await generateFileDiories(
    rootUrl,
    client,
    folderPaths,
    oldDiories,
  )
  const newFolderDiories: IDiories = await generateFolderDiories(
    rootUrl,
    client,
    folderPaths,
    oldDiories,
  )
  const diories = { ...newFileDiories, ...newFolderDiories, ...oldDiories }

  updateFolderDiories(diories, folderPaths)

  if (options?.saveDiories) {
    saveDiories(rootUrl, client, folderPaths, diories)
  }

  return convertToDiographAndPaths(diories)
}
