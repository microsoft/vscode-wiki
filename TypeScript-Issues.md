This document cover reporting issues with VS Code's built-in JavaScript and TypeScript support.

## Most Common Causes of Crashes

#### Extensions and TypeScript plugins
Extensions can modify the behavior of VS Code's built-in TypeScript service. This is commonly used to add specialized tooling features or support different syntax such as Vue.

However these extensions are also the leading cause of instability in VS Code's built-in JavaScript and TypeScript support. If you are seeing crashes or other issues, always first try [disabling all extensions](https://code.visualstudio.com/docs/editor/extension-gallery#_disable-an-extension) or use start extension bisect via "F1 > Start Extension Bisect". If you find the issue is caused by an extension you have installed please file an issue on the extension.

Additionally if you are using a workspace version of TypeScript, make sure to also try disabling any local plugins that are picked up by your `tsconfig` or `jsconfig`


#### Outdated TypeScript versions

#### Memory issues

 


## Reporting issues




## Working with large projects

If you are working in a codebase with hundreds or thousands of TypeScript files, here are some steps you can take to improve both the editing experience in VS Code as well as compile times on the command line.

### Make sure your tsconfig only includes files you care about

Use `include` or `files` in your project's `tsconfig.json` to make sure the project only includes the files that should be part of the project.

[More information](https://github.com/microsoft/TypeScript/wiki/Performance#configuring-tsconfigjson-or-jsconfigjson) on configuring your project's `tsconfig.json`.

### Break up your project using project references

Instead of structuring your source code as a single large project, you can improve performance by breaking it up into smaller projects using [project references](https://www.typescriptlang.org/docs/handbook/project-references.html). This allows TypeScript to load just a subset of your codebase at a time, instead of loading the entire thing.

See the [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/project-references.html) for details on how to use project references and best practices for working with them.
