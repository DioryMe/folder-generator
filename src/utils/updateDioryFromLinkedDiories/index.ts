import { IDiory, ILinkObject } from '@diograph/diograph'

import { ifDefined } from '../ifDefined'

import { getImage } from './image'
import { getDate } from './date'
import { getLatlng } from './latlng'
import { getLinks } from './links'

export function updateDioryFromLinkedDiories(
  diory: IDiory,
  pathAndLinkedDiories: [string, IDiory][],
): IDiory {
  const linkedDiories = pathAndLinkedDiories.map(([_, diory]) => diory)

  const image: string | undefined = getImage(linkedDiories)
  const date: string | undefined = getDate(linkedDiories)
  const latlng: string | undefined = getLatlng(linkedDiories)
  const links: ILinkObject[] | undefined = getLinks(pathAndLinkedDiories)

  return diory.update(ifDefined({ image, date, latlng, links }), false)
}
