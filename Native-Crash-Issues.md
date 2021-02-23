# **Creating and symbolicating local crash reports**

VSCode since version 1.46 now supports a new `--crash-reporter-directory <absolute-path>` option that you can use to produce crash dumps into that folder. Please try this option first:
* close all instances of VSCode
* run `code --crash-reporter-directory <absolute-path>` from the command line
  * note: use `code-insiders` for the insiders version if you are using it
* take the steps that lead to the crash
* check for a `*.dmp` file in that folder
* send the `*.dmp` file back to us (email, or attach to issue)

If you can reproduce the issue running out of sources:
* Follow the instructions at https://github.com/nornagon/electron-minidump/blob/master/README.md
* Check for the symbolicated trace