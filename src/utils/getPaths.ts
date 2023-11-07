import { promises, Dirent } from 'fs'
import { join } from 'path'

export interface IFolder {
  path: string
  fileNames: string[]
  subFolderNames?: string[]
}

const isValidDirent = (dirent: Dirent) => !dirent.name.startsWith('.')

export async function getFolders(rootPath: string, folderPath = '/'): Promise<Array<IFolder>> {
  const dirents: Dirent[] = await promises.readdir(join(rootPath, folderPath), {
    withFileTypes: true,
  })
  const validDirents = dirents.filter(isValidDirent)
  const fileDirents = validDirents.filter((dirent) => !dirent.isDirectory())
  const folderDirents = validDirents.filter((dirent) => dirent.isDirectory())

  const subFolders: IFolder[][] = await Promise.all(
    folderDirents.map(async (dirent: Dirent) => {
      const subfolderPath: string = join(folderPath, dirent.name)
      return getFolders(rootPath, subfolderPath)
    }),
  )

  const currentFolder: IFolder = {
    path: folderPath,
    fileNames: fileDirents.map(({ name }) => name),
    subFolderNames: folderDirents.map(({ name }) => name),
  }
  return subFolders.flat().concat([currentFolder])
}
