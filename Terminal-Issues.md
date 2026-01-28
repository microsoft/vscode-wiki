## Terminal Issues

This document is about reporting issues for the integrated terminal (<kbd>ctrl</kbd>+<kbd>`</kbd>). Learn more about how to use the terminal in the [documentation](https://code.visualstudio.com/docs/editor/integrated-terminal).

### Creating great terminal issues

- Make sure you read the common questions and long-standing known issues sections below as you might be reporting an issue that is already known.
- Include the VS Code version, Operating System version and a list of extensions you're using. Ideally you should use the issue reporter built into VS Code for this as it automatically includes this information in the report.
- Including a screenshot or [gif](https://gifcap.dev/) is normally a good idea.
- Including your settings.json is also a good idea as many issues are normally related to bad configuration.
- Take note if you're using an extension to launch the terminal, for example using a debugger to launch the terminal, language extension (eg. PowerShell Integrated Console) or something like Code Runner. If so there's a good chance it's an issue with the extension, not with VS Code.

**Windows-specific additions:**

- Be sure to include the build number if you're on Windows 10, this is attached automatically when using the builtin issue reporter or can be fetched manually by running `ver` in `cmd.exe`.
- If you're on Windows 10 1809 and below then you will be on the old terminal backend called `winpty`, a lot of these issues will not be actionable and closed as the solution to them was to move to the new frontend `conpty`.

### Common questions

Make sure you read over the [common questions section on the website](https://code.visualstudio.com/docs/editor/integrated-terminal#_common-questions).

### Long-standing known issues

Here are some long standing known issues in the terminal:

- Various emulation issues on Windows [#45693](https://github.com/Microsoft/vscode/issues/45693)
- Terminal does not show any text on Windows 7 [#43169](https://github.com/Microsoft/vscode/issues/43169)
  - Try turning off compatibility mode
- Characters like underscore are being cut off [#35901](https://github.com/Microsoft/vscode/issues/35901)
  - Try changing the `terminal.integrated.fontFamily`
- Emojis are printed as double width but are single width [xtermjs/xterm.js#1059](https://github.com/xtermjs/xterm.js/issues/1059)
- Non-English characters duplicated on Windows [#132715](https://github.com/microsoft/vscode/issues/132715)

### Which issues go in which repos

The terminal has several dependencies which are also open source projects such as [xterm.js](https://github.com/xtermjs/xterm.js), [node-pty](https://github.com/microsoft/node-pty) and [conpty](https://github.com/microsoft/terminal). Managing issues is difficult across so many repos so the general rule we follow with terminal issues is that fairly niche upstream issues are only tracked in the upstream repositories and major upstream issues are tracked in VS Code as well in order to improve discoverability of the issue in question.

## Diagnosing terminal issues

### Enabling trace logging

For some terminal issues it's useful to get trace logs, this can reveal at what point something is failing. Follow these steps to get the logs:

1. Close all VS Code windows
2. Launch VS Code from the terminal using `code --log trace`
3. At this point you should reproduce the terminal issue you're having
4. Run the command "Developer: Open Log File..." (<kbd>F1</kbd> opened command palette) and select `Terminal` (frontend logs like input) or `Pty Host` (backend logs like communication with shell) to get an editor containing the logs for the terminal.

If for some reason you're unable to restart VS Code like you're running in a remote, you can change the log level via the command palette (<kbd>F1</kbd> `Developer: Set Log Level...`).

### Why was a terminal command auto approved in chat?

The terminal tool in chat has a [powerful auto approve feature](https://code.visualstudio.com/docs/copilot/chat/chat-tools#_automatically-approve-terminal-commands) that you can enable in the allow dropdown. Once enabled, this will enable a set of default auto approval rules (unless `"chat.tools.terminal.ignoreDefaultAutoApproveRules": true` is set), you can see this set inside VS Code by auto completing the `chat.tools.terminal.autoApprove` setting in your settings.json file. For example this includes the following rules:

```json
{
  "find": true,
  "/^find\\b.*-(delete|exec|execdir|fprint|fprintf|fls|ok|okdir)\\b/": false,
}
```

This allows the `find` command in general, but not a set of arguments that can either write to arbitrary files or execute arbitrary commands.

In addition to the default rules, enabling auto approve will also enable auto approval rules in your [settings](https://code.visualstudio.com/docs/configure/settings) (user, profile, remote and workspace scopes).

In order to be approved a _command line_ must:

1. Achieve one of the following:
    - All sub-commands are auto approved by a rule. For example, `foo && bar` would need a `foo` and a `bar` rule.
    - The command line was auto approve by a rule. For example, `foo && bar` would match `"/^foo/": { "approve": true, "matchCommandLine": true }`.
2. No sub-commands or command lines are _denied_ by a false auto auto approve rule. For example, `"foo": false` will always block the `foo` command regardless of arguments.
3. For any detected file writes (only redirection at the time of writing), the command passes the rules defined by the `chat.tools.terminal.blockDetectedFileWrites` setting. By default this allows writing to workspace files as typically you will have an SCM protecting the content, and the [timeline view](https://code.visualstudio.com/docs/getstarted/userinterface#_timeline-view) may also allow accessing file history. So `cat README.md > README2.md` will intentionally allow writing to README2.md, or something like `cat /dev/null > README.md` can delete the content of a file.

If you see a command unexpectedly auto approved, you can follow these steps to diagnose why it was auto approve:

1. Hovering the tool call's check icon should tell you which rule(s) were used to approve it which can be clicked to go directly to them in your settings file.
2. Opening the Output panel and selecting the Terminal channel will show detailed logging on the reasoning of how the command was approved.

Note also that we use tree-sitter to parse the commands and extract sub-commands, we use [this PowerShell grammar](https://github.com/airbus-cert/tree-sitter-powershell) for pwsh and [the official bash grammar](https://github.com/tree-sitter/tree-sitter-bash) for everything else. This does mean that using auto approve on zsh may approve something unexpected when there is a conflict with bashes syntax, this is one of the "best effort" things that's talked about in the modal opt-in warning. You can read more about this and other related concerns in the caution section in [the docs](https://code.visualstudio.com/docs/copilot/chat/chat-tools#_automatically-approve-terminal-commands).

### Using showkey to investigate keybinding issues

There is a utility called `showkey` which will print the character codes as received by the application, this is similar to escape sequence logging above but's evaluated on the process side. Install `showkey` by installing the `kbd` package on Linux or `showkey` on homebrew, for example:

```
sudo apt update
sudo apt install kbd
showkey -a
```

```
brew install showkey
showkey -a
```

### Rendering problems

Figuring out what's going on with rendering can be tricky as there are a lot of moving parts. A blank screen could mean that the terminal was never created properly and the terminal is fine, or maybe that the renderer is broken. Here are good steps to help find the root cause of rendering problems:

- Zoom in and out (ctrl/cmd++, ctrl/cmd+-) will force the renderer to redraw everything
- The terminal features webgl, 2d canvas and dom-based renderers. Changing the renderer type can identify issues with a particular renderer, you can turn off the canvas renderers with this setting:
   ```
   "terminal.integrated.gpuAcceleration": "off"
   ```

Known rendering problems:

- Corrupt texture showing after resuming OS from sleep [#69665](https://github.com/microsoft/vscode/issues/69665)
- Underscore and similar chars not showing up [#35901](https://github.com/microsoft/vscode/issues/35901)
- Characters become small or large after changing monitor DPI [xtermjs/xterm.js#2137](https://github.com/xtermjs/xterm.js/issues/2137)

### Text wrapping problems

Sometimes terminal wrapping doesn't work as expected, for example a line that is expected to wrap will start overwriting the first part of the wrapped line. This type of problem is typically related to the backend and frontend's column count differing. You can get the frontend's column count by counting the number of cells in a line, for the backend `stty -a | grep columns` should tell you.

### Prompt input detection

To power features like [terminal IntelliSense](https://code.visualstudio.com/docs/terminal/shell-integration#_intellisense-preview) and general understanding of the command that was run in the terminal, we detect what is happening in the prompt by leveraging [shell integration](https://code.visualstudio.com/docs/terminal/shell-integration). When these feature aren't working as expected you can check VS Code's understanding of the prompt input by hovering the terminal tab and clicking Show Details on the bottom. Taking a screenshot of this is helpful to diagnose problems in this area.

### Investigating buffer synchronization issues with Windows/ConPTY

The helper [ConsoleMonitor.exe](https://github.com/microsoft/vscode/wiki/bin/ConsoleMonitor.exe) is available that is built from [the Windows Terminal repo](https://github.com/microsoft/terminal/blob/b56f61eca1b931ac03aaa8ad148bd95112e42ba1/src/tools/ConsoleMonitor/main.cpp) allows showing the actual buffer maintained by ConPTY in a console window. To do this, just download the binary and run it within the terminal you want to track.

## Why did you close my issue?

We get _a lot_ of issues and have to split our time between responding to and issues and actually improving the product. Because of this, we have a pretty high bar on issue quality and reproducibility, if we can't reproduce the issue we may have to close it off since we cannot action it.

Similarly, we depend on several upstream components and may close an issue off if the problem is likely related to one of those. The primary example of this is "conpty" which is a dependency built by the Windows Terminal team and shipped as part of Windows. This is a much better situation than earlier as there is a team of experts focusing on Windows Terminal and its backend conpty, but they also bundle the latest version of conpty which we may get a year later when a Windows update ships. So we may close your issue as a conpty issue, even though it works fine in Windows Terminal because it's most likely fixed in a later version of Windows. Another side effect of this is our old backend "winpty" is now deprecated and we don't plan on improving it as the "fix" for problems in winpty is to move to the maintained official Microsoft backend conpty.

Whether we can action the issue is the main reason we close issues off but we may also close an issue as designed or out of scope. You can visit [issue grooming](https://github.com/microsoft/vscode/wiki/Issue-Grooming) for more info on how we manage and triage issues.