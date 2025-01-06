import { IDataClient, IDiographObject } from '@diory/types'
import { GenerateDiographOptions, IFolderPath } from './types'

import { convertToDiograph } from './utils/convertToDiograph'
import { generateDiories } from './generateDiories'
import { getFolderPaths } from './utils/getFolderPaths'
import { saveDiographs } from './utils/saveDiographs'

export const generateDiograph = async (
  rootUrl: string,
  folderPath: string,
  client: IDataClient,
  options?: GenerateDiographOptions,
): Promise<IDiographObject> => {
  const folderPaths: IFolderPath[] = await getFolderPaths(
    rootUrl,
    folderPath,
    client,
    options?.level,
  )
  // const folderPaths = filterExcludedPaths(allFolderPaths, options?.excludedPaths)

  const diories = await generateDiories(rootUrl, folderPaths, client)

  if (options?.saveDiograph) {
    saveDiographs(rootUrl, folderPaths, diories, client)
  }

  return convertToDiograph(diories)
}
