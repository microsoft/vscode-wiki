>**Note:** Multi-root functionality is currently only available in the Insiders build until we are confident enough that we can make it available in Stable. To try it out, grab our Insiders build from [https://code.visualstudio.com/insiders](https://code.visualstudio.com/insiders).

## Synopsis

This wiki page explains the impact of the new multi-root-workspace feature on extensions. You will learn the concepts, new APIs and understand if and how to make your extension ready for multi-root-workspace support.

A multi-root workspace is a new way how to work with VS Code. At its core it allows to open multiple folders in the same instance from any location that is accessible on disk. All parts of the VS Code user interface adapt to the number of folders opened, e.g. the file explorer will show all folders in a single tree and the full text search will search across all folders. It is in the best interest for the users that extensions also adapt to supporting multiple folders.

![explorer](https://user-images.githubusercontent.com/900690/30064942-9dc2e608-9253-11e7-9f01-5b18f3e90065.png)

There are numerous ways how to create a multi-root workspace. The simplest one is to just open multiple folders from the command line: 

```
code-insiders <folder1> <folder2>...
```

All workspace metadata is stored in a simple JSON file that can be saved and shared (`File | Save Workspace As...`) with others:

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

In its most simple form a VS Code workspace is just a collection of folders (called `WorkspaceFolder` in the API) and associated settings that should apply whenever the workspace is opened. Each `WorkspaceFolder` can have additional metadata associated (for example a `name`).

This guide will help you as extension author to make your extension ready for multi-root workspaces. It touches on three major pieces (basics, settings, language client/server) and is joined by samples from our [samples repository](https://github.com/Microsoft/vscode-extension-samples). 

## Do I need to do anything?

If your extension is making use of the (now deprecated) `workspace.rootPath` property to work on the currently opened folder, you should read on. 

In addition, if your extension is providing settings that can apply on a resource (= file location) level instead of being global, you should also consider to adopt the new APIs. Resource settings are much more powerful because a user can choose to configure settings differently per workspace folder.

## Basics

The basic APIs to work with multi root workspaces are:

Method|Description
---|-------
`workspace.workspaceFolders`| access to all `WorkspaceFolder` (can be `undefined` when no workspace is opened!)
`workspace.onDidChangeWorkspaceFolders`| be notified when `WorkspaceFolder` are added or removed
`workspace.getWorkspaceFolder(uri)`|get the `WorkspaceFolder` for a given resource (can be `undefined` when resource is not part of any workspace folder!)

Your extension should be capable of working with any number of `WorkspaceFolder`, including 0, 1 or many folders. The `WorkspaceFoldersChangeEvent` carries information about the added or removed `WorkspaceFolder`.

**Note:** today we require at least one `WorkspaceFolder` within the workspace, so as a user you cannot open a workspace without folders. However, we will likely lift this limitation soon. 

Each `WorkspaceFolder` provides access to some metadata:

Property|Description
---|-------
`uri`| the resource of the folder (use `uri.fsPath` for the file path)
`index`| the 0-based index of the folder as configured by the user
`name`| the name of the folder (defaults to the folder name)

**Note:** a user is free to configure folders for a workspace that are overlapping. E.g. a workspace can consist of a parent folder as well as any of its children. It is up to the extension to be clever here and avoid duplicate work. For example, a task that scans all files of a folder should not duplicate the work by scanning again for a child folder if any. 

The [`basic-multi-root-sample`](https://github.com/Microsoft/vscode-extension-samples/tree/master/basic-multi-root-sample) extension is demonstrating the use of this API by showing the workspace folder of the currently active file opened in the editor.

![Show the folder of the active file](https://raw.githubusercontent.com/Microsoft/vscode-extension-samples/master/basic-multi-root-sample/preview.gif)

## Settings

## Language Server