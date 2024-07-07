import { join } from 'path-browserify'
import { generateDiory } from '@diograph/file-generator'
import { IDataClient } from '@diory/client-js'

import { IDiories, IFolderPath } from '../types'

export const generateFileDiories = async (
  rootUrl: string,
  folders: IFolderPath[],
  client: IDataClient,
): Promise<IDiories> => {
  const fileDiories: IDiories = {}
  await Promise.all(
    folders.map(async ({ path, fileNames = [] }) =>
      Promise.all(
        fileNames.map(async (fileName: string) => {
          const folderPath = join(rootUrl, path)
          const dioryPath = join(path, fileName)
          fileDiories[dioryPath] = await generateDiory(folderPath, fileName, client)
          console.log(dioryPath, fileDiories[dioryPath])
        }),
      ),
    ),
  )

  return fileDiories
}
