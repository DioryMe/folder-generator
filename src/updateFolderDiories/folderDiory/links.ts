import { IDiory, ILinkObject } from '@diograph/diograph'

export function getLinks(linkedDiories: IDiory[]): ILinkObject[] | undefined {
  return linkedDiories.length ? linkedDiories.map(({ id }) => ({ id })) : undefined
}
