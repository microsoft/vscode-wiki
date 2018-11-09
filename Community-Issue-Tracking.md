Welcome, and thank you for your interest in contributing to VS Code!

We have started to involve the community in our issue tracking to better load-balance the work and allow for quicker feedback on new issues. The following are the guidelines and extra powers for our community trackers:

Check our ["inbox"](https://github.com/Microsoft/vscode/issues?utf8=%E2%9C%93&q=is%3Aopen%20no%3Aassignee%20-label%3Afeature-request%20-label%3Atestplan-item%20-label%3Aplan-item%20-label%3Aextension-candidate) for new issues and see if any can be helped with:
- If it needs more information, mark it as such with `/needsMoreInfo` and maybe explain what is missing:
  - Does it reproduce with all extensions disabled (`--disable-extensions` or `Reload Window With Extensions Disabled`)?
  - For performance issues ask them to follow https://github.com/Microsoft/vscode/wiki/Performance-Issues.
  - For native crashes ask them to follow https://github.com/Microsoft/vscode/wiki/Native-Crash-Issues.
  - For non-English reports, ask them to describe the issue in English and suggest a machine translator.
- If it is a duplicate of an existing issue, mark it as such with `/duplicate #12345`.
  - Optionally let the bot search for duplicates (if it hasn't done so already) with `/findDuplicates`.
- If it is a bug you can reproduce, `/confirm` it and add any additional info that might help the dev team reproduce it.