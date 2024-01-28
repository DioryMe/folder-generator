import { join } from 'path'
import { Diograph } from '@diograph/diograph'
import { IDiograph, IDiory } from '@diograph/diograph/types'
import { generateDiory } from '@diograph/file-generator'

import { IFolder } from './getPaths'

import { generateDioryFromFolderPath } from './dioryFromFolderPath'
import { updateDioryFromLinkedDiories } from './updateDioryFromLinkedDiories'

export const generateDiographFromFolders = async (
  rootPath: string,
  folders: IFolder[],
): Promise<IDiograph> => {
  const diograph = new Diograph()
  const _folderPathDioryIdMap: { [path: string]: string } = {}

  // Note: This must be sequential as sub folders need to be processed before their parents
  for (const folder of folders) {
    const { path, fileNames = [], subFolderNames = [] } = folder

    const pathAndSubFolderDiories: [string, IDiory][] = subFolderNames.map((subFolderName) => {
      const subFolderPath = join(path, subFolderName)
      const subFolderDioryId = _folderPathDioryIdMap[subFolderPath]
      return [subFolderName, diograph.getDiory({ id: subFolderDioryId })]
    })

    const pathAndFileDiories: [string, IDiory][] = await Promise.all(
      fileNames.map(async (fileName: string) => {
        const folderPath = join(rootPath, path)
        const diory = await generateDiory(folderPath, fileName)
        diograph.addDiory(diory)

        return [fileName, diory]
      }),
    )

    const folderDiory = generateDioryFromFolderPath(rootPath, folder.path)
    _folderPathDioryIdMap[path] = folderDiory.id
    await updateDioryFromLinkedDiories(folderDiory, [
      ...pathAndFileDiories,
      ...pathAndSubFolderDiories,
    ])

    diograph.addDiory(folderDiory)
  }

  const rootId = _folderPathDioryIdMap['/']
  diograph.addDiory({ id: rootId }, '/')

  return diograph
}
