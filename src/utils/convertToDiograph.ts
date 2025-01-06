import { Diograph } from '@diograph/diograph'
import { IDiographObject } from '@diory/types'
import { IDiories, IPaths } from '../types'

export const convertToDiograph = (diories: IDiories): IDiographObject => {
  const diograph = new Diograph()
  Object.entries(diories).forEach(([path, diory]) => {
    diograph.addDiory(diory, path)
  })
  return diograph.toObject()
}
