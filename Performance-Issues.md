# Summary

This page documents how you can help us to track down performance issues:
- Collect information about the running VS Code
- Tracking down issues with extensions
- Tracking down issues in the main renderer/window process
- Tracking down slow startup issues

### Collect Information about the running VS Code

To help us understand your setup please run `code --status` while VS Code is running. This command collects status about your running VS Code and the workspace you have opened. You can attach this information when reporting a performance issue.

![image](https://raw.githubusercontent.com/Microsoft/vscode-docs/vnext/release-notes/images/1_19/status.png).

The output includes information about the environment, all running VS Code processes, and the counts of some typical files in the workspace.

### The Extension host process consumes a lot of CPU

![image](https://user-images.githubusercontent.com/172399/33882358-1b6a7590-df38-11e7-887c-1c6f1a0b0954.png)

When `code --status` shows a high percentage CPU usage of the extension host process then you can try to reproduce the problem with VS Code extensions disabled. You can start VS Code with extension disabled using the `--disable-extensions` command line argument, e.g., `code --disable-extensions`.

If you cannot reproduce the issue when the extensions are disabled, then can you narrow down the extension by selectively disabling extensions? You can disable extensions in the Extensions Viewlet and restart/reload.

![image](https://user-images.githubusercontent.com/172399/31659646-243280d4-b335-11e7-9980-8666a32dba52.png)

Once you found the extension please file an issue against the extension. To file an issue against an extension: find the extension in the market place, and use the `Issues` link in the Resources section.

You can also create a CPU profile and share it in the issue with us or the extension author. To create a CPU profile:
- Execute the `Developer: Show Running Extensions` Command. This command opens an editor with all the running extensions.
- To start recording a profile click the run control in the editor's title bar:

![image](https://user-images.githubusercontent.com/172399/33882668-212c793c-df39-11e7-9844-6e2f4abf194f.png)
- Perform some steps in VS Code that expose the slow down
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

### The Renderer/Window process consumes a lot of CPU

![image](https://user-images.githubusercontent.com/172399/33888504-89fde40a-df4d-11e7-90f4-bff73c281ec8.png)

Try to reproduce the problem on different folders; a folder with less files, a folder that is not under source control, or open a single file.

Try to reproduce the issue in the VS Code **Insider** version. This will run our latest code and use a different setup (settings, extensions). You can install the insider version here https://code.visualstudio.com/insiders.

Run VS Code when your settings are reset/empty. Open your settings, copy your customizations and then emtpy the JSON contents so that only `{}` is left.

Run VS Code in verbose mode and check whether there is any suspicious output in the console or the developer tools. You start VS Code in verbose mode with `code --verbose`. Also open the DevTools ("Help>Toggle Developer Tools") and open the console there.

When you cannot share the workspace exposing the problem with us, then you can help us by providing performance profiles that we can analyze:

Finally, please create a CPU profile of the VS Code core (_renderer_ process) and attach it to the issue. To create a profile:
  -  Execute "F1 > Toggle Developer Tools." In the overflow menu of the developer tools <img width="380" alt="screen shot 2017-09-28 at 09 44 31" src="https://user-images.githubusercontent.com/1794099/30954796-d1be9e30-a431-11e7-959e-495d234c37c6.png">
  - Select 'More Tools > JavaScript Profiler'. In there select start.
  - Let it profile for 30 to 60 seconds, stop it.
  - When the performance issue happens on startup, start the profiler and then reload the window using "F1>Reload Window."
  - Save the profile to a file and attach the file to your issue.

### Slow startup

If VS Code is slow to start then please create a startup CPU profile. Do the following
  - Make sure to only have one window open
  - Quit VS Code (Cmd+Q for Mac, closing the last window on Linux/Windows)
  - Start VS Code from the command line like so `code --prof-startup`
  - VS Code will start and create two profile-files in your home-directory. Please attach these files to your issue or create a new issue with these two files

#### Read Startup Timers

When VS Code feels slow to start you can check the startup timers. Hit "F1" and select "Startup Performance". This will open developer tools and print some startup stats onto the the "Console".

![image](https://user-images.githubusercontent.com/172399/32089769-3df19924-baec-11e7-9654-e199e1ab8c92.png)

Please share these numbers with us as they often allows us to understand what is slow.


