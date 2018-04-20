# Contributing to Code
There are many ways to contribute to the Code project: logging bugs, submitting pull requests, reporting issues, and creating suggestions.

After cloning and building the repo, check out the [issues list](https://github.com/Microsoft/vscode/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue). Issues labeled [`good first issue`](https://github.com/Microsoft/vscode/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) are good candidates to pick up if you are in the code for the first time.

## Build and Run

If you want to understand how Code works or want to debug an issue, you'll want to get the source, build it, and run the tool locally.

### Getting the sources

```
git clone https://github.com/Microsoft/vscode.git
```

### Prerequisites

- [Git](https://git-scm.com)
- [Node.JS](https://nodejs.org/en/), `>= 8.9.1, < 9.0.0`
- [Yarn](https://yarnpkg.com/en/), follow the [installation guide](https://yarnpkg.com/en/docs/install)
- [Python](https://www.python.org/downloads/), at least version 2.7 (version 3 is __*not*__ supported)
- C/C++ compiler tool chain
  - **Windows**
    - Set a `PYTHON` environment variable pointing to your `python.exe`. Eg: `C:\Python27\python.exe`
    - [Visual Studio 2013 for Windows Desktop](https://www.visualstudio.com/en-us/news/vs2013-community-vs.aspx?wt.mc_id=github_microsoft_vscode) or [Visual Studio 2015](https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx?wt.mc_id=github_microsoft_vscode), make sure to select the option to install all C++ tools and the Windows SDK.
    - You can also use Felix Rieseberg's [Windows Build Tools npm module](https://github.com/felixrieseberg/windows-build-tools) instead of Visual Studio. The `--debug` flag is helpful if you encounter any problems during installation
    - Please note that building and debugging via the Windows subsystem for Linux (WSL) is currently not supported.
  - **OS X**
    - [Xcode](https://developer.apple.com/xcode/downloads/) and the Command Line Tools (Xcode -> Preferences -> Downloads), which will install `gcc` and the related toolchain containing `make`
  - **Linux**
    * `make`
    * [GCC](https://gcc.gnu.org) or another compile toolchain
    * [native-keymap](https://www.npmjs.com/package/native-keymap) needs `libx11-dev` and `libxkbfile-dev`.
      * On Debian-based Linux: `sudo apt-get install libx11-dev libxkbfile-dev`
      * On Red Hat-based Linux: `sudo yum install libX11-devel.x86_64 libxkbfile-devel.x86_64 # or .i686`.
    * [keytar](https://www.npmjs.com/package/keytar) needs `libsecret-1-dev`.
      * On Debian-based Linux: `sudo apt-get install libsecret-1-dev`.
      * On Red Hat-based Linux: `sudo yum install libsecret-devel`.
    * Building deb and rpm packages requires `fakeroot` and `rpm`, run: `sudo apt-get install fakeroot rpm`

Finally, install all dependencies using `Yarn`:

```
cd vscode
yarn
```

If you are on Windows or Linux 64 bit systems and would like to compile to 32 bits, you'll need to set the `npm_config_arch` environment to `ia32` before running `yarn`. This will compile all native node modules for a 32 bit architecture.

**Note:** For more information on how to install NPM modules globally on UNIX systems without resorting to `sudo`, refer to [this guide](http://www.johnpapa.net/how-to-use-npm-global-without-sudo-on-osx/).

### Build

From a terminal, where you have cloned the `vscode` repository, execute the following command to run the TypeScript incremental builder:

```bash
yarn run watch
```

It will do an initial full build and then watch for file changes, compiling those changes incrementally, enabling a fast, iterative coding experience.

👉 **Tip!** Linux users may hit a ENOSPC error when running `yarn run watch`, to get around this follow instructions in the [Common Questions](https://code.visualstudio.com/docs/setup/linux#_common-questions).

👉 **Tip!** Open VS Code on the folder where you have cloned the `vscode` repository and press <kbd>CMD+SHIFT+B</kbd> (<kbd>CTRL+SHIFT+B</kbd> on Windows, Linux) to start the builder. To view the build output open the Output stream by pressing <kbd>CMD+SHIFT+U</kbd>.

#### Errors and Warnings
Errors and warnings will show in the console while developing Code. If you use VS Code to develop Code, errors and warnings are shown in the status bar at the bottom left of the editor. You can view the error list using `View | Errors and Warnings` or pressing <kbd>CMD+P</kbd> and then <kbd>!</kbd>.

👉 **Tip!** You don't need to stop and restart the development version of Code after each change. You can just execute `Reload Window` from the command palette. We like to assign the keyboard shortcut <kbd>CMD+R</kbd> (<kbd>CTRL+R</kbd> on Windows, Linux) to this command.

### Run

To test the changes you launch a development version of VS Code on the workspace `vscode`, which you are currently editing.

**OS X and Linux**

```bash
./scripts/code.sh
```

**Windows**

```bat
.\scripts\code.bat
```
### Run the cli changes

To test the changes you made to the cli, run the following script 

**OS X and Linux**

```bash
./scripts/code-cli.sh
```

**Windows**

```bat
.\scripts\code-cli.bat
```

You can identify the development version of Code ("Code - OSS") by the following icon in the Dock or Taskbar:

[![VS Code default icon](https://i.imgur.com/D2CeX0y.png)](https://i.imgur.com/D2CeX0y.png)

👉 **Tip!** If you receive an error stating that the app is not a valid Electron app, it probably means you didn't run `yarn run watch` first.

### Debugging
Code has a multi-process architecture and your code is executed in different processes.

The **render** process runs the UI code inside the Shell window. To debug code running in the **render** you can either use VS Code or the Chrome Developer Tools.

#### Using VSCode
* Install the [Debugger for Chrome](https://marketplace.visualstudio.com/items/msjsdiag.debugger-for-chrome) extension. This extension will let you attach to and debug client side code running in Chrome.
* Open the `vscode` repository folder
* Choose the `Launch VS Code` launch configuration from the launch dropdown in the Debug viewlet and press `F5`.


#### Using the Chrome Developer Tools

* Run the `Developer: Toggle Developer Tools` command from the Command Palette in your development instance of Code to launch the Chrome tools.
* It's also possible to debug the released versions of Code, since the sources link to sourcemaps hosted online.

[![sourcemaps](http://i.imgur.com/KU3TdjO.png)](http://i.imgur.com/KU3TdjO.png)

The **extension host** process runs code implemented by a plugin. To debug extensions (including those packaged with Code) which run in the extension host process, you can use VS Code itself. Switch to the Debug viewlet, choose the `Attach to Extension Host` configuration, and press <kbd>F5</kbd>.

### Automated Testing
Run the unit tests directly from a terminal by running `./scripts/test.sh` from the `vscode` folder (`scripts\test` on Windows). The [test README](https://github.com/Microsoft/vscode/blob/master/test/README.md) has complete details on how to run and debug tests, as well as how to produce coverage reports.

We also have automated UI tests. The [smoke test README](https://github.com/Microsoft/vscode/blob/master/test/smoke/README.md) has all the details.

### Linting
We use [tslint](https://github.com/palantir/tslint) for linting our sources. You can run tslint across the sources by calling `gulp tslint` from a terminal or command prompt. You can also run `gulp tslint` as a Code task by pressing <kbd>CMD+P</kbd> (<kbd>CTRL+P</kbd> on Windows) and entering `task tslint`. Warnings from tslint show up in the `Errors and Warnings` quick box and you can navigate to them from inside Code.

To lint the source as you make changes you can install the [tslint extension](https://marketplace.visualstudio.com/items/eg2.tslint).

## Work Branches
Even if you have push rights on the Microsoft/vscode repository, you should create a personal fork and create feature branches there when you need them. This keeps the main repository clean and your personal workflow cruft out of sight.

## Pull Requests
Before we can accept a pull request from you, you'll need to sign a [[Contributor License Agreement (CLA)|Contributor-License-Agreement]]. It is an automated process and you only need to do it once.

To enable us to quickly review and accept your pull requests, always create one pull request per issue and [link the issue in the pull request](https://github.com/blog/957-introducing-issue-mentions). Never merge multiple requests in one unless they have the same root cause. Be sure to follow our [[Coding Guidelines|Coding-Guidelines]] and keep code changes as small as possible. Avoid pure formatting changes to code that has not been modified otherwise. Pull requests should contain tests whenever possible.

### Where to Contribute
Check out the [full issues list](https://github.com/Microsoft/vscode/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue) for a list of all potential areas for contributions. Note that just because an issue exists in the repository does not mean we will accept a contribution to the core editor for it. There are several reasons we may not accepts a pull request like:

* Performance - One of Visual Studio Code's core values is to deliver a *lightweight* code editor, that means it should perform well in both real and perceived performance.
* User experience - Since we want to deliver a *lightweight* code editor, the UX should feel lightweight as well and not be cluttered. Most changes to the UI should go through the issue owner and/or the UX team.
* Architectural - The team and/or feature owner needs to agree with any architectural impact a change may make. Things like new extension APIs *must* be discussed with and agreed upon by the feature owner.

To improve the chances to get a pull request merged you should select an issue that is labelled with the [`help-wanted`](https://github.com/Microsoft/vscode/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) or [`bug`](https://github.com/Microsoft/vscode/issues?q=is%3Aopen+is%3Aissue+label%3A%22bug%22) labels. If the issue you want to work on is not labelled with `help-wanted` or `bug`, you can start a conversation with the issue owner asking whether an external contribution will be considered.

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
