import { IDiograph } from '@diograph/diograph/types'

import { IFolderPath, IPaths } from '../types'

import { getFolderPaths } from './utils/getFolderPaths'
import { generateDiories } from './utils/generateDiories'
import { updateFolderDiories } from './updateFolderDiories'
import { convertToDiographAndPaths } from './utils/convertToDiographAndPaths'

export const generateDiograph = async (rootPath: string): Promise<{ diograph: IDiograph, paths: IPaths }> => {
  const folderPaths: IFolderPath[] = await getFolderPaths(rootPath)

  const diories = await generateDiories(rootPath, folderPaths)

  updateFolderDiories(diories, folderPaths)

  return convertToDiographAndPaths(diories)
}
