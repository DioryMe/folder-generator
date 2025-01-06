import { join } from 'path-browserify'
import { Diory } from '@diograph/diograph'

import { mockDataClient } from './testUtils'

import { generateDiograph } from './generateDiograph'
import * as diographJson from './__fixtures__/diograph.json'

// Mocks
let dioryId = 0
function generateMockFileDioryId() {
  return `some-file-diory-id-${dioryId++}`
}

jest.mock('@diograph/file-generator', () => ({
  generateDiory: (_: string, filePath: string) =>
    Promise.resolve(
      new Diory({
        id: generateMockFileDioryId(),
        text: 'generated',
        data: [{
          '@context': 'some-schema',
          '@type': 'some-type',
          contentUrl: filePath,
          encodingFormat: 'some-encodingFormat',
        }]
      }),
    ),
}))

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('new-folder-uuid'),
}))

describe('generateDiograph', () => {
  beforeAll(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0)
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2022-01-01T00:00:00.000Z'))
  })

  afterAll(() => {
    jest.spyOn(Math, 'random').mockReset()
    jest.useRealTimers()
  })

  describe('given folder path', () => {
    it('generates diograph and paths from new and old folder files and subfolders', async () => {
      const folderPath = join(__dirname, '/__fixtures__/example-folder')
      dioryId = 0

      const diograph = await generateDiograph(
        folderPath,
        '/',
        mockDataClient('example-folder', '2022-01-01', '2023-01-01'),
        { saveDiograph: true },
      )

      expect(diograph).toEqual(diographJson)
    })

    it('generates diograph from example folder files and subfolders', async () => {
      const folderPath = join(__dirname, '/__fixtures__/example-folder')
      dioryId = 0

      const diograph = await generateDiograph(
        folderPath,
        '/',
        mockDataClient('example-folder', '2022-01-01', '2023-01-01'),
        { saveDiograph: true, level: 1 },
      )

      expect(diograph).toEqual(diographJson)
    })

    it('generates diograph and paths from new folder files and subfolders', async () => {
      const folderPath = join(__dirname, '/__fixtures__/example-folder/new-folder')
      dioryId = 0

      const diograph = await generateDiograph(
        folderPath,
        '/',
        mockDataClient('new-folder', '2022-01-01', '2023-01-01'),
        { saveDiograph: true },
      )

      expect(diograph).toMatchSnapshot()
    })

    it('generates diograph and paths from old folder files and subfolders', async () => {
      const folderPath = join(__dirname, '/__fixtures__/example-folder/old-folder')
      dioryId = 0

      const diograph = await generateDiograph(
        folderPath,
        '/',
        mockDataClient('old-folder', '2022-01-01', '2023-01-01'),
        { saveDiograph: true },
      )

      expect(diograph).toMatchSnapshot()
    })
  })
})
