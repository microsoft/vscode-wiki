Some issues could originate from a problem with file watching. Let me explain how file watching works in VSCode first and then provide some details how to get more logging data from how file watching behaves in your case.

**Synopsis**
VSCode has different strategies for file watching depending on your workspace and setup:
* no folder opened: files in opened editors are watched via node.js `fs.watch`
* folder opened: folder is watched recursively for all changes via [parcel](https://github.com/parcel-bundler/watcher), opened editors with files not within the folder are watched via node.js `fs.watch`

If you are connected to a remote (SSH, WSL, Docker), the file watcher will run within the target file system. As such, even though you maybe on Windows where VSCode runs, if the remote is Linux, the file watcher will run in the Linux environment.

**Platforms**
Depending on the platform you are on, file watching is differently implemented:
* macOS: using `fsevents` services
* Windows: using `ReadDirectoryChangesW` method
* Linux: using `inotify`

Specifically on Linux, watching a large folder recursively can result in VSCode consuming too many file handles. If that is the case, you will see a warning notification with instructions how to solve that.

**Limitations**
File watching comes with a set of limitations:
* symbolic links are not followed automatically but you can explicitly add symbolic links to be watched via the `files.watcherInclude` setting
* mapped network drives or third party file system drivers are not guaranteed to produce file events
* in general, the operating system may decide to drop file events at any time, there is no 100% guarantee

**Settings**
Please review your settings to see if maybe a folder is excluded by accident. Specifically, the `files.watcherExclude` setting is relevant.

### Logging (local)
!!! This is ONLY when you open a local workspace, for remote see below !!!
We provide logging for file events when you enable verbose logging. Steps are:
* open VSCode on the local workspace that shows the issue
* select `View | Command Palette...`
* select `Developer - Set Log Level...`
* pick `Trace`
* select `Help | Toggle Developer Tools`
* select `Console`
* filter the output by typing `File Watcher` into the filter box
* attach the output when doing the operation that exhibits the issue

![image](https://user-images.githubusercontent.com/900690/156323290-f3ba6470-dfed-4066-a19c-951395611738.png)

### Logging (remote)
!!! This is ONLY when you open a remote workspace (WSL, Docker, SSH), for local see above !!!
We provide logging for file events when you enable verbose logging. Steps are:
* open VSCode on the remote workspace that shows the issue
* select `View | Command Palette...`
* select `Developer - Set Log Level...`
* pick `Trace`
* select `View | Output`
* select `Log (Remote Server)` from the dropdown
* attach the output when doing the operation that exhibits the issue

![image](https://user-images.githubusercontent.com/900690/156323886-6b7dfa25-d6ac-4316-9150-80e5c8104d04.png)