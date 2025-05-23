import { join } from 'path-browserify'
import { Diory } from '@diograph/diograph'
import { v4 } from 'uuid'

import { mockDataClient } from './utils/testUtils'

import { generateDiograph } from './generateDiograph'
import * as allDiographJson from './__fixtures__/diograph.json'
import * as exampleDiographJson from './__fixtures__/example-folder/diograph.json'
import * as oldDiographJson from './__fixtures__/example-folder/old-folder/diograph.json'

// Mocks
let dioryId = 0
function generateMockId(prefix: string) {
  return `${prefix}-${dioryId++}`
}

jest.mock('@diograph/file-generator', () => ({
  generateDiory: (_: string, filePath: string) =>
    Promise.resolve(
      new Diory({
        id: generateMockId('new-diory-id'),
        text: 'new',
        data: [
          {
            '@context': 'some-schema',
            '@type': 'some-type',
            contentUrl: filePath,
            encodingFormat: 'some-encodingFormat',
          },
        ],
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
    jest.setSystemTime(new Date('2023-01-01T00:00:00.000Z'))
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
        { saveDiograph: true, level: 10 },
      )

      expect(diograph).toEqual(allDiographJson)
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

      expect(diograph).toEqual(exampleDiographJson)
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

    it('gets diograph and paths from old folder files', async () => {
      const folderPath = join(__dirname, '/__fixtures__/example-folder/old-folder')
      dioryId = 0

      const diograph = await generateDiograph(
        folderPath,
        '/',
        mockDataClient('old-folder', '2022-01-01', '2023-01-01'),
        { saveDiograph: true },
      )

      expect(diograph).toEqual(oldDiographJson)
    })
  })
})
