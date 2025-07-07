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


## Reading requests

To easily see the details of requests made by Copilot Chat, run the command "Show Chat Debug View". This will show a treeview with an entry for each request made. You can see the prompt that was sent to the model, the tools that were enabled, the response, and other key details. You can save the request log with right click > "Export As...".

The view also has entries for tool calls on their own, and a prompt-tsx debug view that opens in the Simple Browser.

> 🚨 **Note**: This log is also very helpful in troubleshooting issues, and we will appreciate if you share it when filing an issue about the agent's behavior. But, this log may contain personal information such as the contents of your files or terminal output. Please review the contents carefully before sharing it with anyone else.