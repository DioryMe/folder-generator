import { IDioryObject } from '@diory/types'

export function getDate(linkedDiorys: IDioryObject[]): string | undefined {
  const epocDates = linkedDiorys
    .map(({ date }) => date)
    .filter(Boolean)
    .map((date) => Date.parse(<string>date))
    .filter((date) => !isNaN(date))
    .sort()

  return epocDates.length ? new Date(epocDates[0]).toISOString() : undefined
}
