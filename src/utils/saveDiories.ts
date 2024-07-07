import { join } from 'path-browserify'
import { IDataClient } from '@diory/types'

import { IDiories, IFolderPath } from '../types'

export const saveDiories = (
  rootUrl: string,
  client: IDataClient,
  folderPaths: IFolderPath[],
  diories: IDiories,
) => {
  folderPaths.forEach(async ({ path, fileNames }) => {
    const folderDiories: IDiories = fileNames.reduce(
      (obj: IDiories, name: string) => {
        const filePath = join(path, name)
        obj[name] = diories[filePath]
        return obj
      },
      { '/': diories[path] },
    )

    const dioriesString = JSON.stringify(folderDiories, null, 2)
    const url = join(rootUrl, path, 'diories.json')
    return client.writeItem(url, dioriesString)
  })
}
