import { Diograph, IDiograph } from '@diograph/diograph'

import { getPaths } from './utils/getPaths'
import { addFileDiories } from './utils/addFileDiories'
import { addFolderDiories } from './utils/addFolderDiories'

export const generateDiograph = async (rootPath: string): Promise<IDiograph> => {
  const paths = await getPaths(rootPath)

  const diograph = new Diograph()
  await addFileDiories(rootPath, paths, diograph)
  await addFolderDiories(rootPath, paths, diograph)

  return diograph
}
