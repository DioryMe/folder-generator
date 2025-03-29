import { IDiories, IFolderPath } from '../types'

export const getNewFolderPaths = (
  folderPaths: IFolderPath[],
  oldDiories: IDiories,
): IFolderPath[] =>
  folderPaths
    .filter(({ path }) => !Object.keys(oldDiories).includes(path))
    .map(({ path }) => ({
      path,
      fileNames: [],
      subfolderNames: [],
    }))
