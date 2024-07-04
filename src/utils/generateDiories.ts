import { join } from 'path'
import { generateDiory } from '@diograph/file-generator'

import { IDiories, IFolderPath } from '../../types'

import { generateFolderDiory } from '../folderDiory'

export const generateDiories = async (
  rootPath: string,
  folders: IFolderPath[],
): Promise<IDiories> => {
  const diories: IDiories = {}

  await Promise.all(
    folders.map(async (folder) => {
      const { path, fileNames = [] } = folder
      await Promise.all(
        fileNames.map(async (fileName: string) => {
          const folderPath = join(rootPath, path)
          const dioryPath = join(path, fileName)
          diories[dioryPath] = await generateDiory(folderPath, fileName)
        }),
      )

      diories[path] = generateFolderDiory(rootPath, path)
      return
    }),
  )

  return diories
}
