import { join } from 'path-browserify'
import { IDataClient } from '@diory/types'

import { IFolderPath } from '../types'

export async function getFolderPaths(
  rootUrl: string,
  folderPath = '/',
  client: IDataClient,
  level = 100,
): Promise<Array<IFolderPath>> {
  const folderUrl = join(rootUrl, folderPath)
  const subfolderNames = await client.getFolderNames(folderUrl)
  const fileNames = await client.getFileNames(folderUrl)

  const subfolders: IFolderPath[] = (
    await Promise.all(
      subfolderNames.map(async (subfolderName: string) => {
        const subfolderPath: string = join(folderPath, subfolderName)
        return level > 1
          ? getFolderPaths(rootUrl, subfolderPath, client, level - 1)
          : [
              {
                path: subfolderPath,
                fileNames: [],
                subfolderNames: [],
              },
            ]
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
