import { join } from 'path-browserify'
import { Diory } from '@diograph/diograph'

import { mockDataClient } from './testUtils'

import { generateDiograph } from './generateDiograph'
import * as diographJson from './__fixtures__/diograph.json'
import * as pathsJson from './__fixtures__/paths.json'

// Mocks
let dioryId = 0
function generateMockFileDioryId() {
  return `some-file-diory-id-${dioryId++}`
}

jest.mock('@diograph/file-generator', () => ({
  generateDiory: () =>
    Promise.resolve(
      new Diory({
        id: generateMockFileDioryId(),
        text: 'generated',
      }),
    ),
}))

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValueOnce('sub-folder-uuid').mockReturnValueOnce('folder-uuid'),
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
    it('generates diograph and paths from folder files and subfolders', async () => {
      const folderPath = join(__dirname, '/__fixtures__/example-folder')
      dioryId = 0

      const { diograph, paths } = await generateDiograph(
        folderPath,
        mockDataClient('example-folder', '2022-01-01', '2023-01-01'),
      )

      expect(diograph.toObject()).toEqual(diographJson)
      expect(paths).toEqual(pathsJson)
    })
  })
})
