import { join } from 'path-browserify'

import { IDiories, IFolderPath } from '../types'

const getContentUrls = (oldDiories: IDiories) => {
  return Object.values(oldDiories)
    .map(({ data }) => data?.map(({ contentUrl }) => contentUrl))
    .flat()
    .filter(Boolean)
}

export const getNewFilePaths = (folderPaths: IFolderPath[], oldDiories: IDiories): IFolderPath[] =>
  folderPaths
    .map(({ path, fileNames }) => ({
      path,
      fileNames: fileNames.filter(
        (fileName) => !getContentUrls(oldDiories).includes(join(path, fileName)),
      ),
      subfolderNames: [],
    }))
    .filter(({ fileNames }) => fileNames.length)
