import { generateFileDiory } from '@diograph/file-generator'
import { IDiograph } from '@diograph/diograph'

import { IPath } from './getPaths'

export const addFileDiories = async (
  rootPath: string,
  paths: IPath[],
  diograph: IDiograph,
): Promise<void> => {
  await Promise.all(
    paths.map(async ({ path, isFolder }: IPath) => {
      if (!isFolder) {
        const diory = await generateFileDiory(rootPath, path)
        diograph.addDiory(diory)
      }
    }),
  )
}
