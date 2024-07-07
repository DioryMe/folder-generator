import { IDiory, ILinkObject } from '@diory/types'

export function getLinks(linkedDiories: IDiory[]): ILinkObject[] | undefined {
  return linkedDiories.length ? linkedDiories.map(({ id }) => ({ id })) : undefined
}
