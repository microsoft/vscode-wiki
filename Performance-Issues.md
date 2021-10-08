## Table of Contents
- [Reporting a Performance Issue](#reporting)  
- [Visual Studio Code is consuming a lot of CPU](#consuming-cpu) 
  - [Run with Extensions Disabled](#extensions-disabled)
  - [Profile the Running Extensions](#profile-running-extensions)
  - [Collect Information about the running VS Code](#collect-information)
  - [The Renderer/Window process consumes a lot of CPU](#renderer-process)
  - [The Shared process consumes a lot of CPU](#shared-process)
- [Visual Studio Code is sluggish](#sluggish-ui)
- [Visual Studio Code starts up slowly](#slow-startup)  
  - [Read the Startup Timers](#startup-timer)

<a name="reporting"/>

## Reporting a Performance Issue

To report a performance issue please use the 'Report Issue' command available in the 'Help' menu. In the Issue Reporter window that shows up, set the issue type to 'Performance Issue'.

![image](https://user-images.githubusercontent.com/172399/42494913-e3532ece-8421-11e8-9f37-2da879c80ed6.png)

The following sections describe how you can narrow down a performance issue.

<a name="consuming-cpu"/>

## Visual Studio Code is consuming a lot of CPU

High CPU consumption is often caused by an issue in an extension. VS Code is running multiple processes and extensions are executed by the `Extension Host` process.

Find out whether an extension is causing the high CPU load. You can open the Process Explorer using `Help>Open Process Explorer` to open a new window with a continuously updating list of VS Code processes. 

![image](https://user-images.githubusercontent.com/172399/40024023-383afbfa-57cd-11e8-91cc-24e14e5566df.png)

Try to reproduce the issue with this window open, or take a snapshot of the processes by running `code --status` from the command line. For information on how to run `code` from the command line on OS X please see the [setup documentation](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line). When the process listing in the Process Explorer or the output of `code --status` shows that the `extensionHost` is consuming a high percentage of CPU (see below) then this is likely caused by an extension.

![image](https://user-images.githubusercontent.com/172399/36384870-1aac63c2-1591-11e8-8924-b30756643f3f.png)

<a name="extensions-disabled"/>

### Run with Extensions Disabled

The first step is to try to reproduce the problem with all extensions disabled. You can disable the extensions either from the command line using the `--disable-extensions` command line argument, e.g., `code --disable-extensions` or from the `...` menu in the Extensions Viewlet:

![image](https://user-images.githubusercontent.com/172399/34978338-33e7bf98-fa9e-11e7-9c79-1138936c5c34.png)

If you cannot reproduce the issue when **all** extensions are disabled, then can you narrow down the extension by selectively disabling extensions? You can disable extensions in the Extensions Viewlet and restart/reload.

![image](https://user-images.githubusercontent.com/172399/31659646-243280d4-b335-11e7-9980-8666a32dba52.png)

Once you found the extension, please file an issue against the extension. To file an issue against an extension open the Running Extensions editor by executing "<kbd>F1</kbd> > Developer: Show Running Extensions" and use the `Report Issue` button or find the extension in the marketplace, and use the `Issues` link in the `Resources` section.

<a name="profile-running-extensions"/>

### Profile the Running Extensions

You can create a CPU profile and share it in the issue with the extension author or us. To create a CPU profile:
- Close all instances of VSCode and start with `code --inspect-extensions=9993` or any other port number.
- Execute "<kbd>F1</kbd> > Developer: Show Running Extensions." This command opens an editor with all the running extensions.
- To start recording a profile click the run control in the editor's title bar:

![image](https://user-images.githubusercontent.com/172399/33882668-212c793c-df39-11e7-9844-6e2f4abf194f.png)
- Perform some steps in VS Code that expose the slowdown
- Stop the recording using the same control.
- Save the extension host profile:

![image](https://user-images.githubusercontent.com/172399/33882757-831a321a-df39-11e7-899e-032ab9174fab.png)
- Attach the profile to a Github issue.

To analyze the performance yourself:
- remove the trailing `.txt` suffix from the profile name.
- Toggle the developer tools `Help > Toggle Developer Tools`
- Open the JavaScript profiler as shown below:

<img width="380" alt="screen shot 2017-09-28 at 09 44 31" src="https://user-images.githubusercontent.com/1794099/30954796-d1be9e30-a431-11e7-959e-495d234c37c6.png">

- Load the profile using the `Load` button.

<a name="collect-information"/>

### Collect Information about the running VS Code

If you can reproduce the problem with extensions disabled, then use `code --status` from the command line. 

> Notice: this command requires that VS Code is already running

This command collects status about your running VS Code and the workspace you have opened. You can attach this information when reporting a performance issue.

![image](https://github.com/Microsoft/vscode-docs/blob/master/release-notes/images/1_19/status.png)

The output includes information about the environment, all running VS Code processes, and the counts of some typical files in the workspace.

<a name="renderer-process"/>

### The Renderer/Window process consumes a lot of CPU

![image](https://user-images.githubusercontent.com/172399/33888504-89fde40a-df4d-11e7-90f4-bff73c281ec8.png)

Try to reproduce the problem on different folders; a folder with less files, a folder that is not under source control, or open a single file.

Try to reproduce the issue in the VS Code **Insider** version. This will run our latest code and use a different setup (settings, extensions). You can install the insider version here https://code.visualstudio.com/insiders.

Run VS Code when your settings are reset/empty. Open your settings, copy your customizations and then empty the JSON contents so that only `{}` is left.

Run VS Code in verbose mode and check whether there is any suspicious output in the console or the developer tools. You start VS Code in verbose mode with `code --verbose`. Also, open the DevTools ("Help>Toggle Developer Tools") and open the console there.

#### Profiling the Renderer Process

Very detailed information is captured in CPU profiles and that helps us best to narrow down on a slow-down. So, please create a CPU profile of the VS Code core (_renderer_ process) and attach it to the issue. To create a profile:
  -  Execute "<kbd>F1</kbd> > Toggle Developer Tools." In the overflow menu of the developer tools 
<img width="380" alt="screen shot 2017-09-28 at 09 44 31" src="https://user-images.githubusercontent.com/1794099/30954796-d1be9e30-a431-11e7-959e-495d234c37c6.png">

  - Select 'More Tools > JavaScript Profiler'. In there select start.
  - Let it profile for 30 to 60 seconds, stop it.
  - When the performance issue happens on startup, start the profiler and then reload the window using "<kbd>F1</kbd> > Reload Window."
  - Save the profile to a file and attach the file to your issue.

<a name="shared-process"/>

### The Shared process consumes a lot of CPU

![shared-process](https://user-images.githubusercontent.com/10746682/132195495-50043d34-b0ee-4301-80fe-1011c0d8bb2a.png)

Try to reproduce the problem on different folders; a folder with less files, or open a single file or open an empty window,

Try to reproduce the issue in the VS Code **Insider** version. This will run our latest code and use a different setup (settings, extensions). You can install the insider version here https://code.visualstudio.com/insiders.

Run VS Code when your settings are reset/empty. Open your settings, copy your customizations and then empty the JSON contents so that only `{}` is left.

Run VS Code in verbose mode and check whether there is any suspicious output in the console or the developer tools. You start VS Code in verbose mode with `code --verbose`. Also, open the DevTools ("Help>Toggle Developer Tools") and open the console there.

#### Profiling the Shared Process

Very detailed information is captured in CPU profiles and that helps us best to narrow down on a slow-down. So, please create a CPU profile of the VS Code core (_shared_ process) and attach it to the issue. To create a profile:
  -  Execute "<kbd>F1</kbd> > Toggle Shared Process." In the overflow menu of the developer tools 
<img width="380" alt="screen shot 2017-09-28 at 09 44 31" src="https://user-images.githubusercontent.com/1794099/30954796-d1be9e30-a431-11e7-959e-495d234c37c6.png">

  - Select 'More Tools > JavaScript Profiler'. In there select start.
  - Let it profile for 30 to 60 seconds, stop it.
  - Save the profile to a file and attach the file to your issue.

<a name="sluggish-ui"/>

## Visual Studio Code is sluggish

If VS Code is slugging when scrolling, moving mouse or typing, please create a performance profile. Do the following
  - Toggle the developer tools Help > Toggle Developer Tools
  - Select 'Performance'. In there click the record button.
  - Scroll, type or any operation leads to the slowness of the UI
  - Let it profile for 30 to 60 seconds, stop it.
  - Save the profile to a file and attach the file to your issue.


<a name="slow-startup"/>

## Visual Studio Code starts up slowly

If VS Code is slow to start then please create a startup CPU profile. Do the following
  - Make sure to only have one window open
  - Quit VS Code (<kbd>CMD+Q</kbd> for Mac, closing the last window on Linux/Windows)
  - Start VS Code from the command line like so `code --prof-startup`
  - VS Code will start and create two profile-files in your home-directory. Please attach these files to your issue or create a new issue with these two files

<a name="startup-timer"/>

### Read the Startup Timers

When VS Code feels slow to start, you can check the startup timers. Hit <kbd>F1</kbd> and select "Startup Performance." This will open developer tools and print some startup stats onto the "Console."

![image](https://user-images.githubusercontent.com/172399/32089769-3df19924-baec-11e7-9654-e199e1ab8c92.png)

Please share these numbers with us as they often allows us to understand what is slow.
