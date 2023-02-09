import { IDioryObject, ILinkObject } from '@diograph/diograph'

export function getLinks(linkedDiories: IDioryObject[]): ILinkObject[] | undefined {
  return linkedDiories ? linkedDiories.map(({ id, path }) => ({ id, path })) : undefined
}
