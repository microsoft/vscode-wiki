# Code Build Process

Code is using `gulp` to build its code base. The most important tasks are:

* `watch`: Translates the TypeScript source files to JavaScript and starts a watch mode that incrementally translates TypeScript files. The incremental build is based on the `gulp-tsb` module. The TypeScript is compiled into the `out` folder.
* `test`: Runs the mocha tests
* `vscode-[platform]-min`: Builds a packaged and minified version of the code for the given `[platform]`
* `minify-editor`: Build a minified version of the Monaco editor
