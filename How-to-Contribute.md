# Contributing to Visual Studio Code
There are many ways to contribute to the Visual Studio Code project: logging bugs, submitting pull requests, reporting issues, and creating suggestions.

After cloning and building the repo, check out the [issues list](https://github.com/Microsoft/vscode/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue). Issues labeled [`help wanted`](https://github.com/Microsoft/vscode/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) are good issues to submit a PR for. Issues labeled [`good first issue`](https://github.com/Microsoft/vscode/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) are great candidates to pick up if you are in the code for the first time. If you are contributing significant changes, please discuss with the assignee of the issue first before starting to work on the issue.

## Prerequisites

In order to download necessary tools, clone the repository, and install dependencies via `yarn` you need network access. 

You'll need the following tools:

- [Git](https://git-scm.com)
- [Node.JS](https://nodejs.org/en/), **x64**, version `>= 10.x`, `<= 12.x`
- [Yarn](https://yarnpkg.com/en/), follow the [installation guide](https://yarnpkg.com/en/docs/install)
- [Python](https://www.python.org/downloads/release/python-2715/), at least version 2.7 (version 3 is __*not*__ supported)
  - **Note:** Python 2.7 will be automatically installed for Windows users through installing `windows-build-tools` npm module (see below)
- A C/C++ compiler tool chain for your platform:
  - **Windows**
    - Set a `PYTHON` environment variable pointing to your `python.exe`. E.g.: `C:\Python27\python.exe`
	- Install a compiler for the native modules VSCode is depending on
		- Option 1 (recommended): Use Windows Build Tools npm module
			- Start Powershell as Administrator and install [Windows Build Tools npm module](https://github.com/felixrieseberg/windows-build-tools) ([documentation](https://github.com/felixrieseberg/windows-build-tools#visual-studio-2017-vs-visual-studio-2015)).
				```
				npm install --global windows-build-tools --vs2015
				```
				**Note:** The `--debug` flag is helpful if you encounter any problems during installation.

				**Note:** if you encounter an error *The build tools for v141 (Platform Toolset = 'v141') cannot be found."* you might have a version of Visual Studio installed. Either uninstall that version or make sure to have *VC++ 2015.3 v14.00 (v140) toolset for desktop* installed (see below)
		- Option 2: Use Visual Studio 2017
			- Install [Visual Studio 2017 Community Edition](https://visualstudio.microsoft.com/downloads/)
			- Select *Desktop Development with C++*
			- Select *VC++ 2015.3 v14.00 (v140) toolset for desktop* on the right hand side

				**Note:** if you encounter an error *The build tools for v141 (Platform Toolset = 'v141') cannot be found."* make sure you installed the *VC++ 2015.3 v14.00 (v140) toolset for desktop* from the previous step
	- **Restart** your computer
    - **Warning:** Make sure your profile path only contains ASCII letters, e.g. *John*, otherwise it can lead to [node-gyp usage problems (nodejs/node-gyp/issues#297)](https://github.com/nodejs/node-gyp/issues/297)
    - **Note**: Building and debugging via the Windows subsystem for Linux (WSL) is currently not supported.

  - **macOS**
    - [Xcode](https://developer.apple.com/xcode/downloads/) and the Command Line Tools, which will install `gcc` and the related toolchain containing `make`
      - Run `xcode-select --install` to install the Command Line Tools
  - **Linux**
    * `make`
    * [pkg-config](https://www.freedesktop.org/wiki/Software/pkg-config/)
    * [GCC](https://gcc.gnu.org) or another compile toolchain
    * [native-keymap](https://www.npmjs.com/package/native-keymap) needs `libx11-dev` and `libxkbfile-dev`.
      * On Debian-based Linux: `sudo apt-get install libx11-dev libxkbfile-dev`
      * On Red Hat-based Linux: `sudo yum install libX11-devel.x86_64 libxkbfile-devel.x86_64 # or .i686`.
    * [keytar](https://www.npmjs.com/package/keytar) needs `libsecret-1-dev`.
      * On Debian-based Linux: `sudo apt-get install libsecret-1-dev`.
      * On Red Hat-based Linux: `sudo yum install libsecret-devel`.
    * Building deb and rpm packages requires `fakeroot` and `rpm`, run: `sudo apt-get install fakeroot rpm`

Install and build all of the dependencies using `Yarn`:

```
cd vscode
yarn
```

### Troubleshooting
In case of issues, try deleting the contents of `~/.node-gyp` first and then run `yarn cache clean` and then try again.

> If you are on Windows or Linux 64 bit systems and would like to compile to 32 bit, you'll need to set the `npm_config_arch` environment variable to `ia32` before running `yarn`. This will compile all native node modules for a 32 bit architecture. Similarly, when cross-compiling for ARM, set `npm_config_arch` to `arm`.

> **Note:** For more information on how to install NPM modules globally on UNIX systems without resorting to `sudo`, refer to [this guide](http://www.johnpapa.net/how-to-use-npm-global-without-sudo-on-osx/).

> If you have Visual Studio 2019 installed, you may face issues when using the default version of node-gyp. If you have Visual Studio 2019 installed, you may need to follow the solutions [here](https://github.com/nodejs/node-gyp/issues/1747)

## Build and Run

If you want to understand how VS Code works or want to debug an issue, you'll want to get the source, build it, and run the tool locally.

### Getting the sources

First, fork the VS Code repository so that you can make a pull request. Then, clone your fork locally:

```
git clone https://github.com/<<<your-github-account>>>/vscode.git
```

Occasionally you will want to merge changes in the upstream repository (the official code repo) with your fork.

```
cd vscode
git checkout master
git pull https://github.com/microsoft/vscode.git master
```

Manage any merge conflicts, commit them, and then push them to your fork.

### Build

Go into `vscode` and start the TypeScript incremental builder:

```
cd vscode
yarn watch
```

👉 **Note:** If you are running Windows and have installed Visual Studio 2017 as your build tool, you need to open **x64 Native Tools Command Prompt for VS 2017**. Do not confuse it with *VS2015 x64 Native Tools Command Prompt*, if installed.

The incremental builder will do an initial full build and will display a message that includes the phrase "Finished compilation" once the initial build is complete. The builder will then continue to run in the terminal. It will watch for file changes and compile those changes incrementally, giving you a fast, iterative coding experience.

👉 **Tip!** Linux users may hit a ENOSPC error when running `yarn run watch`, to get around this follow instructions in the [Common Questions](https://code.visualstudio.com/docs/setup/linux#_common-questions).

👉 **Tip!** Open VS Code on the folder where you have cloned the `vscode` repository and press <kbd>CMD+SHIFT+B</kbd> (<kbd>CTRL+SHIFT+B</kbd> on Windows, Linux) to start the builder. To view the build output open the Output stream by pressing <kbd>CMD+SHIFT+U</kbd>.

#### Errors and Warnings
Errors and warnings will show in the console while developing Code. If you use VS Code to develop Code, errors and warnings are shown in the status bar at the bottom left of the editor. You can view the error list using `View | Errors and Warnings` or pressing <kbd>CMD+P</kbd> and then <kbd>!</kbd>.

👉 **Tip!** You don't need to stop and restart the development version of Code after each change. You can just execute `Reload Window` from the command palette. We like to assign the keyboard shortcut <kbd>CMD+R</kbd> (<kbd>CTRL+R</kbd> on Windows, Linux) to this command.

### Run

To test the changes you launch a development version of VS Code on the workspace `vscode`, which you are currently editing.

**macOS and Linux**

```bash
./scripts/code.sh
```

**Windows**

```bat
.\scripts\code.bat
```

**Web (Chromium, Firefox or Safari only)**

```bash
yarn web
```
You can use `--port`, `--host` and `--scheme` to further instruct the simple server that runs for the web version about your environment (e.g. if you want to test the web version over a network).

You can identify the development version of VS Code ("Code - OSS") by the following icon in the Dock or Taskbar:

[![VS Code default icon](https://i.imgur.com/D2CeX0y.png)](https://i.imgur.com/D2CeX0y.png)

👉 **Tip!** If you receive an error stating that the app is not a valid Electron app, it probably means you didn't run `yarn watch` first.

### Debugging
VS Code has a multi-process architecture and your code is executed in different processes.

The **render** process runs the UI code inside the Shell window. To debug code running in the **render** you can either use VS Code or the Chrome Developer Tools.

#### Using VSCode
* Install the [Debugger for Chrome](https://marketplace.visualstudio.com/items/msjsdiag.debugger-for-chrome) extension. This extension will let you attach to and debug client side code running in Chrome.
* Open the `vscode` repository folder
* Choose the `Launch VS Code` launch configuration from the launch dropdown in the Debug viewlet and press <kbd>F5</kbd>.


#### Using the Chrome Developer Tools

* Run the `Developer: Toggle Developer Tools` command from the Command Palette in your development instance of Code to launch the Chrome tools.
* It's also possible to debug the released versions of Code, since the sources link to sourcemaps hosted online.

[![sourcemaps](http://i.imgur.com/KU3TdjO.png)](http://i.imgur.com/KU3TdjO.png)

The **extension host** process runs code implemented by a plugin. To debug extensions (including those packaged with Code) which run in the extension host process, you can use VS Code itself. Switch to the Debug viewlet, choose the `Attach to Extension Host` configuration, and press <kbd>F5</kbd>.

The **search** process can be debugged, but must first be started. Before attempting to attach, start a search by pressing <kbd>CMD+P</kbd> (<kbd>CTRL+P</kbd> on Windows), otherwise attaching will fail and time out.

### Automated Testing
Run the unit tests directly from a terminal by running `./scripts/test.sh` from the `vscode` folder (`scripts\test` on Windows). The [test README](https://github.com/Microsoft/vscode/blob/master/test/README.md) has complete details on how to run and debug tests, as well as how to produce coverage reports.

We also have automated UI tests. The [smoke test README](https://github.com/Microsoft/vscode/blob/master/test/smoke/README.md) has all the details.

### Unit Testing
Run the tests directly from a terminal by running `./scripts/test.sh` from the `vscode` folder (`scripts\test` on Windows). The [test README](https://github.com/Microsoft/vscode/blob/master/test/README.md) has complete details on how to run and debug tests, as well as how to produce coverage reports.

### Linting
We use [tslint](https://github.com/palantir/tslint) for linting our sources. You can run tslint across the sources by calling `gulp tslint` from a terminal or command prompt. You can also run `gulp tslint` as a Code task by pressing <kbd>CMD+P</kbd> (<kbd>CTRL+P</kbd> on Windows) and entering `task tslint`. Warnings from tslint show up in the `Errors and Warnings` quick box and you can navigate to them from inside Code.

To lint the source as you make changes you can install the [tslint extension](https://marketplace.visualstudio.com/items/ms-vscode.vscode-typescript-tslint-plugin).

### Extensions
The Visual Studio Marketplace is not available from the `vscode` open source builds. If you need to use or debug an extension you can check to see if the extension author publishes builds in their repository (check the `Builds` page) or if it is open source you can clone and build the extension locally. Once you have the .VSIX, you can "side load" the extension either through the command line or using __Install from VSIX__ command in the Extensions View command drop-down ([see more](https://code.visualstudio.com/docs/editor/extension-gallery#_command-line-extension-management) on command line extension management).

## Work Branches
Even if you have push rights on the Microsoft/vscode repository, you should create a personal fork and create feature branches there when you need them. This keeps the main repository clean and your personal workflow cruft out of sight.

## Pull Requests
Before we can accept a pull request from you, you'll need to sign a [[Contributor License Agreement (CLA)|Contributor-License-Agreement]]. It is an automated process and you only need to do it once.

To enable us to quickly review and accept your pull requests, always create one pull request per issue and [link the issue in the pull request](https://github.com/blog/957-introducing-issue-mentions). Never merge multiple requests in one unless they have the same root cause. Be sure to follow our [[Coding Guidelines|Coding-Guidelines]] and keep code changes as small as possible. Avoid pure formatting changes to code that has not been modified otherwise. Pull requests should contain tests whenever possible.

### Introducing usage of new Electron API with a PR
A pull request that depends on Electron API that VSCode is currently not using comes with a certain risk and maybe rejected. Whenever we update Electron, there is a chance that less popular Electron APIs break and it is very hard to find out upfront. Once a PR lands in VSCode, the role of maintaining the feature moves to the team and as such we have to follow up with upstream components to ensure the feature is still supported. As such, as a rule of thumb:
* avoid Electron APIs and use web standards instead (this also ensures that your feature is supported in our web client)
* if you must use Electron APIs, we require a unit test at https://github.com/atom/electron so that we protect against future breakage.

### Where to Contribute
Check out the [full issues list](https://github.com/Microsoft/vscode/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue) for a list of all potential areas for contributions. Note that just because an issue exists in the repository does not mean we will accept a contribution to the core editor for it. There are several reasons we may not accept a pull request like:

* Performance - One of Visual Studio Code's core values is to deliver a *lightweight* code editor, that means it should perform well in both real and perceived performance.
* User experience - Since we want to deliver a *lightweight* code editor, the UX should feel lightweight as well and not be cluttered. Most changes to the UI should go through the issue owner and/or the UX team.
* Architectural - The team and/or feature owner needs to agree with any architectural impact a change may make. Things like new extension APIs *must* be discussed with and agreed upon by the feature owner.

To improve the chances to get a pull request merged you should select an issue that is labelled with the [`help-wanted`](https://github.com/Microsoft/vscode/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) or [`bug`](https://github.com/Microsoft/vscode/issues?q=is%3Aopen+is%3Aissue+label%3A%22bug%22) labels. If the issue you want to work on is not labelled with `help-wanted` or `bug`, you can start a conversation with the issue owner asking whether an external contribution will be considered.

To avoid multiple pull requests resolving the same issue, let others know you are working on it by saying so in a comment.

### Spell check errors

Pull requests that fix spell check errors in **translatable strings** (strings in `nls.localize(...)` calls) are welcomed but please make sure it doesn't touch multiple [feature areas](https://github.com/microsoft/vscode/wiki/Feature-Areas), otherwise it will be difficult to review. Pull requests only fixing spell check errors in source code are **not** recommended.

## Packaging

Code can be packaged for the following platforms: `win32-ia32 | win32-x64 | darwin | linux-ia32 | linux-x64 | linux-arm`

These `gulp` tasks are available:

* `vscode-[platform]`: Builds a packaged version for `[platform]`.
* `vscode-[platform]-min`: Builds a packaged and minified version for `[platform]`.

See also: [Cross-Compiling for Debian-based Linux](https://github.com/Microsoft/vscode/wiki/Cross-Compiling-for-Debian-Based-Linux)

## Suggestions
We're also interested in your feedback for the future of Code. You can submit a suggestion or feature request through the issue tracker. To make this process more effective, we're asking that these include more information to help define them more clearly.

## Translations
We appreciate your localization contributions, either by providing new translations, voting on translations, or suggesting process improvements. We take translations through the Transifex service, not through the vscode repo. See [our localization site](https://aka.ms/vscodeloc) to get started.

## Discussion Etiquette

In order to keep the conversation clear and transparent, please limit discussion to English and keep things on topic with the issue. Be considerate to others and try to be courteous and professional at all times.
