# VS Code Shell Environment

## Details

When launching VS Code from the UI on macOS and Linux, it won't have access to your configured `.bashrc` or `.zshrc` environment settings, by default. In that situation, VSCode will start a small process to resolve your shell environment in order to still get that environment. That way you can still benefit from your shell configuration when launching tasks or debug targets from within VS Code, even if you didn't start VS Code from a shell.

## Too Slow Warning or Error

If resolving your shell environment is blocking the window for more than 3 seconds, you will be seeing this warning:

![Shell Environment Warning](https://user-images.githubusercontent.com/900690/100191177-ff497e00-2eef-11eb-828f-e48e9223d1c5.png)

After blocking the window for 10 seconds, we will give up waiting for the shell environment to resolve and you will be seeing this error:

![Shell Environment Error](https://user-images.githubusercontent.com/900690/100191170-fe185100-2eef-11eb-8879-6d18138e7be4.png)

Both notifications indicate that some of the configuration in your `.bashrc` or `.zshrc` configuration file takes a long time to resolve. The easiest way to address this issue is to:
* open these files (e.g. in VSCode by typing `~/.bashrc` or `~/.zshrc` in quick open)
* selectively start to comment out lines
* save and fully restart VSCode until the warning or error disappears