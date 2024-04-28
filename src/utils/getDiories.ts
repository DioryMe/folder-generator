const { join } = require('path-browserify')
import { IDiories } from '../types'

export const getDiories = (rootPath: string, names: string[], diories: IDiories) =>
  names.map((name) => {
    const path = join(rootPath, name)
    return diories[path]
  })
