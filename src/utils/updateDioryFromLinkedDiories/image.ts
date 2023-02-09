import { IDioryObject } from '@diograph/diograph'

function getMiddleItem(
  _: string | undefined,
  index: number,
  array: (string | undefined)[],
): boolean {
  return index === Math.floor(array.length / 2)
}

export function getImage(linkedDiorys: IDioryObject[]): string {
  return <string>linkedDiorys
    .map(({ image }) => image)
    .filter(Boolean)
    .find(getMiddleItem)
}
