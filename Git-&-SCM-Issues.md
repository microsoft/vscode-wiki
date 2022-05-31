# Issues

## Repository discovery
WIP

## SCM changes does not refresh
WIP

## Editor decorators (add/modified) do not render
WIP

# Logging 

All logs emitted by the git extension are written to [the Git output channel](https://code.visualstudio.com/docs/editor/versioncontrol#_git-output-window). You can access the Git output channel by invoking the `Git: Show Git Output` command from the command palette or using the **View > Output**  menu, and selecting Git in the dropdown menu.

## `Log Level` setting

The `git.logLevel` setting controls the default log level for the git extension. To update the default log level, update the value of the setting, and invoke the `Developer: Reload Window` command from the command palette. To enable verbose logging, set the value of the setting to `Trace` and reload the the window.

## `Set Log Level` command

Use the `Git: Set Log Level` command from the command palette to change the log level of the current session. To enable verbose logging, invoke the command, and set the log level to `Trace`. Note that reloading the window, will reset the log level to the value specified in the `git.logLevel` setting.