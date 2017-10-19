This page contains a set of questions, experiments, and measurements that can be useful in issues mentioning a performance issue. 

The contents below is verbatim so that you can copy & paste the applicable sections to the issue. 

For a preview of the contents see this [issue](https://github.com/Microsoft/vscode/issues/36542).

```

### Questions
To help us narrow down the issue please include answers for the following questions:
- What is the size of your workspace/project (how many files)? 
- What languages are used in this project?
- Do you run Code on a single-CPU environment (e.g. VM)? We know that processes can go crazy and startup times can be super slow.

### Experiments
- Can you reproduce the issue when you start VS Code with extensions disabled? You can start VS Code with extension disabled using the `--disable-extensions` command line argument, e.g., `code --disable-extensions`. 

- If you cannot reproduce the issue when the extensions are disabled, then can you narrow down the extension by selectively disabling extensions? You can disable extensions in the Extensions Viewlet ![image](https://user-images.githubusercontent.com/172399/31659646-243280d4-b335-11e7-9980-8666a32dba52.png) and restart/reload. Once you found the extension please file an issue against the extension. To file an issue against an extension: find the issue in the market place, select the `Issues` link thin the Resources section.

- Try to reproduce the problem on different folders; a folder with less files, a folder that is not under source control, or open a single file?

- Try to reproduce the issue in the VS Code **Insider** version. This will run our latest code and use a different setup (settings, extensions). You can install the insider version here https://code.visualstudio.com/insiders.

- Run VS Code when your settings are reset/empty. Open your settings, copy your customizations and then emtpy the JSON contents so that only `{}` is left.

- Run VS Code in verbose mode and check whether there is any suspicious output in the console or the developer tools. You start VS Code in verbose mode with `code --verbose`. Also open the DevTools ("Help>Toggle Developer Tools") and open the console there.

### Measurements

- If VS Code feels not responsive then please create a CPU profile of the VS Code core (_renderer_ process) and attach it to the issue. To create a profile:
  -  Execute "F1 > Toggle Developer Tools." In the overflow menu of the developer tools <img width="380" alt="screen shot 2017-09-28 at 09 44 31" src="https://user-images.githubusercontent.com/1794099/30954796-d1be9e30-a431-11e7-959e-495d234c37c6.png">
  - Select 'More Tools > JavaScript Profiler'. In there select start.
  - Let it profile for 30 to 60 seconds, stop it.
  - When the performance issue happens on startup, start the profiler and then reload the window using "F1>Reload Window."
  - Save the profile to a file and attach the file to your issue. 

- If VS Code feels not responsive and the CPU profile doesn't provide insights then please a create a CPU profile of the extension host process. The extension host process is the process that executes your installed extensions. To create a profile:
  - Start VS Code from the command line the with `--inspect-extensions=<port>`-flag, for example `code --inspect-extensions=9333`.
  - In VS Code, from the 'Command Palette (F1)', select 'Developer: Toggle Developer Tools', hit Enter.
  - Select the Console tab and find a message that starts with "Debugger listening on port 9333" and that ends with a chrome-devtools-link.
  - Open that link in Chrome for dedicated DevTools for the extension host.
  - Use the Memory and CPU profiler to understand how memory and compute resource are being used.
  - Save the profile to a file and attach the file to your issue. 

- If a VS Code process consumes a lot of resources we need to identify the process based on the command line arguments that were used to start the process. On Mac, the **Activity Monitor** allows to find the `PID` of the process and from a terminal you can run `ps aux | grep <pid>` reveals its arguments. 
![image](https://cloud.githubusercontent.com/assets/900690/18907063/65806550-856a-11e6-8b2e-83da9111445d.png)
On Windows open the Task Manager, switch to the Details tab and make the "Command Line" column visible as shown below. Please attach the command line to this issue.
![image](https://user-images.githubusercontent.com/172399/31660413-9fac1f02-b337-11e7-96fb-859c659b28f9.png)
```
