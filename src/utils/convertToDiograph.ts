import { join } from 'path-browserify'
import { IDataClient, IDiographObject } from '@diory/types'
import { IDiories } from '../types'

import { Diograph } from '@diograph/diograph'

const removeRoot = (folderPath: string, path: string) => {
  if (path !== '/') return join(folderPath, path)

  if (folderPath !== '/') return folderPath

  return ''
}

export const convertToDiograph = (
  rootUrl: string,
  folderPath: string,
  client: IDataClient,
  diories: IDiories,
): IDiographObject => {
  const diograph = new Diograph()
  Object.entries(diories).forEach(([path, diory]) => {
    diograph.addDiory(diory, join(client.type, rootUrl, removeRoot(folderPath, path)))
  })
  return diograph.toObject()
}
