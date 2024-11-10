import { join } from 'path-browserify'
import { IDataClient } from '@diory/types'

import { IFolderPath } from '../types'
import { isValidFile } from './isValidFile'

export async function getFolderPaths(
  rootUrl: string,
  folderPath = '/',
  client: IDataClient,
  level = 1,
): Promise<Array<IFolderPath>> {
  const folderUrl = join(rootUrl, folderPath)
  const subfolderNames = await client.getFolderNames(folderUrl)
  const fileNames = (await client.getFileNames(folderUrl)).filter(isValidFile)
  const subfolders: IFolderPath[] = (
    await Promise.all(
      subfolderNames.map(async (subfolderName: string) => {
        const subfolderPath: string = join(folderPath, subfolderName)
        return level > 1 ? getFolderPaths(rootUrl, subfolderPath, client, level - 1) : []
      }),
    )
  ).flat()

  return subfolders.concat([
    {
      path: folderPath,
      fileNames,
      subfolderNames,
    },
  ])
}
