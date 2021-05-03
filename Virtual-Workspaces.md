# [WIP] Extension Author Guide for Supporting Virtual Workspaces

- not affected when an extension has no code, e.g., theme, keybinding, snippets. These extensions work in a virtual workspace setup.

- describe how to test the extension in a virtual workspace setup, e.g., install the memfs extension (it currently sets up a hybrid workspace)

- fs access
  - if your extension is currently using the `fs` module from Node.js, consider migrating to the `vscode.workspace.fs` API
  - check the URI scheme for `file`
  - register language providers for the correct schemes

- third party components that depend on a fs access (e.g. a language server or a node module)
  - set the virtual workspace capability to false

- non applicable commands
  - use the `virtualWorkspace` when context key to disable commands that are not applicable

