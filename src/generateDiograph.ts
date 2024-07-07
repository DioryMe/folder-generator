import { IDiograph } from '@diograph/diograph'
import { IDataClient } from '@diograph/local-client'

import { IDiories, IFolderPath, IPaths } from './types'

import { getFolderPaths } from './utils/getFolderPaths'
import { generateDiories } from './utils/generateDiories'
import { updateFolderDiories } from './utils/updateFolderDiories'
import { convertToDiographAndPaths } from './utils/convertToDiographAndPaths'

export const generateDiograph = async (
  rootPath: string,
  client: IDataClient,
): Promise<{ diograph: IDiograph; paths: IPaths }> => {
  const folderPaths: IFolderPath[] = await getFolderPaths(rootPath, '/', client)
  console.info('Generating diories from folders', folderPaths)
  const diories: IDiories = await generateDiories(rootPath, folderPaths, client)

  updateFolderDiories(diories, folderPaths)

  return convertToDiographAndPaths(diories)
}
