import { join } from 'path-browserify'

import { IDiories, IFolderPath } from '../types'

export const getNewFolderPaths = (folderPaths: IFolderPath[], oldDiories: IDiories) =>
  folderPaths
    .map(({ path, subfolderNames }) =>
      [path].concat((subfolderNames ?? []).map((subfolderName) => join(path, subfolderName))),
    )
    .flat()
    .filter((subfolderName) => !Object.keys(oldDiories).includes(subfolderName))
