import { IDiory, IDioryObject, ILinkObject } from '@diograph/diograph'

import { generateDefaultFolderDiory } from '../default'
import { ifDefined } from '../utils/ifDefined'

import { getImage } from './image'
import { getDate } from './date'
import { getLatlng } from './latlng'
import { getLinks } from './links'

export function generateFolderDioryFromLinks(
  rootPath: string,
  path: string,
  linkedDiorys: IDioryObject[],
): IDiory {
  const defaultDiory = generateDefaultFolderDiory(rootPath, path)

  const image: string | undefined = getImage(linkedDiorys)
  const date: string | undefined = getDate(linkedDiorys)
  const latlng: string | undefined = getLatlng(linkedDiorys)
  const links: ILinkObject[] | undefined = getLinks(linkedDiorys)

  return defaultDiory.update(ifDefined({ image, date, latlng, links, path }), false)
}
