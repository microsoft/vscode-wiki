## Terminal Issues

This document is about reporting issues for the integrated terminal (ctrl+\`). Learn more about how to use the terminal in the [documentation](https://code.visualstudio.com/docs/editor/integrated-terminal).

### Common questions

Make sure you read over the [common questions section on the website](https://code.visualstudio.com/docs/editor/integrated-terminal#_common-questions).

### Enabling trace logging

For some terminal issues it's useful to get trace logs, this can reveal at what point something is failing. Follow these steps to get the logs:

1. Close all VS Code windows
2. Launch VS Code from the terminal using `code --log trace`
3. At this point you should reproduce the termnial issue you're having
4. Run the command "Developer: Open Log File..." (F1 opened command palette) to get an editor containing the logs

### Enabling escape sequence logging

This was added in v1.27.

For issues where text is misbehaving in the terminal you can enable logging of the data being sent to the emulator from the shell process. To enable escape sequence logging run the "Terminal: Toggle Escape Sequence Logging" command from the command palette (F1), the logs can then be viewed in the devtools console (Help &gt; Toggle Developer Tools).

### Long standing known issues

Here are some long standing known issues in the terminal:

- Various emulation issues on Windows [#45693](https://github.com/Microsoft/vscode/issues/45693)
- Terminal does not show any text on Windows 7 [#43169](https://github.com/Microsoft/vscode/issues/43169)
  - Try turning off compatibility mode
- Characters like underscore are being cut off [#35901](https://github.com/Microsoft/vscode/issues/35901)
  - Try changing the `terminal.integrated.fontFamily`
- Emojis are printed as double width but are single width [xtermjs/xterm.js#1059](https://github.com/xtermjs/xterm.js/issues/1059)