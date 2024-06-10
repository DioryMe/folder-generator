import { IDiory, ILinkObject } from '@diograph/diograph'

import { ifDefined } from '../utils/ifDefined'

import { getImage } from './image'
import { getDate } from './date'
import { getLatlng } from './latlng'
import { getLinks } from './links'

export function updateFolderDiory(diory: IDiory, linkedDiories: IDiory[]): IDiory {
  const image: string | undefined = getImage(linkedDiories)
  const date: string | undefined = getDate(linkedDiories)
  const latlng: string | undefined = getLatlng(linkedDiories)
  const links: ILinkObject[] | undefined = getLinks(linkedDiories)

  return diory.update(ifDefined({ image, date, latlng, links }), false)
}
