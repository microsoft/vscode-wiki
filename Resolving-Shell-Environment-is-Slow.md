# VS Code Shell Environment

## Details

When launching VS Code from the UI on macOS and Linux, it won't have access to your configured `.bashrc` or `.zshrc` environment settings, by default. In that situation, VSCode will start a small process to resolve your shell environment in order to still get that environment. That way you can still benefit from your shell configuration when launching tasks or debug targets from within VS Code, even if you didn't start VS Code from a shell.

## Too Slow?

This notification might indicate that something is wrong with your shell environment, which seems to take too long to resolve:

![image](https://user-images.githubusercontent.com/900690/99997748-e640b000-2dbd-11eb-8496-9f6358422cb9.png)

Since we block the startup of VSCode until we have the shell environment resolved, we want to inform you in case this takes more than a couple of seconds. You can ignore this notification and decide to never show again in case you don't mind waiting a bit longer. In any case, it's probably a good idea to review your `~/.bashrc` or `~/.zshrc` configuration and find snippets that are potentially slow. Anything in those files can make VS Code slower to start, so experiement with commenting some lines out until you find a culprit for the slowness.
