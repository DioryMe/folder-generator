import { join } from 'path-browserify'
import { generateDiory } from '@diograph/file-generator'
import { IDataClient } from '@diory/types'

import { IDiories, IFolderPath } from '../types'

const getNewFilePaths = (folderPaths: IFolderPath[], oldDiories: IDiories) =>
  folderPaths.map(({ path, fileNames }) => ({
    path,
    fileNames: fileNames.filter(
      (fileName) => !Object.keys(oldDiories).includes(join(path, fileName)),
    ),
  }))

export const generateFileDiories = async (
  rootUrl: string,
  client: IDataClient,
  folderPaths: IFolderPath[],
  oldDiories: IDiories,
): Promise<IDiories> => {
  const newFilePaths: IFolderPath[] = getNewFilePaths(folderPaths, oldDiories)
  console.info('Generating new file diories', newFilePaths)

  const fileDiories: IDiories = {}
  await Promise.all(
    newFilePaths.map(async ({ path, fileNames = [] }) =>
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
