This example shows the integration with bundled golery-editor library.
It has dependency to main... to include the whole package in dist folder.

# RUN
yarn dev
Access: http://localhost:8080/

# HOW TO UPDATE PACKAGE
## Build: 
$main yarn build   or yarn watch

## Sync with example:
- Add dependency (one time) 
  To update node_modules with latest version of golery-editor from local
  yarn add ../main
  rm -rf node_modules/golery-editor/node_modules/
  
- Sync manuall:
cp -r /work/golery-editor/main/package.json /work/golery-editor/example/node_modules/golery-editor/
cp -r /work/golery-editor/main/dist /work/golery-editor/example/node_modules/golery-editor/

- Troubleshoot:
'Invalid hook call. Hooks can only be called inside of the body of a function component.'
Need to delete node_modules/golery-editor/node_modules



==== [OLD DOC]

# USE LOCAL DEV VERSION OF GOLERY-EDITOR
**/main:**
`yarn build.dev`
Build only dist/index.dev.js with source map. It's faster.

**/example/src:**

`import from  from "golery-editor/dist/index.dev.js";`
use dev bundle with source map.
Alternative: index.min.js

**/example/package.json:**
`golery-editor:"../main"`
Use local version (still need yarn upgrade golery-editor for each change)


**/example**
`yarn upgrade golery-editor && yarn dev`
Access at localhost:8080


# MORE
**Build**
/main:
yarn build - Build both index.dev.js with source map and index.min.js for production
yarn build.dev - Build only index.dev.js, much faster

**Package.json**
/example:

`"golery-editor": "*"`
Use latest version from 
or use local version (still needs yarn upgrade golery-editor)
`yarn install ../main`

# PUBLISHED VERSION AND TEST PRODUCTION VERSION
**/main:**

`yarn build`

`yarn publish`

Use version 1.1.0-alpha.x
 
**/example/package.json:**

`depedency {
 "golery-editor": "*",
}`

`yarn upgrade golery-editor`

**/example/src:**

`import from  from "golery-editor/dist/index.min.js";`


**/example**

`yarn dev`

Access at localhost:8080

**/golery project**

`yarn upgrade --latest golery-editor`
Access:
http://localhost:8080/pencil?sandbox