import { basename } from 'path'

export function getText(filePath: string) {
  return basename(filePath)
}
