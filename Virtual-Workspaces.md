# Extension Author Guide for Supporting Virtual Workspaces

We have recently released the __Remote Repository__ feature that lets you browse and edit files and folders directly on GitHub. 

While developing and testing the feature, we have observed that not all extensions work well with it. What's special about Remote Repositories is that they open VSCode on a folder or workspace that is located on a virtual file system. We call this a __virtual workspace__. 

When a virtual workspace is open in a VS Code window, this is shown by a label in the remote indicator in the lower left corner, similar to remote windows. In that window, we disable all extension that that signal that they don't support virtual workspaces.

We want to make sure as many extensions as possible work with virtual resources. We aim for a good user experience not just with the __Remote Repository__ feature, but also all other features leveraging virtual resources, from connecting to ftp-servers to working with cloud resources. Features that depend on resources being available on disk should not cause error dialogs.

This guide is for extension authors and documents how an extension can fully support a virtual workspace or, if it can not, how it can signal that it should be disabled when a virtual workspace is opened.

## Is my extension affected?

When a extension has no code but is a pure theme, keybinding, snippets, grammar extension, then it can run in a virtual workspace and no adoption is necessary.

Extension with code, that means extensions that define a 'main' entry point, require inspection and, possibly, adoption.

## Run your extension against a virtual workspace

Run the **Open Remote Repository...** command from the Command Palette. **Notice** this command is currently only available in the [VS Code Insiders](https://code.visualstudio.com/insiders/) version. The command shows a quick pick dialog and you can paste in any GitHub URL, or choose to search for a specific repository or pull request.

This opens a VSCode window for a virtual workspace where all resources are virtual. 

## Verify that the code is ready for virtual resources

The API support for virtual file system has been around for quite a while already. You can check out the [file system provider API](https://github.com/microsoft/vscode/blob/dc8bd9cd7e5231745549ac6218266c63271f48cd/src/vs/vscode.d.ts#L7038), if you are interested. A file system provider is registered for a new URI scheme (e.g. `vscode-vfs`) and resources on that file system will be represented by URIs using that schema (`vscode-vfs://github/microsoft/vscode`)

Check how your extension deals with URIs it gets from the VSCode APIs:

- Never assume that the URI scheme is 'file'. `URI.fsPath` can only be used when the URI scheme is file.
- Look out for usages of the `fs` node module for file system operations. If possible, use the `vscode.workspace.fs` API, which delegates to the responsible file system provider.
- Check for third party components that depend on a `fs` access (e.g. a language server or a node module)
- If you run executables and tasks from commands, check whether these commands make sense in a virtual workspace window or whether they should be disabled.

## Adopt your extension to work with virtual workspaces

We have introduced a new `capabilities` property in`package.json`.

The `virtualWorkspaces` capability property signals whether the extension works with virtual workspace, or not. The example below declares that an extension does not support virtual workspaces and should not be activated by VS Code in this setup.
```json
{
  "capabilities": {
    "virtualWorkspaces": false
  }
}
```

When an extension can partially work with virtual workspaces, then it should define `"virtualWorkspaces": true` but it should disable the features that are not supported in a virtual workspace. 

## Disable functionality when a virtual workspace is opened

### Disable command and view contributions

The availability of commands and views and many other contributions can be controlled through context keys in [`when` clauses](https://code.visualstudio.com/api/references/when-clause-contexts).

The `virtualWorkspace` context key is set when all workspace folders are located on virtual file systems. The example below shows the command `npm.publish` in the command palette only when not in a virtual workspace:
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

The 'resourceScheme` context key is set to the URI scheme of the currently selected element in the explorer or the element open in the editor. 
In this example the `npm.runSelectedScript` command is only in the editor context menu if the underlying resource is on the local disk.
```
{
    "menus": {
      "editor/context": [
        {
          "command": "npm.runSelectedScript",
          "when": "resourceFilename == 'package.json' && resourceScheme == file"
        }
      ]
    }
}
```

### Detect virtual workspaces in code

To check in code whether the current workspace consists of non-`file` schemes and is virtual you can use

```
const isVirtualWorkspace = workspace.workspaceFolders && workspace.workspaceFolders.every(f => f.uri.scheme !== 'file');
```

### Language selectors 

When registering a provider for a language feature (e.g. completions, hovers, code actions..) make sure to specify the schemes the provider supports:

```
return vscode.languages.registerCompletionItemProvider({ language: 'typescript', scheme: 'file' }, {
	provideCompletionItems(document, position, token) {
		// ...
	}
});
```


