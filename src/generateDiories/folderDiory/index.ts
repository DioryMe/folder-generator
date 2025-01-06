import { join } from 'path-browserify'
import { Diory } from '@diograph/diograph'
import { IDiory, IDataClient } from '@diory/types'

import { getImage } from './image'

export function generateFolderDiory(rootUrl: string, path: string, client: IDataClient): IDiory {
  const folderUrl = join(rootUrl, path)

  const { name, created, modified } = client.getMetadata(folderUrl)
  const image = getImage()

  return new Diory({ text: name, image, date: created, created, modified })
}
