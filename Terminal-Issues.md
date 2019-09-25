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

### Enabling trace logging

For some terminal issues it's useful to get trace logs, this can reveal at what point something is failing. Follow these steps to get the logs:

1. Close all VS Code windows
2. Launch VS Code from the terminal using `code --log trace`
3. At this point you should reproduce the terminal issue you're having
4. Run the command "Developer: Open Log File..." (<kbd>F1</kbd> opened command palette) to get an editor containing the logs

### Enabling escape sequence logging

This was added in v1.26.

For issues where text is misbehaving in the terminal you can enable logging of the data being sent to the emulator from the shell process. To enable escape sequence logging run the "Terminal: Toggle Escape Sequence Logging" command from the command palette (<kbd>F1</kbd>), the logs can then be viewed in the devtools console (Help &gt; Toggle Developer Tools).

### Long-standing known issues

Here are some long standing known issues in the terminal:

- Various emulation issues on Windows [#45693](https://github.com/Microsoft/vscode/issues/45693)
- Terminal does not show any text on Windows 7 [#43169](https://github.com/Microsoft/vscode/issues/43169)
  - Try turning off compatibility mode
- Characters like underscore are being cut off [#35901](https://github.com/Microsoft/vscode/issues/35901)
  - Try changing the `terminal.integrated.fontFamily`
- Emojis are printed as double width but are single width [xtermjs/xterm.js#1059](https://github.com/xtermjs/xterm.js/issues/1059)
