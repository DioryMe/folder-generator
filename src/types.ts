import { IDiory } from '@diory/types'

export interface IFolderPath {
  path: string
  fileNames: string[]
  subfolderNames?: string[]
}

export interface IPaths {
  [dioryId: string]: string
}

export interface IDiories {
  [path: string]: IDiory
}

export interface GenerateDiographOptions {
  level?: number
  saveDiories?: boolean
}
