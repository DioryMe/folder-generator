const { join } = require('path-browserify')
import { LocalClient } from '@diograph/local-client'

import * as folderPathsFixture from './getFolderPaths.fixture.json'
import { getDiories } from './getDiories'

describe('getDiories', () => {
  describe('given root folder path', () => {
    it('returns all subfolder paths with file and subfolder names', async () => {
      const folderPath = join(__dirname, '../__fixtures__/example-folder')

      const diories = await getDiories(folderPath, new LocalClient(), folderPathsFixture)

      expect(diories).toMatchInlineSnapshot(`
        Object {
          "/": Diory {
            "callback": [Function],
            "created": "2022-01-01T00:00:00.000Z",
            "data": undefined,
            "date": "2022-01-01T00:00:00.000Z",
            "id": "folder-uuid",
            "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMPvD6PwAGiwMHcHyXEAAAAABJRU5ErkJggg==",
            "latlng": undefined,
            "links": Array [
              Object {
                "id": "/new-folder/",
              },
              Object {
                "id": "/old-folder/",
              },
              Object {
                "id": "example-diory-id-0",
              },
              Object {
                "id": "example-diory-id-1",
              },
              Object {
                "id": "example-diory-id-2",
              },
            ],
            "modified": "2022-01-01T00:00:00.000Z",
            "text": "example-folder",
            "toJson": [Function],
            "toObject": [Function],
            "update": [Function],
          },
          "/old-folder/": Diory {
            "callback": [Function],
            "created": "2022-01-01T00:00:00.000Z",
            "data": undefined,
            "date": "2022-01-01T00:00:00.000Z",
            "id": "old-folder-uuid",
            "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMPvD6PwAGiwMHcHyXEAAAAABJRU5ErkJggg==",
            "latlng": undefined,
            "links": Array [
              Object {
                "id": "old-diory-id-0",
              },
              Object {
                "id": "old-diory-id-1",
              },
              Object {
                "id": "old-diory-id-2",
              },
              Object {
                "id": "old-diory-id-3",
              },
              Object {
                "id": "old-diory-id-4",
              },
            ],
            "modified": "2022-01-01T00:00:00.000Z",
            "text": "old-folder",
            "toJson": [Function],
            "toObject": [Function],
            "update": [Function],
          },
          "/old-folder/image-with-24-hour.jpg": Diory {
            "callback": [Function],
            "created": "2022-01-01T00:00:00.000Z",
            "data": Array [
              Object {
                "contentUrl": "/image-with-24-hour.jpg",
              },
            ],
            "date": undefined,
            "id": "old-diory-id-0",
            "image": undefined,
            "latlng": undefined,
            "links": undefined,
            "modified": "2022-01-01T00:00:00.000Z",
            "text": undefined,
            "toJson": [Function],
            "toObject": [Function],
            "update": [Function],
          },
          "/old-folder/some-document.docx": Diory {
            "callback": [Function],
            "created": "2022-01-01T00:00:00.000Z",
            "data": Array [
              Object {
                "contentUrl": "/some-document.docx",
              },
            ],
            "date": undefined,
            "id": "old-diory-id-1",
            "image": undefined,
            "latlng": undefined,
            "links": undefined,
            "modified": "2022-01-01T00:00:00.000Z",
            "text": undefined,
            "toJson": [Function],
            "toObject": [Function],
            "update": [Function],
          },
          "/old-folder/some-document.odt": Diory {
            "callback": [Function],
            "created": "2022-01-01T00:00:00.000Z",
            "data": Array [
              Object {
                "contentUrl": "/some-document.odt",
              },
            ],
            "date": undefined,
            "id": "old-diory-id-2",
            "image": undefined,
            "latlng": undefined,
            "links": undefined,
            "modified": "2022-01-01T00:00:00.000Z",
            "text": undefined,
            "toJson": [Function],
            "toObject": [Function],
            "update": [Function],
          },
          "/old-folder/some-document.pdf": Diory {
            "callback": [Function],
            "created": "2022-01-01T00:00:00.000Z",
            "data": Array [
              Object {
                "contentUrl": "/some-document.pdf",
              },
            ],
            "date": undefined,
            "id": "old-diory-id-3",
            "image": undefined,
            "latlng": undefined,
            "links": undefined,
            "modified": "2022-01-01T00:00:00.000Z",
            "text": undefined,
            "toJson": [Function],
            "toObject": [Function],
            "update": [Function],
          },
          "/old-folder/some-image.jpg": Diory {
            "callback": [Function],
            "created": "2022-01-01T00:00:00.000Z",
            "data": Array [
              Object {
                "contentUrl": "/some-image.jpg",
              },
            ],
            "date": undefined,
            "id": "old-diory-id-4",
            "image": undefined,
            "latlng": undefined,
            "links": undefined,
            "modified": "2022-01-01T00:00:00.000Z",
            "text": undefined,
            "toJson": [Function],
            "toObject": [Function],
            "update": [Function],
          },
          "/some-music.mp3": Diory {
            "callback": [Function],
            "created": "2022-01-01T00:00:00.000Z",
            "data": Array [
              Object {
                "contentUrl": "/some-music.mp3",
              },
            ],
            "date": undefined,
            "id": "example-diory-id-0",
            "image": undefined,
            "latlng": undefined,
            "links": undefined,
            "modified": "2022-01-01T00:00:00.000Z",
            "text": undefined,
            "toJson": [Function],
            "toObject": [Function],
            "update": [Function],
          },
          "/some-text.txt": Diory {
            "callback": [Function],
            "created": "2022-01-01T00:00:00.000Z",
            "data": Array [
              Object {
                "contentUrl": "/some-text.txt",
              },
            ],
            "date": undefined,
            "id": "example-diory-id-1",
            "image": undefined,
            "latlng": undefined,
            "links": undefined,
            "modified": "2022-01-01T00:00:00.000Z",
            "text": undefined,
            "toJson": [Function],
            "toObject": [Function],
            "update": [Function],
          },
          "/some-video.mp4": Diory {
            "callback": [Function],
            "created": "2022-01-01T00:00:00.000Z",
            "data": Array [
              Object {
                "contentUrl": "/some-video.mp4",
              },
            ],
            "date": undefined,
            "id": "example-diory-id-2",
            "image": undefined,
            "latlng": undefined,
            "links": undefined,
            "modified": "2022-01-01T00:00:00.000Z",
            "text": undefined,
            "toJson": [Function],
            "toObject": [Function],
            "update": [Function],
          },
        }
      `)
    })

    describe('given level 1', () => {
      it('returns root folder paths with file and subfolder names', async () => {
        const folderPath = join(__dirname, '../__fixtures__/example-folder')

        const diories = await getDiories(folderPath, new LocalClient(), [folderPathsFixture[2]])

        expect(diories).toMatchInlineSnapshot(`
          Object {
            "/": Diory {
              "callback": [Function],
              "created": "2022-01-01T00:00:00.000Z",
              "data": undefined,
              "date": "2022-01-01T00:00:00.000Z",
              "id": "folder-uuid",
              "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMPvD6PwAGiwMHcHyXEAAAAABJRU5ErkJggg==",
              "latlng": undefined,
              "links": Array [
                Object {
                  "id": "/new-folder/",
                },
                Object {
                  "id": "/old-folder/",
                },
                Object {
                  "id": "example-diory-id-0",
                },
                Object {
                  "id": "example-diory-id-1",
                },
                Object {
                  "id": "example-diory-id-2",
                },
              ],
              "modified": "2022-01-01T00:00:00.000Z",
              "text": "example-folder",
              "toJson": [Function],
              "toObject": [Function],
              "update": [Function],
            },
            "/some-music.mp3": Diory {
              "callback": [Function],
              "created": "2022-01-01T00:00:00.000Z",
              "data": Array [
                Object {
                  "contentUrl": "/some-music.mp3",
                },
              ],
              "date": undefined,
              "id": "example-diory-id-0",
              "image": undefined,
              "latlng": undefined,
              "links": undefined,
              "modified": "2022-01-01T00:00:00.000Z",
              "text": undefined,
              "toJson": [Function],
              "toObject": [Function],
              "update": [Function],
            },
            "/some-text.txt": Diory {
              "callback": [Function],
              "created": "2022-01-01T00:00:00.000Z",
              "data": Array [
                Object {
                  "contentUrl": "/some-text.txt",
                },
              ],
              "date": undefined,
              "id": "example-diory-id-1",
              "image": undefined,
              "latlng": undefined,
              "links": undefined,
              "modified": "2022-01-01T00:00:00.000Z",
              "text": undefined,
              "toJson": [Function],
              "toObject": [Function],
              "update": [Function],
            },
            "/some-video.mp4": Diory {
              "callback": [Function],
              "created": "2022-01-01T00:00:00.000Z",
              "data": Array [
                Object {
                  "contentUrl": "/some-video.mp4",
                },
              ],
              "date": undefined,
              "id": "example-diory-id-2",
              "image": undefined,
              "latlng": undefined,
              "links": undefined,
              "modified": "2022-01-01T00:00:00.000Z",
              "text": undefined,
              "toJson": [Function],
              "toObject": [Function],
              "update": [Function],
            },
          }
        `)
      })
    })
  })
})
