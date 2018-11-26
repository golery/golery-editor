An example of how to use golery-editor.
This is for integration demo only.
For dev, use main/src/sandbox (ref. main/src/sandbox/README.md)

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