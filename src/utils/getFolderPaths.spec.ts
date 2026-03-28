const { join } = require('path-browserify')
import { LocalClient } from '@diograph/local-client'

import * as folderPathsFixture from './getFolderPaths.fixture.json'

import { getFolderPaths } from './getFolderPaths'

describe('getFolderPaths', () => {
  describe('given root folder path', () => {
    it('returns all subfolder paths with file and subfolder names', async () => {
      const folderPath = join(__dirname, '../__fixtures__/example-folder')

      const folderPaths = await getFolderPaths(folderPath, '/', new LocalClient(), 2)

      expect(folderPaths).toEqual(folderPathsFixture)
    })

    describe('given level 1', () => {
      it('returns root folder paths with file and subfolder names', async () => {
        const folderPath = join(__dirname, '../__fixtures__/example-folder')

        const folderPaths = await getFolderPaths(folderPath, '/', new LocalClient(), 1)

        expect(folderPaths).toEqual([folderPathsFixture[2]])
      })
    })
  })
})
