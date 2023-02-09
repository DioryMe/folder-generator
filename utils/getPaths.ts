import { promises } from 'fs'
import { join } from 'path'

export interface IPath {
  path: string
  isFolder: boolean
  subPaths?: string[]
}

export async function getPaths(rootPath: string, folderPath = '/'): Promise<Array<IPath>> {
  const linkDirents = await promises.readdir(join(rootPath, folderPath), { withFileTypes: true })

  let paths: IPath[] = []
  const subPaths: string[] = []
  await Promise.all(
    linkDirents.map(async (linkDirent: any) => {
      if (linkDirent.name.startsWith('.')) {
        return
      }

      const path = join(folderPath, linkDirent.name)
      subPaths.push(linkDirent.name)

      // Add file paths
      if (!linkDirent.isDirectory()) {
        paths.push({
          path,
          isFolder: false,
        })
      }

      // Add subfolder paths
      if (linkDirent.isDirectory()) {
        const subPaths: IPath[] = await getPaths(rootPath, path)
        // Note: Subpaths must be before parent paths to be generated before their parents
        paths = subPaths.concat(paths)
      }
    }),
  )

  paths.push({
    path: folderPath,
    isFolder: true,
    subPaths,
  })

  return paths
}
