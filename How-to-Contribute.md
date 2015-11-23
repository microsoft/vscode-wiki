# Contributing to Code
There are many ways to contribute to the Code project: logging bugs, submitting pull requests, reporting issues, and creating suggestions.

## Build and Run From Source

If you want to understand how Code works or want to debug an issue, you'll want to get the source, build it, and run the tool locally.

### Installing Prerequisites

You'll need [Node.JS](https://nodejs.org/en/), at least version 0.12.

Code includes node module dependencies that require native compilation. To ensure the compilation is picking up the right version of header files from the Electron Shell, we have our own script to run the installation via `npm`.

For native compilation, you will need [Python](https://www.python.org/downloads/) (version `v2.7` recommended, `v3.x.x` is __*not*__ supported), as well as a C/C++ compiler tool chain.

**Windows:**
* In addition to [Python v2.7](https://www.python.org/downloads/release/python-279/), make sure you have a PYTHON environment variable set to `drive:\path\to\python.exe`, not to a folder
* [Visual Studio 2013 for Windows Desktop](https://www.visualstudio.com/en-us/news/vs2013-community-vs.aspx) or [Visual Studio 2015](https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx), make sure to select the option to install all C++ tools and the Windows SDK

**OS X** 
* Command line developer tools
* Python should be installed already
* [XCode](https://developer.apple.com/xcode/downloads/) and the Command Line Tools (XCode -> Preferences -> Downloads), which will install `gcc` and the related toolchain containing `make`

**Linux**
* Python v2.7
* `make`
* A proper C/C++ compiler tool chain, for example [GCC](https://gcc.gnu.org)

After you have these tools installed, run the following commands to check out Code and install dependencies:

**OS X**

	git clone https://github.com/microsoft/vscode
	cd vscode && npm install -g mocha gulp
	./scripts/npm.sh install

**Windows**

	git clone https://github.com/microsoft/vscode
	cd vscode
	npm install -g mocha gulp
	scripts\npm install

**Linux**

	git clone https://github.com/microsoft/vscode
	cd vscode && npm install -g mocha gulp
	./scripts/npm.sh install --arch=x64
	# for 32bit Linux
	#./scripts/npm.sh install --arch=ia32

**Note:** For more information on how to install NPM modules globally on UNIX systems without resorting to `sudo`, refer to [this guide](http://www.johnpapa.net/how-to-use-npm-global-without-sudo-on-osx/) .

## Development Workflow

### Incremental Build
From a terminal, where you have cloned the `vscode` repository, execute the following command to run the TypeScript incremental builder:

``` bash
gulp watch
```
It will do an initial full build and then watch for file changes, compiling those changes incrementally, enabling a fast, iterative coding experience.

**Tip!** Open VS Code on the folder where you have cloned the `vscode` repository and press `CMD+SHIFT+B` (`CTRL+SHIFT+B` on Windows, Linux) to start the builder. To view the build output open the Output stream by pressing `CMD+SHIFT+U`.

### Errors and Warnings
Errors and warnings will show in the console while developing Code. If you use VS Code to develop Code, errors and warnings are shown in the status bar at the bottom left of the editor. You can view the error list using `View | Errors and Warnings` or pressing `CMD+P` and then `!`. 

**Tip!** You don't need to stop and restart the development version of Code after each change. You can just execute `Reload Window` from the command palette. We like to assign the keyboard shortcut `CMD+R` (`CTRL+R on Windows, Linux) to this command.

### Validate your changes
To test the changes you launch a development version of VS Code on the workspace `vscode`, which you are currently editing.

OS X and Linux

	./scripts/code.sh

Windows

	.\scripts\code.bat

You can identify the development version of Code by the Electron icon in the Dock or Taskbar.

**Tip!** If you receive an error stating that the app is not a valid Electron app, it probably means you didn't run `gulp watch` first.

### Debugging
Code has a multi-process architecture and your code is executed in different processes.

The **render** process runs the UI code inside the Shell window. To debug code running in the **render** you can either use VS Code or the Chrome Developer Tools.

#### Using VSCode
* Install the [Debugger for Chrome](https://marketplace.visualstudio.com/items/msjsdiag.debugger-for-chrome) extension. This extension will let you attach to and debug client side code running in Chrome.
* Launch the development version of Code with the following command line option:

OSX and Linux
``` bash
./scripts/code.sh --remote-debugging-port=9222
```
Windows
``` bash
scripts\code --remote-debugging-port=9222
```

* Choose the `Attach to VSCode` launch configuration from the launch dropdown in the Debug viewlet and press `F5`.


#### Using the Chrome Developers Tools

* Run the `Developer: Toggle Developer Tools` command from the Command Palette in your development instance of Code to launch the Chrome tools.

The **extension host** process runs code implemented by a plugin. To debug extensions (including those packaged with Code) which run in the extension host process, you can use VS Code itself. Switch to the Debug viewlet, choose the `Attach to Extension Host` configuration, and press `F5`.

### Unit Testing
Press `CMD+SHIFT+T` (`CTRL+SHIFT+T` on Windows) to start the unit tests or run the tests directly from a terminal by running `./test/run.sh` from the `vscode` folder (`test\run` on Windows). The [test README](https://github.com/Microsoft/vscode/blob/master/test/README.md) has complete details on how to run and debug tests, as well as how to produce coverage reports.

## Work Branches
Even if you have push rights on the Microsoft/vscode repository, you should create a personal fork and create feature branches there when you need them. This keeps the main repository clean and your personal workflow cruft out of sight.

## Pull Requests
Before we can accept a pull request from you, you'll need to sign a [[Contributor License Agreement (CLA)|Contributor-License-Agreement]]. It is an automated process and you only need to do it once. The project [README.md](https://github.com/Microsoft/vscode/blob/master/README.md) details how to clone, build, run, debug and test Code. Be sure to follow our [[Coding Guidelines|Coding-Guidelines]].

## Suggestions
We're also interested in your feedback for the future of Code. You can submit a suggestion or feature request through the issue tracker. To make this process more effective, we're asking that these include more information to help define them more clearly. 

## Discussion Etiquette

In order to keep the conversation clear and transparent, please limit discussion to English and keep things on topic with the issue. Be considerate to others and try to be courteous and professional at all times.