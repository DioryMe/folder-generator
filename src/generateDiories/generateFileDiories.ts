import { join } from 'path-browserify'
import { generateDiory } from '@diograph/file-generator'
import { IDataClient } from '@diory/types'

import { IDiories, IFolderPath } from '../types'

export const generateFileDiories = async (
  rootUrl: string,
  client: IDataClient,
  newFilePaths: IFolderPath[],
): Promise<IDiories> => {
  const fileDiories: IDiories = {}
  await Promise.all(
    newFilePaths.map(async ({ path, fileNames = [] }) =>
      Promise.all(
        fileNames.map(async (fileName: string) => {
          const dioryPath = join(path, fileName)
          fileDiories[dioryPath] = await generateDiory(rootUrl, dioryPath, client)
        }),
      ),
    ),
  )

  return fileDiories
}
