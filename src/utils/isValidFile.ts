const excludedFileNames = ['diories.json']

export const isValidFile = (fileName: string): boolean => !excludedFileNames.includes(fileName)
