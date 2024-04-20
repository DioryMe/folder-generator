import { IDiograph } from '@diograph/diograph'

import { IDiories, IFolderPath, IPaths } from '../types'

import { getFolderPaths } from './utils/getFolderPaths'
import { generateDiories } from './utils/generateDiories'
import { updateFolderDiories } from './updateFolderDiories'
import { convertToDiographAndPaths } from './utils/convertToDiographAndPaths'

export const generateDiograph = async (
  rootPath: string,
): Promise<{ diograph: IDiograph; paths: IPaths }> => {
  const folderPaths: IFolderPath[] = await getFolderPaths(rootPath)

  const diories: IDiories = await generateDiories(rootPath, folderPaths)

  updateFolderDiories(diories, folderPaths)

  return convertToDiographAndPaths(diories)
}
