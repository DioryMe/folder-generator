import { promises, Dirent } from 'fs'
import { join } from 'path'

import { IFolderPath } from '../../types'

const isValidDirent = (dirent: Dirent) => !dirent.name.startsWith('.')

export async function getFolderPaths(
  rootPath: string,
  folderPath = '/',
): Promise<Array<IFolderPath>> {
  const dirents: Dirent[] = await promises.readdir(join(rootPath, folderPath), {
    withFileTypes: true,
  })
  const validDirents = dirents.filter(isValidDirent)
  const fileDirents = validDirents.filter((dirent) => !dirent.isDirectory())
  const folderDirents = validDirents.filter((dirent) => dirent.isDirectory())

  const subFolders: IFolderPath[][] = await Promise.all(
    folderDirents.map(async (dirent: Dirent) => {
      const subfolderPath: string = join(folderPath, dirent.name)
      return getFolderPaths(rootPath, subfolderPath)
    }),
  )

  const currentFolder: IFolderPath = {
    path: folderPath,
    fileNames: fileDirents.map(({ name }) => name),
    subFolderNames: folderDirents.map(({ name }) => name),
  }
  return subFolders.flat().concat([currentFolder])
}
