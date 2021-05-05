# [WIP] Extension Author Guide for Supporting Virtual Workspaces

We have recently released the __Remote Repository__ feature that lets you browse and edit files and folders directly on GitHub. While developing and testing the feature, we have observed that not all extensions work well with it. 

What's special about the new feature is that it opens VSCode on a folder or workspace that is located on a virtual file system. We call this a __virtual workspace__. 
We indicate that VSCode is opened on a virtual workspace by showing a label in the remote indicator in the lower left corner, similar to remote windows.

We want to make sure as many extensions as possible work with virtual resources. We want a great user experience not just with the the __Remote Repository__ feature, but also all other features leveraging virtual resources, from connecting to ftp-servers to working with cloud resources. Extensions that depend on resources being available on disk should not cause error dialogs.

This guide is for extension authors and documents how an extension can support a virtual workspace or, if it can't, how it can signal that it should be disabled when a virtual workspace is opened.

## Is my extension affected?

When a extension has no code but is a pure theme, keybinding, snippets, grammar extension, then it can run in a virtual workspace and no adoption is necessary.

Extension with code, that means extensions that define a 'main' entry point, require inspection and, possibly, adoption.

## Run your extension against a virtual workspace

Run the **Open Remote Repository...** command from the Command Palette. From there, you can paste in any GitHub URL, or choose to search for a specific repository or pull request.

This opens a VSCode window where all resources are all based on virtual resources. 

## Verify that the code is ready for virtual resources

The API support for virtual file system has been around for quite a while already. You can check out the [file system provider API](https://github.com/microsoft/vscode/blob/dc8bd9cd7e5231745549ac6218266c63271f48cd/src/vs/vscode.d.ts#L7038) if you are interested. A file system provider is registered a new URI scheme and URIs with that scheme can then be used for example to represent resources.

Resource URIs are used all over the place in the VS Code API

- An extension should never assume that the URI scheme is 'file'. `URI.fsPath` should only be used when the URI scheme is file.
- Look out for usages of the `fs` node module for file system operation. If possible, use the `vscode.workspace.fs` API, which will make use of the custom file system provider.
- Check for third party components that depend on a fs access (e.g. a language server or a node module)
- If you run executable and tasks, question if it make sense to have these in a virtual workspace window.

## Adopt your extension for virtualWorkspaces

To know which extensions have already be tested and adopted, we have added a new property to `package.json`:

The `virtualWorkspaces` capability property in `package.json` signals whether the extension works with virtual workspace, or not
```json
{
  "capabilities": {
    "virtualWorkspaces": false
  }
}
```
When an extension can not work with virtual workspaces, it will be disabled by VS Code when a virtual workspace is opened.

When an extension can partially work with virtual workspaces, the it should define `"virtualWorkspaces": true` but disable some functionality when a virtual workspace is opened. 

## Disable functionality when a virtual workspace is opened

One way to disable functionality when a virtual workspace is opened is to use the `virtualWorkspace` context key in `when` clauses of contributions for menus and views.

The `virtualWorkspace` context key is set when all workspace folders are located on virtual file systems ( == resource scheme is not `file`).
```
{
    "menus": {
      "commandPalette": [
        {
          "command": "npm.publish",
          "when": "!virtualWorkspace"
        }
    }
}
```

A second way is to check in code whether the current workspace consists of non-`file` schemes:

```
const isVirtualWorkspace = workspace.workspaceFolders && workspace.workspaceFolders.every(f => f.uri.scheme !== 'file');
```
