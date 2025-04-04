import { IDiory, ILinkObject } from '@diograph/diograph'

const unique = <T>(item: T, index: number, array: T[]) => array.indexOf(item) === index

export function getLinks(
  links: ILinkObject[] = [],
  linkedDiories: IDiory[] = [],
): ILinkObject[] | undefined {
  const oldIds = links.map(({ id }) => id)
  const newLinks = linkedDiories
    .filter(({ id }) => !oldIds.includes(id))
    .map(({ id }) => ({ id }))
  return links.length || newLinks.length ? [...links, ...newLinks] : undefined
}
