import { IDiory, ILinkObject } from '@diograph/diograph/types'

export function getLinks(pathAndLinkedDiories: [string, IDiory][]): ILinkObject[] | undefined {
  return pathAndLinkedDiories.length
    ? pathAndLinkedDiories.map(([path, { id }]) => ({ id, path }))
    : undefined
}
