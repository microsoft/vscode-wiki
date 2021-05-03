# [WIP] Extension Author Guide for Supporting Virtual Workspaces

The VS Code extension API allows extension to define a virtual file system by providing a [file system provider](https://github.com/microsoft/vscode/blob/dc8bd9cd7e5231745549ac6218266c63271f48cd/src/vs/vscode.d.ts#L7038) for a URI scheme. By opening VSCode a such a folder, users can work with the virtual resource the same way as with local files and folder.

An example for this is the built-in __Remote Repository__ extension that lets you browse and edit files and folders directly on GitHub.

When VSCode is opened on a virtual folder, or multiple virtual folders, we call this a __virtual workspace__.

The virtual file system feature has existed since a while. However, we have observed that not all extensions can work with resources that are not file based.

This guide documents how an extension can support a virtual workspace or, if it can't, how it can signal that it should be deactivated when a virtual workspace is opened.

When a extension has no code but is a pure theme, keybinding, snippets, grammar extension, then it can run in a virtual workspace and no adoption is necessary.

Extension with code, that means extensions that define a 'main' entry point, require inspection and, possibly, adoption.

As a result, the extension should set the new `virtualWorkspaces` capability property in `package.json` to signal whether it works with virtual workspace, or not
```json
{
  "capabilities": {
    "virtualWorkspaces": false
  }
}
```
When an extension can not work with virtual workspaces, it will be disabled by VS Code when a virtual workspace is opened.

When an extension can  only partially work with virtual workspaces, the it should define `"virtualWorkspaces": true` but disable some functionality when a virtual workspace is opened. 

## Disable functionality when a virtual workspace is opened

One way to disable functionality when a virtual workspace is opened is to use the `virtualWorkspace` context key in `when` clauses of contributions for menus and views.

The `virtualWorkspace` context key is set when all workspace folders are located on virtual file systems ( == resource scheme is not `file`).
```
{
    "menus": {
      "commandPalette": [
        {
          "command": "npm.publish",
          "when": "virtualWorkspaces"
        }
    }
}
```

A second way is to check in code whether the current workspace consists of non-`file` schemes:

```
const isVirtualWorkspace = workspace.workspaceFolders && workspace.workspaceFolders.every(f => f.uri.scheme === 'file');
```

## Verify that the code is ready for virtual resources

The VS Code API represents resources such as files, folders with resource URIs. 

- An extension should never assume that the URI scheme is 'file'. `URI.fsPath` should only be used when the URI scheme is file.
- Instead of using the `fs` node module, use the `vscode.workspace.fs` API in VS Code
- Check for third party components that depend on a fs access (e.g. a language server or a node module)

## Test your extension against a virtual workspace





