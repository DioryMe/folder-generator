import { IDioryObject } from '@diograph/diograph'

function getMiddleItem(
  _: string | undefined,
  index: number,
  array: (string | undefined)[],
): boolean {
  return index === Math.floor(array.length / 2)
}

// Base64 colors are 1x1 png images generated with https://png-pixel.com/
const getRandom = (array: any[]) => array[Math.floor(Math.random() * array.length)]

const prefix = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42'
const suffix = 'AAAABJRU5ErkJggg=='

const colors = [
  'mOMPvD6PwAGiwMHcHyXEA', // #5bc0eb
  'mP8c43hPwAHewLTbrmJlA', // #fcd600
  'mOcfdT2PwAGPgKeWQwJuA', // #9bc53d
  'mN8GmnyHwAGEAJzBJT/2A', // #e55934
  'mP8Van4HwAGngKVn65TsQ', // #fa7921
  'mMUMgn7DwACmQGdtDFX8A', // #123456
]

export const getBackgroundColor = (): string => {
  const colorCode = getRandom(colors)
  return `data:image/png;base64,${prefix}${colorCode}${suffix}`
}

export function getImage(linkedDiorys: IDioryObject[]): string {
  return <string>linkedDiorys
      .map(({ image }) => image)
      .filter(Boolean)
      .find(getMiddleItem) ?? getBackgroundColor()
}
