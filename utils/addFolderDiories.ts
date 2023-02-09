import { join } from 'path'
import { IDiograph, IDioryObject } from '@diograph/diograph'
import { IPath } from './getPaths'

import { generateFolderDioryFromLinks } from '../folderFromLinks'

function getLinkedDiories(path: string, subPaths: string[], diograph: IDiograph): IDioryObject[] {
  const linkedDiories: IDioryObject[] = []
  subPaths.forEach((subPath) => {
    const dioryPath = join(path, subPath)
    const linkedDiory = Object.values(diograph.diograph).find((diory) => diory.path === dioryPath)
    if (linkedDiory) {
      linkedDiory.update({ path: subPath }, false).toObject()
      linkedDiories.push(linkedDiory)
    }
  })
  return linkedDiories
}

export const addFolderDiories = async (
  rootPath: string,
  paths: IPath[],
  diograph: IDiograph,
): Promise<void> => {
  for (const { path, isFolder, subPaths = [] } of paths) {
    if (isFolder) {
      const linkedDiories = getLinkedDiories(path, subPaths, diograph)
      const diory = await generateFolderDioryFromLinks(rootPath, path, linkedDiories)
      diograph.addDiory(diory)
    }
  }
}
