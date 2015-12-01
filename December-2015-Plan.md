**WORK IN PROGRESS**

## Dates
- `insider` channel update Dec 14th
- `stable` channel update Dec 18th

Most of the VS Code team is on vacation from Dec 20th until January 4th.

## Themes
- Establish OSS workflows
- Listen to feedback, address critical issues, unblock users
- Support extension authors
- Support to consume the VS Code editor as a separate component

## Items
- [Bugs](https://github.com/Microsoft/vscode/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3Abug+milestone%3A%22Dec+2015%22+-label%3Aupstream+)

**Development**
- [ ] Electron version 0.34.5 [#826](../issues/826)
- [ ] Run VSCode unit tests headless in a CI setup
- [ ] Proposal to separate vscode tools form the vscode API of the existing vscode module
- [ ] Automated Mac signing
- [ ] Increase test coverage
- [ ] Move old valuable bugs to github (Done: Ben, Joao, Andre, Isi)

**Extensions**
- [ ] Expose more Commands as API
- [ ] ?Support deactivate() call for an extension
- [ ] Example of using TS 1.7 and async and await inside an extension

**Gallery**
- [ ] Improve experience when user wants to read the README.md before installing an extension, provide option to install in an info box
- [ ] Support a command line switch to launch Code without any extensions #???

**Editor**
- [ ] Setup an editor-distro respository
- [ ] Define a website with usage documentation (align branding of the web site with code.visualstudio.com

- [ ] ?Provide better support for VIM integration (intercept all keyevents for VIM command mode implementation)
- [ ] ?Revive the language support features lost during the text mate transition (auto close, electric characters)

**Debug**

**Basic language support**
- [ ] ? Recover language support lost due to the textmate transition (electric characters, auto closing)

**Language service servers**
- [ ] Expose more language features in the language service protocol
- [ ] Document the language services protocol

**JS**
- [ ] Connect with TS team on Salsa (feature gaps?)
- [ ] Support to make ES6 the default without having to add a jsconfig.json (depends on Salsa) (#337)
- [ ] Enable ES6 coloring by using the TypeScript textmate grammar (align with Salsa)
- [ ] jsconfig.json sometime not taken into account #703
- [ ] Investigate into emmet support in JSX and TSX files

**C#**
- [ ] Adopt OmniSharp [#837](../issues/837)
- [ ] Move C# into a separate extension 

**TS**
- [ ] Adopt TypeScript 1.7 [#836](../issues/836)
- [ ] Explore an incremental build project extension (based on gulp-tsb)

**Git**
- [x] Support git integration when git folder is in a parent folder
- [ ] Create pull request (publish branch?)
- [ ] Add pull with rebase action

**UI**
- [ ] Explore: Intellisense improve support to show documentation for a  completion item
- [ ] Preserve zoom state 

**JSON**
- [ ] Support to contribute a JSON schema for a file pattern from an extension (Issue #)
