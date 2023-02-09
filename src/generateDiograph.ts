import { IDiograph } from '@diograph/diograph'

import { getFolders, IFolder } from './utils/getPaths'
import { generateDiographFromFolders } from './utils/generateDiographFromFolders'

export const generateDiograph = async (rootPath: string): Promise<IDiograph> => {
  const folders: IFolder[] = await getFolders(rootPath)

  return generateDiographFromFolders(rootPath, folders)
}
