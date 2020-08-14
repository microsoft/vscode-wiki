# Insider Release Notes

The [Insiders build](https://code.visualstudio.com/blogs/2016/05/23/evolution-of-insiders) is designed for early adopters wanting a nightly release. In fact, Insiders builds are the builds we use internally to develop VS Code. 

Over the course of an iteration the contents of the Insiders builds will change frequently. Therefore, we do not produce a formal set of Release Notes. Instead, the following queries will help you explore the contents of a nightly build:

* [Commit log](https://github.com/Microsoft/vscode/commits/master)

* [Recently closed issues](https://github.com/Microsoft/vscode/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aclosed) 

* [Current month's iteration plan](https://github.com/Microsoft/vscode/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Aiteration-plan+)

* [Current month's Release Notes on GitHub](https://github.com/Microsoft/vscode-docs/blob/vnext/release-notes)

## Settings Sync Insiders Service

Settings Sync now uses a separate service for Insiders with storage independent of the Stable service. You can always sync your Insiders with stable using the `Settings Sync: Select Service...` command, which is available only in VS Code Insiders.

![](https://code.visualstudio.com/assets/updates/1_48/settings-sync-switch.png)