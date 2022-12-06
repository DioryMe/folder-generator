import { IDiory, IDioryLinks } from 'diograph-js'

export interface IFolderDiory extends IDiory {
  updateFromLinks: (dioryLinks: IDioryLinks) => IFolderDiory
}
