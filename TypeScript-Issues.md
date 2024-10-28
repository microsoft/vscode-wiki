This document covers how to handle and report issues with VS Code's built-in JavaScript and TypeScript support.

# Reporting issue

Here's how to report a high quality TypeScript issue report. Make sure to also follow our [general issue reporting guide](https://github.com/microsoft/vscode/wiki/Submitting-Bugs-and-Suggestions).

1. Figure out if the issue is with TypeScript itself or with VS Code's TypeScript support

    If the issue is about TypeScript itself, it should be [reported against TypeScript directly](https://github.com/microsoft/typescript/issues/new/choose). Example TypeScript issues include:

    - Issues with type checking
    - Issues with IntelliSense not working as expected in JavaScript or TypeScript
    - Issues with compiling TypeScript
    - Questions about how to use TypeScript 

    If the issue is instead about VS Code's JavaScript and TypeScript support, please continue on

2. Check the [most common causes of issues and crashes](#most-common-causes-of-problems)

    The majority of TypeScript issues and crashes are caused by a [few common problems](#most-common-causes-of-problems)

2. For tooling issues, provide clear steps to reproduce the issue

    Clearly describe the issue and provide simple steps to reproduce the problem. Make sure to include all the relevant code needed to investigate the issue. If your code is complex or lengthy, try reducing the example down to the minimum amount of code possible. 

3. For crashes, provide the TypeScript crash log

    See [Collecting crash logs](#collecting-ts-server-crash-logs) for steps about how to collect the logs from the crashed server. Make sure to attach these logs to your issue report

For additional suggestions and guidance, see our [general issue reporting guide](https://github.com/microsoft/vscode/wiki/Submitting-Bugs-and-Suggestions)


# Most Common Causes of Problems

- [Extensions and plugins](#extensions-and-typescript-plugins)
- [Outdated TypeScript version](#outdated-typeScript-version)
- [Memory usage](#memory-usage)


### Extensions and Plugins
Extensions can modify the behavior of VS Code's built-in TypeScript service. This is commonly used to add specialized tooling features or support different syntax such as Vue.

However these extensions are also the leading cause of instability in VS Code's built-in JavaScript and TypeScript support. If you are seeing crashes or other issues, always first try [disabling all extensions](https://code.visualstudio.com/docs/editor/extension-gallery#_disable-an-extension) or use start extension bisect via "F1 > Start Extension Bisect". If you find the issue is caused by an extension you have installed please file an issue on the extension.

Additionally if you are using a workspace version of TypeScript, make sure to also try disabling any local plugins that are picked up by your `tsconfig` or `jsconfig`


### Outdated TypeScript version
The latest VS Code release typically includes the latest stable TypeScript version. If you have told VS Code to use your workspace version of TypeScript, you may be using an older version that has bugs that have already been fixed.

Before reporting an issue, please make sure your Typescript version is up to date by:

- Make sure your VS Code version is fully up to date. 

- Make sure you are using VS Code's version of TypeScript (or a new version). With a JavaScript or TypeScript file open, run the `TypeScript: Select TypeScript version` command. Confirm that `Use VS Code's version` is selected


### Memory usage
For large or especially complex projects, it's possible that the TypeScript server may run out of memory which can cause the service to crash. You can double check memory usage using the [process explorer](https://github.com/Microsoft/vscode/wiki/Performance-Issues)
 
If you suspect that memory usage is causing the TypeScript service to crash, first try [splitting your code. See [working with large projects](#working-with-large-projects) for tips

If this still doesn't work, you can try increasing the memory available to the TypeScript server:

1. In the VS Code settings, set `typescript.tsserver.nodePath` so that the TypeScript server runs using your local node version
1. Increase the `typescript.tsserver.maxTsServerMemory` to a reasonable upper limit for memory usage. Make sure your system has enough memory for this.

# Diagnosing issues

## Collecting TS Server Crash Logs

The TypeScript server logs provide detailed information that we can use to investigate crashes and other issues. To collect the logs after the TypeScript server has crashed:

1. Set `"typescript.tsserver.log": "verbose"`
1. Restart VS Code and reproduce the problem
1. Open the `TypeScript` section of the output panel
1. At the very top, find the first line that prints to path to the semantic error log file. It should look something like:

    ```
    [Info  - 19:54:59.247] <semantic> Log file: /Users/matb/Library/Application Support/Code - Insiders/logs/20200213T104930/exthost55/vscode.typescript-language-features/tsserver-log-ZT2zau/tsserver.log
    ```

    That file contains the typescript logs.

When reporting the issue, please either include the full logs or a redacted version of them.

 > **⚠️Warning:** The TypeScript log may include information from your workspace, including file paths and source code. If you have any concerns about posting this publicly on Github, just let me know and we can arrange something else. On our side, we only use these logs to investigate issues like this

## Collecting running TS Server logs

If you're seeing a TypeScript issue that is not a crash, it's often helpful to share the logs from the currently running TypeScript server instance. 

1. Set `"typescript.tsserver.log": "verbose"`
1. Restart VS Code and reproduce the problem
1. With a JavaScript or TypeScript file opened and focused, run the `TypeScript: Open TS Server Log` command.

This will open the current logs file in VS Code. 


# Working with large projects

If you are working in a codebase with hundreds or thousands of TypeScript files, here are some steps you can take to improve both the editing experience in VS Code as well as compile times on the command line.

### Make sure your tsconfig only includes files you care about

Use `include` or `files` in your project's `tsconfig.json` to make sure the project only includes the files that should be part of the project.

[More information](https://github.com/microsoft/TypeScript/wiki/Performance#configuring-tsconfigjson-or-jsconfigjson) on configuring your project's `tsconfig.json`.

### Break up your project using project references

Instead of structuring your source code as a single large project, you can improve performance by breaking it up into smaller projects using [project references](https://www.typescriptlang.org/docs/handbook/project-references.html). This allows TypeScript to load just a subset of your codebase at a time, instead of loading the entire thing.

See the [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/project-references.html) for details on how to use project references and best practices for working with them.
