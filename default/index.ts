import { join } from 'path'
import { Diory, IDiory } from '@diograph/diograph'

import { getText } from './text'
import { getImage } from './image'
import { getCreate } from './created'
import { getModified } from './modified'

export function generateDefaultFolderDiory(rootPath: string, subPath: string): IDiory {
  const folderPath = join(rootPath, subPath)

  const text = getText(folderPath)
  const image = getImage()
  const date = getCreate(folderPath)
  const created = getCreate(folderPath)
  const modified = getModified(folderPath)

  return new Diory({ text, image, date, created, modified })
}
