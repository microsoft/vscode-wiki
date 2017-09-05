>**Note:** Multi-root functionality is currently only available in the Insiders build until we are confident enough that we can make it available in Stable. To try it out, grab our Insiders build from [https://code.visualstudio.com/insiders](https://code.visualstudio.com/insiders).

## Synopsis

This wiki page explains the impact of the new multi-root-workspace feature on extensions. You will learn the concepts, new APIs and understand if and how to make your extension ready for multi-root-workspace support.

A multi-root workspace is a new way how to work with VS Code. At its core it allows to open multiple folders in the same instance. All pieces of user interface adapt to the number of folders opened, e.g. the file explorer will show all folders in a single tree and the full text search will search across all folders.

![explorer](https://user-images.githubusercontent.com/900690/30064942-9dc2e608-9253-11e7-9f01-5b18f3e90065.png)

There are numerous ways how to create a multi-root workspace. The simplest one is to just open multiple folders from the command line: 

```
code-insiders <folder1> <folder2>...
```

All workspace metadata is stored in a simple JSON file that can be saved and shared with others:

```json
{
  "folders": [
    {
      "path": "some-path"
    },
    {
      "path": "some-other-path"
    }
  ],
  "settings": {
    "...any settings..."
  }
}
```

In its most simple form a VS Code workspace is just a collection of folders (called `WorkspaceFolder` in the API) and associated settings that should apply whenever the workspace is opened.

This guide will help you as extension author to make your extension ready for multi-root workspaces. It touches on three major pieces (basics, settings, language client/server) and is joined by samples from our [samples repository](https://github.com/Microsoft/vscode-extension-samples). 

## Do I need to do anything?

If your extension is making use of the (now deprecated) `workspace.rootPath` property to work on the currently opened folder, you should read on. 

In addition, if your extension is providing settings that can apply on a resource level instead of the window, you should also consider to adopt the new APIs. Resource settings are much more powerful because they can apply differently to each folder of a workspace.

## Basics

## Settings

## Language Server