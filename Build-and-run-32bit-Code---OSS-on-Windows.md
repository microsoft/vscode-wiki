# Building and running the 32bit version of Visual Studio Code on 64bit Windows

Every so often, you may need to debug an issue that only appears in the 32bit version of VS Code but you're running 64bit Windows. To get a local build of the 32bit VS Code that you can debug, do the following:

1. Follow the [regular contributing guide](https://github.com/microsoft/vscode/wiki/How-to-Contribute) and make sure you can get the 64bit version of VS Code running locally.
1. Stop any running processes from the regular contributing guide.
1. Start a PowerShell session in the `vscode` directory that you cloned.
1. run `git clean -fdx` - remove downloaded election, remove `node_modules`, remove anything that isn't checked in to the repo
1. run `$env:npm_config_arch = 'ia32'` - let yarn know that you want to build the 32bit version
1. run `yarn` - install dependencies
1. run `yarn electron ia32` - download the 32bit of electron
1. run `.\scripts\code.bat` - start VS Code

You should be able to go into the About section and see that you're running the 32bit version of VS Code.

From here, everything else works the same (i.e. "Launch VS Code" task in codebase, Build task, etc).