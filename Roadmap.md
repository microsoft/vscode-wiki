# The VS Code Roadmap 2018

As [2017](https://github.com/Microsoft/vscode/wiki/Roadmap-2017) comes to an end, now is the time to look towards the future. We typically look out 6 to 12 months, establish a set of themes we want to work towards, and then schedule work each milestone supporting those themes. When planning, we look at potential work from three perspectives:

* **Happy Coding:** At its core VS Code is a lightweight, keyboard focused, multi-language code editor. VS Code is already pleasant to code with, and we want to make the experience even more pleasant, for both new and existing users.

* **Node, JavaScript, and TypeScript:** On top of the core editor, we want to enable great end-to-end experiences for individual languages and frameworks. We build the Node, JavaScript, and TypeScript end-to-end experiences on top of the core platform and want to provide a great experience out of the box.

* **A Rich Extension Ecosystem:** Because we cannot build support for every language, VS Code has a rich extensibility system which enables an ecosystem of great end-to-end experiences for the breadth of languages and frameworks such as C#, Go, Python, C++, Java, and more. In fact, we deliver the Node, TypeScript, and JavaScript support using the exact same public APIs ensuring that developers have consistent experiences across the breadth of languages they use. 

VS Code will continue to ship monthly, and we'll make progress against each of the following themes during each iteration. We describe some initiatives as "investigations" which simply means our goal in the next few months is to better understand the problem and potential solutions before scheduling real feature work. Once an investigation is done, we will update our plan, either deferring the initiative or committing to it.


Legend of annotations:

| Mark | Description |
| ------------- | ------------- |
| bullet | work not started |
| check mark | work completed |
| :runner: | on-going work |
| :muscle: | stretch goal |


## Happy Coding with VS Code

Over the past 6 months, we’ve worked hard to eliminate blockers that make it hard for people to adopt VS Code. For example, we make multi-root workspaces available in the October 2017 Stable builds. We continue to work with the extension authors to also enable their extension to support multi-root workspaces. 

However, we’re not done. You have asked for more flexibility in how you position editors and panes, for multi-selection in the explorer, and more. You will see a significant focus on the fundamentals in the next few months as well, focused on performance, localized language support, and accessibility so that every developer can be productive with VS Code.


### Fundamentals

A key attribute of an 'editor' is performance and stability, if we add features at the expense of these fundamentals we risk losing a large part of what keeps us competitive in the 'editor' category.

* Improve startup performance: keep start-up times within a predictable and suitable range for users across all platforms
* Reduce resource/memory consumption: what can we do to reduce and control resource consumption of helper processes
* Continue to improve accessibility, e.g. of the terminal, of the menu bar on Windows
* Support language packs for community-contributed translation 
* Improve the Windows update experience
* Improve serviceability by providing additional diagnostics 

### Workbench

* :runner: Finish Multi-root folder Workspaces support and support extension authors in adopting it
* [x] Show SCM status in the explorer (including `.gitignored` files)
* :runner: Support vertical panel layout
* Support multi-selection in the  explorer for common actions e.g. delete
* Improve intra-file navigation (outline, bread crumb)
* Improve notification UI
* :runner: Investigate improved settings discovery and editing
* Allow users to manage contributions to the status bar: show, hide, reorder, overflow design
 
### Editor

* [x] Improve the performance and scalability of editor decorations
* :runner: Investigate into a native model layer
* Investigate into improved column selection  
* :muscle: Investigate into semantic coloring support
* :muscle: Render more than text in the minimap

### Terminal

* Support splitting and viewing of multiple terminals

### Source Control Integration

* [x] Support to view changes directly inside the editor using a peek/inline experience
* Investigate integrated history view

## Node, JavaScript, and TypeScript Development

We want VS Code to be a great tool for developing modern web applications with JavaScript and TypeScript and we will continue to collaborate deeply with the TypeScript team to deliver the richest code editing, navigation, and understanding experiences for both TypeScript and JavaScript. We will continue to make it easy to configure debugging of your Node based applications and include support for both client and server side debugging in the box. 

### Language Server Protocol

* Continue to refine and improve to Language Server Protocol with support from the community.
* [x] Enable [proposed protocol additions](https://github.com/Microsoft/language-server-protocol/blob/master/contributing.md) from the community. 

### Debug Adaptor Protocol

* Continue to refine and improve to Debug Adapter Protocol with support from the community.
* Expose more UI for DAP features that are currently not surfaced in the VS Code debugging UI. This includes moving the loaded scripts UI into the core. 


### JavaScript

* Using TypeScript to type check JavaScript is powerful (`//@ ts-check`), we want to improve its discoverability. 
* Improve go-to-definition/implementation of a JavaScript symbol when a type cannot be precisely resolved 
 
### TypeScript (and JavaScript)

We closely collaborate with TypeScript, see also the [TypeScript roadmap](https://github.com/Microsoft/TypeScript/wiki/Roadmap) 

* Organize imports, remove unused imports
* Tag completion in `jsx` and `tsx` files 
* Investigate into improving TypeScript Source Maps so that they are more precise and includes variable mappings.
 
#### Webpack

* Linting/validation of configuration
* Make it easier to configure `jsconfig.json`/`tsconfig.json` for webpack

### Debug

* Improve hovering and inline values by leveraging language knowledge
* Support hot code replace for non-JS scenarios e.g. Java.
* Continue to invest in documenting debugging recipes for common configurations
 
## Extension creation, discovery, and management

Of course, VS Code is not just a Node, JavaScript, and TypeScript tool. Our rich extensibility model and extension ecosystem means that you can install support for just about every language and framework, from C++ to C# to Go, Python, and more. 

Looking ahead, we want to make acquiring extensions for these languages (and more!) as easy as possible. We want to enable extension authors to be able to be more productive and deliver richer experiences to developers. At the same time, we want to give users more control over how those extensions contribute to their environment.

### For extension users

* :runner: Improve extension recommendation system
* Improve extension searching 
* Simplify tracking down issues caused by installed extensions and make it easier to file issues
* Show the user more information about the usage of a extension (startup time, error rate, etc.).

### For extension author

* Improve the language API to support a hierarchical navigation to the symbols in a document 
* Make extension contributions attributable to an extension (e.g. error messages, commands)
* :runner: Support migrating the publisher of an extension to another publisher
* Investigate contributing explorer viewlets as a first class element in the activity bar
* Investigate Quick pick improvements (e.g. multi-step, forms, commands, grouping)
* :runner: Continue to invest into API that enables remote development 
* :runner: Add API for contributing decorations on resources shown in the explorer (like the Source Control decorations)


## Documentation

- Make it easier for extension authors to find their way around. Improve our API documentation, and integrate samples and documentation more closely. 
- Refresh all of our dated overview videos. 
- We will constantly review poorly performing pages and improve them.
 
## Summary

These are examples of just some of the work we will be focusing on in the next 6 to 12 months. We continuously tune the plan based on feedback and we will provide more detail in each of our [monthly iteration plans](https://github.com/Microsoft/vscode/wiki/Iteration-Plans). Please follow along and let us know what you think!