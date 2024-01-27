# @diograph/folder-generator

## Install

```
npm install @diograph/folder-generator
# or
yarn add @diograph/folder-generator
```

## Usage

```
import { generateDiograph } from '@diograph/folder-generator'

const diograph = await generateDiograph(folderPath)
console.log('Hello diograph!', diograph.toObject())
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

## Publish

Create new version and publish to npm:

```
yarn publish
```
