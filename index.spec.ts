import { Diory } from '@diograph/diograph'

const { join } = require('path')

// Mocks
let id = 0
function generateMockFileDioryId() {
  return `some-file-diory-id${id++}`
}

jest.mock('@diograph/file-generator', () => ({
  generateFileDiory: (rootPath: string, path: string) =>
    Promise.resolve(new Diory({ id: generateMockFileDioryId(), path })),
}))

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValueOnce('subfolder-uuid').mockReturnValueOnce('folder-uuid'),
}))

jest.useFakeTimers()
jest.setSystemTime(new Date('2022-01-01T00:00:00.000Z'))

// Tests
import { generateDiograph } from './index'

describe('generateDiograph', () => {
  beforeAll(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0)
  })

  afterAll(() => {
    jest.spyOn(Math, 'random').mockReset()
  })

  describe('given folder path', () => {
    it('generates diograph from folder files and subfolders', async () => {
      const folderPath = join(__dirname, '/__fixtures__/example-folder')

      const diograph = await generateDiograph(folderPath)

      expect(diograph.toObject()).toMatchInlineSnapshot(`
        Object {
          "folder-uuid": Object {
            "created": "2022-12-28T14:05:18.910Z",
            "date": "2022-12-28T14:05:18.924Z",
            "id": "folder-uuid",
            "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMPvD6PwAGiwMHcHyXEAAAAABJRU5ErkJggg==",
            "links": Array [
              Object {
                "id": "some-file-diory-id1",
                "path": "image-with-24-hour.jpg",
              },
              Object {
                "id": "some-file-diory-id2",
                "path": "some-document.docx",
              },
              Object {
                "id": "some-file-diory-id3",
                "path": "some-document.odt",
              },
              Object {
                "id": "some-file-diory-id4",
                "path": "some-document.pdf",
              },
              Object {
                "id": "subfolder-uuid",
                "path": "some-folder",
              },
              Object {
                "id": "some-file-diory-id5",
                "path": "some-image.jpg",
              },
              Object {
                "id": "some-file-diory-id6",
                "path": "some-music.mp3",
              },
              Object {
                "id": "some-file-diory-id7",
                "path": "some-text.txt",
              },
              Object {
                "id": "some-file-diory-id8",
                "path": "some-video.mp4",
              },
            ],
            "modified": "2022-12-28T14:05:19.085Z",
            "path": "/",
            "text": "example-folder",
          },
          "some-file-diory-id0": Object {
            "created": "2022-01-01T00:00:00.000Z",
            "id": "some-file-diory-id0",
            "modified": "2022-01-01T00:00:00.000Z",
            "path": "some-folder-image.jpg",
          },
          "some-file-diory-id1": Object {
            "created": "2022-01-01T00:00:00.000Z",
            "id": "some-file-diory-id1",
            "modified": "2022-01-01T00:00:00.000Z",
            "path": "image-with-24-hour.jpg",
          },
          "some-file-diory-id2": Object {
            "created": "2022-01-01T00:00:00.000Z",
            "id": "some-file-diory-id2",
            "modified": "2022-01-01T00:00:00.000Z",
            "path": "some-document.docx",
          },
          "some-file-diory-id3": Object {
            "created": "2022-01-01T00:00:00.000Z",
            "id": "some-file-diory-id3",
            "modified": "2022-01-01T00:00:00.000Z",
            "path": "some-document.odt",
          },
          "some-file-diory-id4": Object {
            "created": "2022-01-01T00:00:00.000Z",
            "id": "some-file-diory-id4",
            "modified": "2022-01-01T00:00:00.000Z",
            "path": "some-document.pdf",
          },
          "some-file-diory-id5": Object {
            "created": "2022-01-01T00:00:00.000Z",
            "id": "some-file-diory-id5",
            "modified": "2022-01-01T00:00:00.000Z",
            "path": "some-image.jpg",
          },
          "some-file-diory-id6": Object {
            "created": "2022-01-01T00:00:00.000Z",
            "id": "some-file-diory-id6",
            "modified": "2022-01-01T00:00:00.000Z",
            "path": "some-music.mp3",
          },
          "some-file-diory-id7": Object {
            "created": "2022-01-01T00:00:00.000Z",
            "id": "some-file-diory-id7",
            "modified": "2022-01-01T00:00:00.000Z",
            "path": "some-text.txt",
          },
          "some-file-diory-id8": Object {
            "created": "2022-01-01T00:00:00.000Z",
            "id": "some-file-diory-id8",
            "modified": "2022-01-01T00:00:00.000Z",
            "path": "some-video.mp4",
          },
          "subfolder-uuid": Object {
            "created": "2022-12-28T14:05:18.924Z",
            "date": "2022-12-28T14:05:18.924Z",
            "id": "subfolder-uuid",
            "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMPvD6PwAGiwMHcHyXEAAAAABJRU5ErkJggg==",
            "links": Array [
              Object {
                "id": "some-file-diory-id0",
                "path": "some-folder-image.jpg",
              },
            ],
            "modified": "2022-12-28T14:05:18.942Z",
            "path": "some-folder",
            "text": "some-folder",
          },
        }
      `)
    })
  })
})
