const { join } = require('path-browserify')
import { getFolderPaths } from './getFolderPaths'
import { LocalClient } from '@diograph/local-client'

describe('getFolderPaths', () => {
  describe('given root folder path', () => {
    it('returns all subfolder paths with file and subfolder names', async () => {
      const folderPath = join(__dirname, '../__fixtures__/example-folder')

      const folderPaths = await getFolderPaths(folderPath, '/', new LocalClient())

      expect(folderPaths).toMatchInlineSnapshot(`
        Array [
          Object {
            "fileNames": Array [
              "some-sub-folder-image.jpg",
            ],
            "path": "/some-sub-folder",
            "subFolderNames": Array [],
          },
          Object {
            "fileNames": Array [
              "image-with-24-hour.jpg",
              "some-document.docx",
              "some-document.odt",
              "some-document.pdf",
              "some-image.jpg",
              "some-music.mp3",
              "some-text.txt",
              "some-video.mp4",
            ],
            "path": "/",
            "subFolderNames": Array [
              "some-sub-folder",
            ],
          },
        ]
      `)
    })
  })
})
