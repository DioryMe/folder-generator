import { join } from 'path-browserify'

import { IDiories, IFolderPath } from '../types'

export const getNewFilePaths = (folderPaths: IFolderPath[], oldDiories: IDiories) =>
  folderPaths
    .map(({ path, fileNames }) => ({
      path,
      fileNames: fileNames?.filter(
        (fileName) => !Object.keys(oldDiories).includes(join(path, fileName)),
      ),
    }))
    .filter(({ fileNames }) => fileNames?.length)
