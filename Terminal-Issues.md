## Terminal Issues

This document is about reporting issues for the integrated terminal (<kbd>ctrl</kbd>+<kbd>`</kbd>). Learn more about how to use the terminal in the [documentation](https://code.visualstudio.com/docs/editor/integrated-terminal).

### Creating great terminal issues

- Make sure you read the common questions and long-standing known issues sections below as you might be reporting an issue that is already known.
- Include the VS Code version, Operating System version and a list of extensions you're using. Ideally you should use the issue reporter built into VS Code for this as it automatically includes this information in the report.
- Including a screenshot or gif is normally a good idea.
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

### Which issues go in which repos

The terminal has several dependencies which are also open source projects such as [xterm.js](https://github.com/xtermjs/xterm.js), [node-pty](https://github.com/microsoft/node-pty) and [conpty](https://github.com/microsoft/terminal). Managing issues is difficult across so many repos so the general rule we follow with terminal issues is that fairly niche upstream issues are only tracked in the upstream repositories and major upstream issues are tracked in VS Code as well in order to improve discoverability of the issue in question.

## Diagnosing terminal issues

### Enabling trace logging

For some terminal issues it's useful to get trace logs, this can reveal at what point something is failing. Follow these steps to get the logs:

1. Close all VS Code windows
2. Launch VS Code from the terminal using `code --log trace`
3. At this point you should reproduce the terminal issue you're having
4. Run the command "Developer: Open Log File..." (<kbd>F1</kbd> opened command palette) and select Window to get an editor containing the logs

If for some reason you're unable to restart VS Code like you're running in a remote, you can change the log level via the command palette (<kbd>F1</kbd> `Developer: Set Log Level...`).

### Enabling escape sequence logging

For issues where text is misbehaving in the terminal you can enable logging of the data being sent to the emulator from the shell process. To enable escape sequence logging run the "Terminal: Toggle Escape Sequence Logging" command from the command palette (<kbd>F1</kbd>), the logs can then be viewed in the devtools console (Help &gt; Toggle Developer Tools).

### Rendering problems

Figuring out what's going on with rendering can be tricky as there are a lot of moving parts. A blank screen could mean that the terminal was never created properly and the terminal is fine, or maybe that the renderer is broken. Here are good steps to help find the root cause of rendering problems:

- Zoom in and out (ctrl/cmd++, ctrl/cmd+-) will force the renderer to redraw everything
- The terminal features both a canvas-based renderer (fast can have various problems) dom-based renderer (slower but less problems). Changing the renderer type can identify issues with a particular renderer, configure with these settings:
   ```
   "terminal.integrated.rendererType": "dom"
   "terminal.integrated.rendererType": "canvas"
   ```

Known rendering problems:

- Corrupt texture showing after resuming OS from sleep [#69665](https://github.com/microsoft/vscode/issues/69665)
- Underscore and similar chars not showing up [#35901](https://github.com/microsoft/vscode/issues/35901)
- Characters become small or large after changing monitor DPI [xtermjs/xterm.js#2137](https://github.com/xtermjs/xterm.js/issues/2137)