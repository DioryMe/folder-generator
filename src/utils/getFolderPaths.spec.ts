const { join } = require('path-browserify')
import { getFolderPaths } from './getFolderPaths'
import { LocalClient } from '@diograph/local-client'

describe('getFolderPaths', () => {
  describe('given root folder path', () => {
    it('returns all subfolder paths with file and subfolder names', async () => {
      const folderPath = join(__dirname, '../__fixtures__/example-folder')

      const folderPaths = await getFolderPaths(folderPath, '/', new LocalClient(), 2)

      expect(folderPaths).toMatchInlineSnapshot(`
        Array [
          Object {
            "fileNames": Array [
              "image-with-24-hour.jpg",
              "some-document.docx",
              "some-document.odt",
              "some-document.pdf",
              "some-image.jpg",
              "some-sub-folder-image.jpg",
            ],
            "path": "/new-folder",
            "subfolderNames": Array [],
          },
          Object {
            "fileNames": Array [
              "image-with-24-hour.jpg",
              "some-document.docx",
              "some-document.odt",
              "some-document.pdf",
              "some-image.jpg",
            ],
            "path": "/old-folder",
            "subfolderNames": Array [],
          },
          Object {
            "fileNames": Array [
              "some-music.mp3",
              "some-text.txt",
              "some-video.mp4",
            ],
            "path": "/",
            "subfolderNames": Array [
              "new-folder",
              "old-folder",
            ],
          },
        ]
      `)
    })

    describe('given level 1', () => {
      it('returns root folder paths with file and subfolder names', async () => {
        const folderPath = join(__dirname, '../__fixtures__/example-folder')

        const folderPaths = await getFolderPaths(folderPath, '/', new LocalClient(), 1)

        expect(folderPaths).toMatchInlineSnapshot(`
          Array [
            Object {
              "fileNames": Array [
                "some-music.mp3",
                "some-text.txt",
                "some-video.mp4",
              ],
              "path": "/",
              "subfolderNames": Array [
                "new-folder",
                "old-folder",
              ],
            },
          ]
        `)
      })
    })
  })
})
