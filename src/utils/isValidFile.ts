const excludedFileNames = ['diograph.json']

export const isValidFile = (fileName: string): boolean => !excludedFileNames.includes(fileName)
