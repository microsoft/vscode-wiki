With the "1.0" release behind us, now is a good time to look towards the future. We typically look out 6 to 12 months, establish a set of themes we want to work towards, and then schedule work each milestone supporting those themes. VS Code will continue to ship monthly and we'll make progress against each of the following themes during each iteration.

## Improve the Getting Started Experience

It should be quick and natural to customize VS Code to the way you work so that you can quickly get started working on your code.

* Configure key bindings, themes, common settings on first run of VS Code
* Ability to create new and populated Workspaces from within VS Code
* "Open in VS Code" from a git repository
* Installation improvements such as auto move to Applications on OSX, Linux auto-update, and in product release notes

## Eliminate Adoption Blockers

VS Code is a young product and there still missing features and experiences that you are asking for and that we want to deliver.

* [Tabs](https://github.com/Microsoft/vscode/issues/224)
* [Integrated Terminal](https://github.com/Microsoft/vscode/issues/143)
* [Move error list from Quick Box to a panel](https://github.com/Microsoft/vscode/issues/6679)
* [Indent guides](https://github.com/Microsoft/vscode/issues/2192)
* Editor layout (e.g. horizontal split)
* [VIM style key binding support](https://github.com/Microsoft/vscode/issues/3600)
* Search performance improvements
* Global Replace
* Fast switching between workspaces 
* Multiple folders inside a single workspace
* [Accessiblity](https://github.com/Microsoft/vscode/issues/6583) 

## Improved Extension creation, discovery and management

We want to make it easy for developers to create extensions and for users to discover extensions. And, once you have discovered a set of extensions, we want to make it easy for you to manage them.

* [In product extension management experience](https://github.com/Microsoft/vscode/issues/637)
* Improved extension recommendation experience
* Support for "extension packs”, collections of extensions and settings
* Improved documentation to feature extensions and extension packs appropriately
* Continue to improve the [Marketplace](https://marketplace.visualstudio.com/vscode) experience for discovering and installing extensions

For extension developers:

* SDK: Improve extension README authoring and quality
* Expand the core VS Code extensibility APIs, for example source code control
* Expand the diagnostics experience and API to support additional debugging scenario requirements, such as a [attach to process](https://github.com/Microsoft/vscode/issues/6569)

We will also make it easy to [consume and ship the core code editor ("Monaco")](https://github.com/Microsoft/vscode/issues/446) as a library.

## TypeScript, JavaScript, and Node development

We will continue to improve our code editing and navigation experiences by partnering with the TypeScript team on the Salsa language service. We will also continue to enhance our end-to-end debugging experiences for Node applications.

* Work with the TypeScript team on the JavaScript language service which powers our JavaScript and TypeScript editing experiences to:

  * Automatic acquisition of .d.ts files to enable IntelliSense "out of the box"
  * Angular IntelliSense
  * Diagnostics on project configuration files (`jsconfig.json`, `tsconfig.json`)
  * Show errors for the entire project and not only the file that is currently edited.

* Node Debugger: Step over uninteresting (generated) code
* Improved npm support and help to keep the `package.json` consistent with the installed node modules

## Summary

These are examples of just some of the work we will be focusing on in the next 6 to 12 months. We will provide much more detail in each of our [monthly iteration plans](https://github.com/Microsoft/vscode/wiki/Iteration-Plans) so follow along and let us know what you think!
