import { join } from 'path-browserify'

import { IDiories, IFolderPath } from '../types'

export const getNewFolderPaths = (folderPaths: IFolderPath[], oldDiories: IDiories) =>
  folderPaths
    .map(({ path }) => path)
    .filter((subfolderName) => !Object.keys(oldDiories).includes(subfolderName))
