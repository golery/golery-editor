# Project structure
-main: library main code
-example: example of using library via npm package dependency

# DEV main
yarn dev
http://localhost:9000
Use sandbox as storybook for development

# DEV example:
read example/README.md

# To publish:   
/main:

1. Build both dev and prod vesrion

`yarn build`

2. Publish

`yarn publish`

3. In golery project
`yarn upgrade --latest golery-editor`
`yarn upgrade --latest golery-slate-edit-list`

# DEV: Run at local for dev
## Sandbox for browser
Sandbox for render editor in browser mode.
[/main] yarn dev
Access: http://localhost:9000


## Sandbox for nodejs
Sandbox for nodejs. It validates that the library can be safely imported from nodejs env
[/main] yarn watch.node
[/main] yarn dev.node

# UX
## Shortcuts
- Ctrl-/ : code block
- Ctrl-b or u or i: basic format