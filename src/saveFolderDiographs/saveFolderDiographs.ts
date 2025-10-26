import { join } from 'path-browserify'
import { IDataClient } from '@diory/types'

import { IDiories, IFolderPath } from '../types'
import { Diograph } from '@diograph/diograph'

export const saveFolderDiographs = (
  rootUrl: string,
  folderPaths: IFolderPath[],
  diories: IDiories,
  client: IDataClient,
) => {
  folderPaths.forEach(async ({ path, fileNames, subfolderNames }) => {
    const diograph = new Diograph()
    diograph.addDiory(diories[path], '/')
    subfolderNames?.forEach((folderName: string) => {
      const filePath = join(path, folderName)
      diograph.addDiory(diories[filePath], `/${folderName}`)
    })

    fileNames?.forEach((fileName: string) => {
      const filePath = join(path, fileName)
      diograph.addDiory(diories[filePath], `/${fileName}`)
    })

    const url = join(rootUrl, path, 'diograph.json')
    return client.writeItem(url, diograph.toJson())
  })
}
