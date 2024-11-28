# Speech extension for Visual Studio Code

<p align="center">
    <img src="https://github.com/microsoft/vscode/assets/900690/38106cff-2a99-4715-934c-cb1711bbf72c" alt="Logo">
</p>

The [VS Code Speech](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-speech) extension adds speech-to-text capabilities to the chat interfaces in Visual Studio Code. No internet connection is required, the voice audio data is processed locally on your computer.

![Speech to text in Visual Studio Code](https://github.com/microsoft/vscode/assets/900690/63279c01-3941-46c5-bf51-284fbc31fbfe)

## Getting Started

Install the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension and sign in and then install [VS Code Speech](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-speech). You will see a microphone icon in all chat interfaces that GitHub Copilot Chat extension provides.

## Keybindings

For a quick experience of starting to listen from the microphone and submitting when done you can assign the following keybinding squence:

```json
{
    "key": "cmd+u",
    "command": "workbench.action.chat.startVoiceChat",
    "when": "!voiceChatInProgress"
},
{
    "key": "cmd+u",
    "command": "workbench.action.chat.stopListeningAndSubmit",
    "when": "voiceChatInProgress"
}
```

**Note:** by default we will start to search after a moment when you pause talking.

## Supported Platforms

This is extension is tested and published for the following platforms:

- Windows 64bit
- macOS 64bit / ARM
- Linux 64bit / ARM

## Supported Languages

We currently only support English. Stay tuned for more language support to come in the future.

## Issues

This extension is still in development, so please refer to our [issue tracker for known issues](https://github.com/Microsoft/vscode/issues), and please contribute with additional information if you encounter an issue yourself.
