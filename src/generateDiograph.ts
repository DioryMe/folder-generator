import { IDataClient } from '@diory/types'
import { IDiographObject } from '@diograph/diograph'
import { GenerateDiographOptions, IFolderPath } from './types'

import { generateDiories } from './generateDiories/generateDiories'

import { getFolderPaths } from './utils/getFolderPaths'
import { convertToDiograph } from './utils/convertToDiograph'

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

  const diories = await generateDiories(rootUrl, folderPaths, client)
  const diograph = convertToDiograph(diories)

  if (options?.saveDiograph) {
    await client.writeItem(rootUrl, diograph.toJson())
  }

  return diograph.toObject()
}
