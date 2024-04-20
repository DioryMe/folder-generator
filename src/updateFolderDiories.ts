import { IDiographObject } from '@diograph/diograph/types'
import { IDiories, IFolderPath } from '../types'

import { updateFolderDiory } from './updateFolderDiory'
import { getDiories } from './utils/getDiories'

export const updateFolderDiories = (diories: IDiories, folderPaths: IFolderPath[]): void => {
  folderPaths.forEach(({ path, subFolderNames = [], fileNames = [] }) => {
    const subFolderDiories = getDiories(path, subFolderNames, diories)
    const fileDiories = getDiories(path, fileNames, diories)

    updateFolderDiory(diories[path], [...subFolderDiories, ...fileDiories])
  })
}
