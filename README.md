# Olympe Project Template

## Setup a New Project
To setup any project with Olympe:
1. Create a new project from this template
2. Modify the `res/oConfig.json` file with your instance information

## Getting Started with the Community
Please refer to [Olympe Support](https://support.olympe.io/) page to learn how to: [Install CODE](https://support.olympe.io/local_install).

## Available Commands
Run `npm run` to see a list of available commands. To run any command, run
```
npm run <command>
```

| Command | Description |
| --- | --- |
| `serve` | Shortcut for `serve:draw` |
| `serve:draw` | Build DRAW and your project and serve them on http://localhost:8888/ |
| `serve:node` | Build your NodeJS application and run it locally |
| `build` | Shortcut for `build:draw` |
| `build:draw` | Build DRAW and your project |
| `build:node` | Build your NodeJS application |

## Webpack Configuration
Your project relies on [Webpack](https://webpack.js.org/) to be built and served. See files `webpack.config.js`.
Webpack is configured to resolve package `olympe` as `@olympeio/draw` but it can be set differently if you need to deploy `@olympeio/runtime-web` only, for example.

## Running a Service Application
If you need to setup a backend, modify the `res/oConfigNode.json` file.