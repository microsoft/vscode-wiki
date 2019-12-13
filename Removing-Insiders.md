## Mac

1) Remove Visual Studio Code - Insiders.app

GUI Based: Open Finder -> Applications. Right click "Visual Studio Code - Insiders.app" and move it to the trash. 

Terminal: `rm -r /Applications/Visual\ Studio\ Code\ -\ Insiders.app`

2) Remove `.vscode-insiders` folder

Terminal: `rm -r .vscode-insiders`

## Windows

Uninstall Visual Studio Code - Insiders

GUI Based: Navigate to Control Panel -> Programs -> Programs and Features. Search for "Visual Studio Code - Insider", right click and select "Uninstall"

## Linux

To remove the `.deb` package (Debian and Ubuntu):

```
sudo apt-get purge code-insiders
```

To remove the `.rpm` package (Red Hat, CentOS and SUSE):

```
sudo yum remove code-insiders
```
