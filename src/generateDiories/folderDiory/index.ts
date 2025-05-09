import { join } from 'path-browserify'
import { Diory, IDiory } from '@diograph/diograph'
import { IDataClient } from '@diory/types'

export function generateFolderDiory(rootUrl: string, path: string, client: IDataClient): IDiory {
  const folderUrl = join(rootUrl, path)
  const { name, created, modified } = client.getMetadata(folderUrl)

  return new Diory({ text: name, created, modified })
}
