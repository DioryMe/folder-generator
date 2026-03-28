import { Diograph, IDiograph } from '@diograph/diograph'
import { IDiories } from '../types'

export const convertToDiograph = (diories: IDiories): IDiograph => {
  const diograph = new Diograph()
  Object.entries(diories)
    .reverse()
    .forEach(([path, diory]) => {
      const pathForPathDiory = path.endsWith('/') ? path : undefined
      diograph.addDiory(diory, pathForPathDiory)
    })
  return diograph
}
