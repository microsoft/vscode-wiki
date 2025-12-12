This document covers how to handle and report issues with VS Code's Copilot and Copilot Chat extensions. 

# Reporting Issues

Here's how to contribute a high quality and _actionable_ issue for Copilot. Make sure to also refer to our [general issue reporting guidelines](https://github.com/microsoft/vscode/wiki/Submitting-Bugs-and-Suggestions).

1. If possible, try to find a consistent set of steps to reproduce the issue that you are reporting.

2. Search first for your issue and determine if it has already been filed. If you find a matching issue, please comment there with all of the information listed in the next step. This helps us minimize time spent triaging issues, and accurately determine what the priority issues are.

3. Please collect the following information to help us diagnose any potential back end issues, as well as helping us reproduce the issue locally.

    - The current model(s) that you're experiencing this with
    - Request id's for the failed requests (see notes on finding logs)
    - Screenshots and/or recordings of the issue you're experiencing
    - Any error logs from either the **Window** or **Copilot Chat** output channels (see notes on finding logs)
    - _For network issues_: Use the command palette with the command `Developer: GitHub Copilot Chat Diagnostics` and attach this output as well to the issue.

# Finding Logs

Finding the relevant output logs is easily accomplished by doing the following:

- Open the Command Palette and use the command **Developer: Set Log Level...** and then set to **Trace**. If you would prefer to only do it for specific channels, you should do so for **Copilot Chat** and **Window**.
- Open the Command Palette (F1 or `cmd/ctrl+shift+p`) and use the command **Output: Show Output Channels...**. Then simply select the channel you're trying to copy from. 
- When looking for another output channel, you can either repeat the command palette route or use the dropdown at the upper right of the output channel. 

<img width="1079" alt="Screenshot 2025-06-26 at 11 00 18 AM" src="https://github.com/user-attachments/assets/28a4b2e3-9519-4824-87c6-e778867d0914" />

![Screenshot 2025-06-23 at 1 47 23 PM](https://github.com/user-attachments/assets/29b35d2e-35b9-442a-82ba-b062c6b094c7)


## Language Model Requests and Responses

To look at the information that was send to and received from the Language Model do the following

- make your chat request
- run command `Developer: Show Chat Debug View`
- in the view that opens go to the end of the view and look for node like `panel/editAgent` or `panel/askAgent`
- select the node to see the detailed information
- save the request log with right click > "Export As...".


> 🚨 **Note**: This log may contain personal information such as the contents of your files or terminal output. Please review the contents carefully before sharing it with anyone else.

<img alt="LLM Request Log" src="https://github.com/user-attachments/assets/5b77358c-a4c6-4612-ba64-1193fb58fc9f" />

### Chat Replay Viewer

The .chatreplay.json file can be viewed here: https://digitarald.github.io/vscode-chat-logs/
<img alt="Chat Replay Viewer" width="835" height="518" alt="Image" src="https://github.com/user-attachments/assets/a7c6b9d7-ad32-4802-aec0-f987519f92a1" />

## Custom Instructions Logs

To debug why your [custom instructions](https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions) are not used by the language model test the following.

- First check if setting `chat.promptFiles` is enabled. Some organizations forbid the use of experimental features, and the settings `chat.promptFiles` is marked as such. When `chat.promptFiles` is set, you show see `Prompt Files` and `Instructions` in the gear menu of the chat view:
<img  alt="Chat Gear Menu" src="https://github.com/user-attachments/assets/4ea706c0-f41b-43fe-a375-f20a26a5e523" />

- Run the `Developer: Show Logs...` command and select `Window`. This will show the Output view showing log statements for the current window
- Run the `Developer: Set Log Level...` and select `Trace`
- Do your prompt
- Check the log for `[InstructionsContextComputer]`
Example:
```
2025-07-14 17:44:36.149 [trace] [Window] [InstructionsContextComputer] 1 instruction files available.
2025-07-14 17:44:36.156 [trace] [Window] [InstructionsContextComputer] Match for file:///c%3A/Users/martinae/workspaces/vscode/.github/instructions/typescript.instructions.md with **/*.ts for file file:///c%3A/Users/martinae/workspaces/vscode/src/vs/workbench/contrib/chat/common/promptSyntax/computeAutomaticInstructions.ts
2025-07-14 17:44:36.157 [trace] [Window] [InstructionsContextComputer]  1 Copilot instructions files added.
```

- When done you can run `Developer: Set Log Level...` again and set it to back to `Info`
