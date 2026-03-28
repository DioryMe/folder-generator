import { IDiory, ILinkObject } from '@diograph/diograph'

import { ifDefined } from '../../utils/ifDefined'

import { getImage } from './image'
import { getDate } from './date'
import { getLatlng } from './latlng'
import { getLinks } from './links'

export function updateFolderDiory(diory: IDiory, linkedDiories: IDiory[]): IDiory {
  const image: string | undefined = diory.image ?? getImage(linkedDiories)
  const date: string | undefined = diory.date ?? getDate(linkedDiories)
  const latlng: string | undefined = diory.latlng ?? getLatlng(linkedDiories)
  const links: ILinkObject[] | undefined = getLinks(diory.links, linkedDiories)

  return diory.update(ifDefined({ image, date, latlng, links }), false)
}
