import { statSync } from 'fs'

export function getCreated(filePath: string): string | undefined {
  const { birthtime } = statSync(filePath) || {}
  return birthtime && birthtime.toISOString()
}
