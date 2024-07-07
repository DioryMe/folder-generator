import { join } from 'path-browserify'
import { IDiograph } from '@diograph/diograph'
import { IDataClient } from '@diograph/local-client'

import { IDiories, IFolderPath, IPaths } from './types'
import { getFolderPaths } from './utils/getFolderPaths'
import { getDiories } from './utils/getDiories'
import { generateFileDiories } from './utils/generateFileDiories'
import { generateFolderDiories } from './utils/generateFolderDiories'
import { updateFolderDiories } from './utils/updateFolderDiories'
import { saveDiories } from './utils/saveDiories'
import { convertToDiographAndPaths } from './utils/convertToDiographAndPaths'

export const generateDiograph = async (
  rootUrl: string,
  client: IDataClient,
  level?: number,
): Promise<{ diograph: IDiograph; paths: IPaths }> => {
  const folderPaths: IFolderPath[] = await getFolderPaths(rootUrl, '/', client, level)

  const oldDiories: IDiories = await getDiories(rootUrl, client, folderPaths)
  const newFilePaths: IFolderPath[] = folderPaths.map(({ path, fileNames }) => ({
    path,
    fileNames: fileNames.filter(
      (fileName) => !Object.keys(oldDiories).includes(join(path, fileName)),
    ),
  }))
  console.info('Generating file diories', newFilePaths)
  const newFileDiories: IDiories = await generateFileDiories(rootUrl, newFilePaths, client)

  const newFolderPaths: IFolderPath[] = folderPaths.filter(
    ({ path }) => !Object.keys(oldDiories).includes(path),
  )
  console.info('Generating folder diories', newFolderPaths)
  const newFolderDiories: IDiories = await generateFolderDiories(rootUrl, newFolderPaths, client)

  const diories = { ...newFileDiories, ...newFolderDiories, ...oldDiories }
  updateFolderDiories(diories, folderPaths)

  saveDiories(rootUrl, client, diories, folderPaths)

  return convertToDiographAndPaths(diories)
}
