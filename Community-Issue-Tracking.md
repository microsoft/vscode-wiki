Welcome, and thank you for your interest in contributing to VS Code!

We have started to involve the most active members of the community in our issue tracking to better load-balance the work and allow for quicker feedback on new issues. The following are the guidelines and extra powers for our community trackers:

Check our ["inbox"](https://github.com/Microsoft/vscode/issues?utf8=%E2%9C%93&q=is%3Aopen%20no%3Aassignee%20-label%3Afeature-request%20-label%3Atestplan-item%20-label%3Aplan-item%20-label%3Aextension-candidate) for new issues and see if any can be helped with:
- If it needs more information, mark it as such with `/needsMoreInfo` (or `/needsPerfInfo` for performance issues) and maybe explain what is missing:
  - Does it reproduce with all extensions disabled (`--disable-extensions` or `Reload Window With Extensions Disabled`)?
  - For native crashes ask them to follow https://github.com/Microsoft/vscode/wiki/Native-Crash-Issues.
  - For non-English reports, ask them to describe the issue in English and suggest a machine translator.
- If a screenshot would be useful, mark it with `/gifPlease`.
- If it is a duplicate of an existing issue, mark it as such with `/duplicate #12345`.
  - Optionally let the bot search for duplicates (if it hasn't done so already) with `/findDuplicates`.
- If it is an issue with an extension from the Marketplace (i.e., not a built-in one), use `/causedByExtension` and optionally point the user to the repository where they can file the issue for the extension. For [some extensions](https://github.com/microsoft/vscode/blob/main/.github/commands.json) you can do this by using a specific response instead of `/causedByExtension`:
  - `/extC`
  - `/extC#`
  - `/extC++`
  - `/extDocker`
  - `/extGo`
  - `/extJava`
  - `/extJavaDebug`
  - `/extJS`
  - `/extJupyter`
  - `/extLiveShare`
  - `/extPowershell`
  - `/extPython`
  - `/extTS`

- If it is a bug you can reproduce, `/confirm` it and add any additional info that might help the dev team reproduce it.
- If it is a bug you cannot reproduce, use `/confirmationPending` to label it and add any info that might help the author clarify the steps to reproduce.
- If you know which team member should look at it, use `/assign @XYZ`.
- If it is a question that is better asked on StackOverflow, use `/question` to label and close it as such.