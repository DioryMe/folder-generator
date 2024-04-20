import { statSync } from 'fs'

export function getModified(filePath: string): string | undefined {
  const { mtime } = statSync(filePath) || {}
  return mtime && mtime.toISOString()
}
