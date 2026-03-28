import { IDioryObject } from '@diograph/diograph'

function getAverage(array: any[] = []): number | undefined {
  return array.length
    ? array.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / array.length
    : undefined
}

export function getLatlng(linkedDiorys: IDioryObject[]): string | undefined {
  const locations = linkedDiorys.map(({ latlng }) => latlng).filter(Boolean)
  const latitudes = locations.map((latlng) => latlng && latlng.split(', ')[0])
  const longitudes = locations.map((latlng) => latlng && latlng.split(', ')[1])
  return locations.length ? `${getAverage(latitudes)}, ${getAverage(longitudes)}` : undefined
}
