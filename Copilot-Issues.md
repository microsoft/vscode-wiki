This document covers how to handle and report issues with VS Code's Copilot and Copilot Chat extensions. 

# Reporting issue

Here's how to contribute a high quality and actionable issue for Copilot. Make sure to first refer to our [general issue reporting guide](https://github.com/microsoft/vscode/wiki/Submitting-Bugs-and-Suggestions).

1. If possible, try to find a consistent set of steps to reproduce the issue that you are reporting.

2. Search first for your issue and determine if it has already been filed. If you find a matching issue, please comment there with all of the information listed in the next step.

3. Please collect the following information to help us diagnose any potential back end issues, as well as helping us reproduce the issue locally.

    - The current model(s) that you're experiencing this with
    - Request id's for the failed requests (see notes on finding logs)
    - Screenshots and/or recordings of the issue you're experiencing
    - Any error logs from either the **Window** or **Copilot Chat** output channels (see notes on finding logs)


# Finding logs

Finding the relevant output logs is easily accomplished by doing the following:

- Open the Command Pallette and use the command **Developer: Set Log Level...** and then set to **Trace**. If you would prefer to only do it for specific channels, you should do so for **Copilot Chat** and **Window**.
- Open the Command Pallette (F1 or `cmd/ctrl+shift+p`) and use the command **Output: Show Output Channels...**. Then simply select the channel you're trying to copy from. 
- When looking for another output channel, you can either repeat the command pallette route, or use the dropdown at the upper right of the output channel. 

![Screenshot 2025-06-23 at 1 47 23 PM](https://github.com/user-attachments/assets/29b35d2e-35b9-442a-82ba-b062c6b094c7)


