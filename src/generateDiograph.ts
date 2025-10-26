import { join } from 'path-browserify'
import { IDataClient } from '@diory/types'
import { IDiograph, IDiographObject } from '@diograph/diograph'
import { GenerateDiographOptions, IDiories, IFolderPath } from './types'

import { generateDiories } from './generateDiories/generateDiories'

import { getFolderPaths } from './utils/getFolderPaths'
import { convertToDiograph } from './utils/convertToDiograph'
import { getDiories } from './utils/getDiories'

const DIOGRAPH_JSON = 'diograph.json'

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

  const oldDiories: IDiories = await getDiories(rootUrl, folderPaths, client)
  const diories: IDiories = await generateDiories(rootUrl, folderPaths, oldDiories, client)
  const diograph: IDiograph = convertToDiograph(diories)

  // TODO: How not to add deleted diories / links
  if (options?.saveDiograph) {
    try {
      await client.writeItem(join(rootUrl, DIOGRAPH_JSON), diograph.toJson())
    } catch (error) {
      console.error('Unable to saveDiograph', rootUrl, error)
    }
  }

  return diograph.toObject()
}
