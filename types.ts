import { IDiory } from '@diograph/diograph/types'

export interface IFolderPath {
  path: string
  fileNames: string[]
  subFolderNames?: string[]
}

export interface IPaths {
  [dioryId: string]: string
}

export interface IDiories {
  [path: string]: IDiory
}
