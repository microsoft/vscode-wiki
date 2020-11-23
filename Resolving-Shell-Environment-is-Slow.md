# Synopsis
On macOS and Linux, VSCode will start a small process to resolve your shell environment in case VSCode was not started from a terminal already. We do that so that the process environment used e.g. for launching tasks or debug targets is the same as if a terminal was used right from the beginning.

Now, you may have seen this notification that brought you here:

![image](https://user-images.githubusercontent.com/900690/99997748-e640b000-2dbd-11eb-8496-9f6358422cb9.png)

Since we block the startup of VSCode until we have the shell environment resolved, we want to inform you in case this takes more than a couple of seconds. You can ignore this notification and decide to never show again in case you don't mind waiting a bit longer. But if you are curious, review your `~/.bashrc` or `~/.zshrc` configuration to find lines in there that potentially are slow. Anything you can comment out there to make opening a shell faster will also make VSCode faster.

