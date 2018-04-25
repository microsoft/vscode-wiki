## Mac

1) Remove Visual Studio Code - Insiders.app

GUI Based: Open Finder -> Applications. Right click "Visual Studio Code - Insiders.app" and move it to the trash. 

Terminal: `rm -r /Applications/Visual\ Studio\ Code\ -\ Insiders.app`

2) Remove `.vscode-insiders` folder

Terminal: `rm -r .vscode-insiders`

## Windows

Uninstall Visual Studio Code - Insiders

GUI Based: Navigate to Control Panel -> Programs -> Program and Features. Search for "Visual Studio Code - Insider", right click and select "Uninstall"

## Linux

Remove `.deb` or `.rpm` package.

#### Debian / Ubuntu


go to `/usr/share` and find the folder of installation of vscode, which would be `code-insiders` for `insider preview` and `code` for `normal` version. Remove the folder which u don't find necessary. 

Don't forget to remove the start menu entry in `/usr/share/applications/`

To remove the application settings go to your home folder and remove the .vscode folder.

**** Please make sure you backup your settings if you are planning to use vscode later
