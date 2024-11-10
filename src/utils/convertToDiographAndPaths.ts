import { Diograph } from '@diograph/diograph'
import { IDiographObject } from '@diory/types'
import { IDiories, IPaths } from '../types'

export const convertToDiographAndPaths = (
  diories: IDiories,
): { diograph: IDiographObject; paths: IPaths } => {
  const diograph = new Diograph()
  const paths: IPaths = {}
  Object.entries(diories).forEach(([path, diory]) => {
    diograph.addDiory(diory)
    if (path === '/') {
      diograph.addDiory({ id: diory.id }, '/')
    }
    paths[diory.id] = path
  })

  console.log('generateDiograph', diograph.toObject())

  return {
    diograph: diograph.toObject(),
    paths,
  }
}
