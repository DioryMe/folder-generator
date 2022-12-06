# @diograph/folder-generator

## Install

```
npm install @diograph/folder-generator
# or
yarn add @diograph/folder-generator
```

## Usage

```
import { FolderDiory } from '@diograph/folder-generator'

const folderDiory = new FolderDiory.generate(folderPath)
console.log('Hello Folder!', folderDiory.toObject())

const folderDiograph = folderDiory.generateDiograph()
console.log('Hello Folder!', folderDiograph.toObject())
```

## Development

Compile typescript in real time to `/dist` folder:

```
yarn build-watch
```

Run unit tests in the background:

```
yarn test-watch
```
