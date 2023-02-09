import { statSync } from 'fs'

export function getCreate(filePath: string): string | undefined {
  const { birthtime } = statSync(filePath) || {}
  return birthtime && birthtime.toISOString()
}
