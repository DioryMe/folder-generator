import { Diograph } from '@diograph/diograph'

import { IDiograph } from '@diograph/diograph'
import { IDiories, IPaths } from '../types'

export const convertToDiographAndPaths = (
  diories: IDiories,
): { diograph: IDiograph; paths: IPaths } => {
  const diograph = new Diograph()
  const paths: IPaths = {}
  Object.entries(diories).forEach(([path, diory]) => {
    diograph.addDiory(diory)
    if (path === '/') {
      diograph.addDiory({ id: diory.id }, '/')
    }
    paths[diory.id] = path
  })

  return {
    diograph,
    paths,
  }
}
