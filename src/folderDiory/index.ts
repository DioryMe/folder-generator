import { join } from 'path'
import { Diory } from '@diograph/diograph'
import { IDiory } from '@diograph/diograph'

import { getText } from './text'
import { getImage } from './image'
import { getCreated } from './created'
import { getModified } from './modified'

export function generateFolderDiory(rootPath: string, path: string): IDiory {
  const folderPath = join(rootPath, path)

  const text = getText(folderPath)
  const image = getImage()
  const date = getCreated(folderPath)
  const created = getCreated(folderPath)
  const modified = getModified(folderPath)

  return new Diory({ text, image, date, created, modified })
}
