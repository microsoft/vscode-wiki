## Dates
- Insider channel update weekly (7th, 14th) (to be discussed)
- Stable channel update on Dec 18th (to be discussed)

Most of the VS Code team is on vacation from Dec 20th until January 4th.

## Themes
- Establish OSS workflows
- Listen to feedback, address critical issues, unblock users
- Support extension authors
- Support to consume the VS Code editor as a separate component

## Items
- [Bugs](https://github.com/Microsoft/vscode/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3Abug+milestone%3A%22Dec+2015%22+-label%3Aupstream+)

**Development**
- [ ] Electron [#826](../issues/826)
- [ ] Run VSCode unit tests in a CI setup
- [ ] Separate vscode tools form the vscode API of the existing vscode module
- [ ] Move old valuable bugs to github

**Extensions**
- [ ] Support deactivate() call for an extension
- [ ] Example of using TS 1.7 and async and await inside an extension

**Code Owned Extensions**
- [ ] Consistent options for the linters we provide

**Gallery**
- [ ] Improve experience when user wants to read the README.md before installing an extension
- [ ] Improve performance by a local cache
- [ ] Separate installing themes from other extensions
- [ ] Support a command line switch to launch Code without any extensions #???
- [ ] Support to disable an extension

**Editor**
- [ ] Setup an editor-distro respository
- [ ] Define a website with usage documentation (align branding of the web site with code.visualstudio.com
- [ ] Provide better support for VIM integration (intercept all keyevents for VIM command mode implementation)

**Debug**

**Basic language support**
- [ ] Recover language support lost due to the textmate transition (electric characters, auto closing)

**Language service servers**
- [ ] Document the language services protocol

**JS**
- [ ] Support to make ES6 the default without having to add a jsconfig.json (#337)
- [ ] jsconfig.json sometime not taken into account #703
- [ ] Enable ES6 coloring by using the TypeScript textmate grammar
- [ ] Investigate into emmet support in JSX and TSX files
- [ ] Connect with TS team on Salsa

**C#**
- [ ] OmniSharp [#837](../issues/837)
- [ ] Move C# into a separate extension

**TS**
- [ ] Adopt TypeScript 1.7 [#836](../issues/836)
- [ ] Explore an incremental build project extension (based on tsb)

**Git**
- [ ] Support git integration when git folder is in a parent folder
- [ ] Commands to rebase
- [ ] Create pull request (create remote branch?)

**UI**
- [ ] Intellisense, improve support to show documentation for a  completion item
- [ ] Preserve zoom state

**JSON**
- [ ] Support to contribute a JSON schema for a file pattern from an extension (Issue #)
