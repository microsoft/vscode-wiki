Code uses `gulp` to build its code base. The most important tasks are:

* `watch`: Translates the TypeScript source files to JavaScript and starts a watch mode that incrementally translates TypeScript files into JavaScript. The incremental build is based on the [`gulp-tsb`](https://github.com/jrieken/gulp-tsb) module. The TypeScript is compiled into the `out` folder.
* `test`: Runs the mocha tests.

## Deployment

VS Code currently can be deployed to: `win32|darwin|linux-ia32|linux-x64|linux-arm`.

* `vscode-[platform]`: Builds a packaged and minified version of the code for the given `[platform]`.
* `vscode-[platform]-min`: Builds a packaged and minified version of the code for the given `[platform]`.

The resulting build is placed inside the parent of the `vscode` directory (`../`).

* `minify-editor`: Build a minified version of the "VSCode" editor.
