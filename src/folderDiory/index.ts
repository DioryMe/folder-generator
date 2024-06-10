import { join } from 'path-browserify'
import { Diory, IDiory } from '@diograph/diograph'
import { IDataClient } from '@diory/client-js'

import { getImage } from './image'

export function generateFolderDiory(rootUrl: string, path: string, client: IDataClient): IDiory {
  const folderUrl = join(rootUrl, path)

  const { name, created, modified } = client.getMetadata(folderUrl)
  const image = getImage()

  return new Diory({ text: name, image, date: created, created, modified })
}
