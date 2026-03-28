# @diograph/folder-generator

Scans a folder structure and generates a **Diograph** — a flat key-value graph of **Diories** (content nodes) representing files and folders.

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

## Data Model

A Diograph is a flat object with two types of keys:

- Address keys (`"/"`, `"/sub-folder/"`) → `{ id }` pointer to a diory
- Id keys (`"some-uuid"`) → full diory object

Diory fields: `id`, `text`, `image`, `links`, `data`, `latlng`, `created`, `modified`

Links always reference by real uuid: `{ id: "some-uuid" }` — never path-like ids.

## Pipeline

`generateDiograph(rootUrl, folderPath, client, options)` runs in 4 steps:

1. `getFolderPaths` — recursively scans the folder tree, collecting paths with their file and subfolder names
2. `getDiories` — reads existing `diograph.json` files, maps id-key diories to their address key paths
3. `generateDiories` — generates new diories for files/folders not yet in `oldDiories`, then updates folder diories with `image`, `date`, `latlng`, and `links` from their children
4. `convertToDiograph` — converts the flat diories map into a Diograph, adding address keys for all folder paths

Optionally saves the result as `diograph.json` via the client.

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
