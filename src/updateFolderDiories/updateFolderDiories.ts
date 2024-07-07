import { join } from 'path-browserify'
import { IDiories, IFolderPath } from '../types'

import { updateFolderDiory } from './folderDiory'

const getLinkedDiories = (rootPath: string, names: string[], diories: IDiories) =>
  names.map((name) => {
    const path = join(rootPath, name)
    return diories[path]
  })

export const updateFolderDiories = (diories: IDiories, folderPaths: IFolderPath[]): void => {
  folderPaths.forEach(({ path, subfolderNames = [], fileNames = [] }) => {
    const linkedSubFolderDiories = getLinkedDiories(path, subfolderNames, diories)
    const linkedFileDiories = getLinkedDiories(path, fileNames, diories)

    updateFolderDiory(diories[path], [...linkedSubFolderDiories, ...linkedFileDiories])
  })
}
