# Extension Author Guide for Supporting Virtual Workspaces

We have recently announced the [Remote Repository feature](https://code.visualstudio.com/updates/v1_56#_remote-repositories-remotehub) in the [VS Code Insiders Build](https://code.visualstudio.com/insiders). It lets you browse and edit files and folders directly on GitHub.

**Open Remote Repository...** opens VSCode on a folder or workspace located on a virtual file system. We call this a __virtual workspace__.  When a virtual workspace is open in a VS Code window, this is shown by a label in the remote indicator in the lower left corner, similar to remote windows. 

While developing and testing the feature, we have observed that not all extensions work equally well with virtual resources. Some extensions use tools that rely on resources being available on disk and can't be adopted. Other extensions haven't thought about virtual resources.

For a great user experience not just with the __Remote Repository__ feature, but also all other features leveraging virtual resources - from connecting to ftp-servers to working with cloud resources - we want to make sure as many extensions as possible work in that setup. Features that depend on resources being available on disk should not cause error dialogs but rather be disabled when a virtual workspace is opened.

## Is my extension affected?

When a extension has no code but is a pure theme, keybinding, snippets, grammar extension, then it can run in a virtual workspace and no adoption is necessary.

Extension with code, that means extensions that define a `main` entry point, require inspection and, possibly, adoption.

## Run your extension against a virtual workspace

Run the **Open Remote Repository...** command from the Command Palette. **Notice** this command is currently only available in the [VS Code Insiders](https://code.visualstudio.com/insiders/) version. The command shows a quick pick dialog and you can paste in any GitHub URL, or choose to search for a specific repository or pull request.

This opens a VSCode window for a virtual workspace where all resources are virtual. 

## Review that the code is ready for virtual resources

The API support for virtual file system has already been around for quite a while. You can check out the [file system provider API](https://github.com/microsoft/vscode/blob/dc8bd9cd7e5231745549ac6218266c63271f48cd/src/vs/vscode.d.ts#L7038), if you are interested. A file system provider is registered for a new URI scheme (e.g. `vscode-vfs`) and resources on that file system will be represented by URIs using that schema (e.g. `vscode-vfs://github/microsoft/vscode/pacakge.json`)

Check how your extension deals with URIs it gets from the VSCode APIs:

- Never assume that the URI scheme is 'file'. `URI.fsPath` can only be used when the URI scheme is file.
- Look out for usages of the `fs` node module for file system operations. If possible, use the `vscode.workspace.fs` API, which delegates to the responsible file system provider.
- Check for third party components that depend on a `fs` access (e.g. a language server or a node module)
- If you run executables and tasks from commands, check whether these commands make sense in a virtual workspace window or whether they should be disabled.

## Signal whether your extension can handle virtual workspaces

There's a new `capabilities` property in `package.json`, and `virtualWorkspaces` is used  to signal whether an extension works with virtual workspace, or not.

The example below declares that an extension does not support virtual workspaces and should not be activated by VS Code in this setup.
```json
{
  "capabilities": {
    "virtualWorkspaces": false
  }
}
```

When an extension works with virtual workspaces, then it should define `"virtualWorkspaces": true`. If it partially works, it should do the same, but it should disable the features that are not supported in a virtual workspace. 

Until extensions have adopted the new capability, we came up with an internal list of extensions that we think should be disabled in virtual workspaces. 
The list can be found [here](https://github.com/microsoft/vscode/issues/122836). 

Of course, extension authors are in a better position to make this decision. Once a extension has adopted the capability, we will remove the extension from the list.

## Disable functionality when a virtual workspace is opened

### Disable command and view contributions

The availability of commands and views and many other contributions can be controlled through context keys in [`when` clauses](https://code.visualstudio.com/api/references/when-clause-contexts).

The `virtualWorkspace` context key is set when all workspace folders are located on virtual file systems. The example below shows the command `npm.publish` in the command palette only when not in a virtual workspace:
```json
{
    "menus": {
      "commandPalette": [
        {
          "command": "npm.publish",
          "when": "!virtualWorkspace"
        }
      ]
    }
}
```

The `resourceScheme` context key is set to the URI scheme of the currently selected element in the explorer or the element open in the editor. 
In this example the `npm.runSelectedScript` command is only in the editor context menu if the underlying resource is on the local disk.
```json
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

```ts
const isVirtualWorkspace = workspace.workspaceFolders && workspace.workspaceFolders.every(f => f.uri.scheme !== 'file');
```

### Language selectors 

When registering a provider for a language feature (e.g. completions, hovers, code actions..) make sure to specify the schemes the provider supports:

```ts
return vscode.languages.registerCompletionItemProvider({ language: 'typescript', scheme: 'file' }, {
	provideCompletionItems(document, position, token) {
		// ...
	}
});
```

## What are the expectations for language support with virtual workspaces?

It's completely fine to only provide limited functionality or disable the extension.

The main goal is to that we don't get any error dialogs when virtual resources are opened.
The language extensions that ship with VSCode (TypeScript, JSON, CSS, HTML, Markdown) just look at the open text document ('single file only').

## What about support in the language server protocol (LSP) for accessing virtual resources

Work is under way that will add FS support to LSP. Tracked in https://github.com/microsoft/language-server-protocol/issues/1264

## More information and feedback

Please comment in the [Virtual Workspaces Tracking Issue](https://github.com/microsoft/vscode/issues/123115) if you have questions and suggestions.