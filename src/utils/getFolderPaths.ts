import { join } from 'path-browserify'
import { IDataClient } from '@diory/client-js'

import { IFolderPath } from '../types'

export async function getFolderPaths(
  rootUrl: string,
  folderPath = '/',
  client: IDataClient,
): Promise<Array<IFolderPath>> {
  const folderUrl = join(rootUrl, folderPath)
  const subFolderNames = await client.getFolderNames(folderUrl)
  const fileNames = await client.getFileNames(folderUrl)

  const subFolders: IFolderPath[][] = await Promise.all(
    subFolderNames.map(async (subFolderName: string) => {
      const subfolderPath: string = join(folderPath, subFolderName)
      return getFolderPaths(rootUrl, subfolderPath, client)
    }),
  )

  return subFolders.flat().concat([
    {
      path: folderPath,
      fileNames,
      subFolderNames,
    },
  ])
}
