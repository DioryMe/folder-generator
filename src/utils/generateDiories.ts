import { join } from 'path-browserify'
import { generateDiory } from '@diograph/file-generator'
import { IDataClient } from '@diory/client-js'

import { IDiories, IFolderPath } from '../types'

import { generateFolderDiory } from '../folderDiory'

export const generateDiories = async (
  rootPath: string,
  folders: IFolderPath[],
  client: IDataClient,
): Promise<IDiories> => {
  const diories: IDiories = {}

  await Promise.all(
    folders.map(async (folder) => {
      const { path, fileNames = [] } = folder
      await Promise.all(
        fileNames.map(async (fileName: string) => {
          const folderPath = join(rootPath, path)
          const dioryPath = join(path, fileName)
          diories[dioryPath] = await generateDiory(folderPath, fileName, client)
          console.log(dioryPath, diories[dioryPath])
        }),
      )

      diories[path] = generateFolderDiory(rootPath, path, client)
      console.log(path, diories[path])
      return
    }),
  )

  return diories
}
