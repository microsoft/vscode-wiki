# Selfhosting on Windows/WSL

This guide is for you if you want to selfhost VS Code on **Windows** but have a fast compile toolchain by running it in WSL.
The drawback is that running VS Code from sources actually runs on **Linux** which is OK for most development tasks.

![image](https://user-images.githubusercontent.com/22350/77914929-f2a85380-7296-11ea-96ca-7a6988c17234.png)


## Setup

In Windows:

1. Install [WSL2](https://docs.microsoft.com/en-us/windows/wsl/wsl2-install) and [Ubuntu](https://www.microsoft.com/en-us/p/ubuntu/9nblggh4msv6?activetab=pivot:overviewtab).
2. Install [vcxsrv](https://sourceforge.net/projects/vcxsrv/), it will create a `XLaunch` shortcut in your Desktop`.
3. Download the `config.xlaunch` file from [this gist](https://gist.github.com/joaomoreno/90d3915379a862d99cd4f3e79feb0f8a) to your user home directory `C:\Users\USERNAME\`.
3. Hit <kbd>Win R</kbd> and type `shell:startup`, hit <kbd>Enter</kbd>. Add a shortcut here for `C:\Program Files\VcXsrv\xlaunch.exe`.
2. Right-click, Properties on that shortcut and change `Target` to `"C:\Program Files\VcXsrv\xlaunch.exe" -run C:\Users\USERNAME\config.xlaunch`. This will make the X server launch on startup. Double click it to make sure it launches.

In WSL:

1. Add the following to the end of your WSL `.bashrc` or equivalent:
  
  ```
  if [ -z $DISPLAY ]; then
    export DISPLAY="$(tail -1 /etc/resolv.conf | cut -d' ' -f2):0"
  fi
  ```

2. To test everything, open a new WSL shell and `sudo apt install x11-apps && xcalc`. You should see an XCalc window pop up. 👍 
  >  You may see errors like `Error: Can't open display: 172.20.192.1:0"`: open Windows Defender Firewall with Advanced Security, check inbound rules and make sure that VcXsrv windows server doesn't block private connections.
3. Install [build deps](https://github.com/microsoft/vscode/wiki/How-to-Contribute)

  ```
  sudo apt install python libsecret-1-dev libxss1 libx11-dev libxkbfile-dev libasound2 libgtk-3-0 libgdk-pixbuf2.0-0 libnss3 libxtst6 libxi6 libxdamage1 libxcursor1 libxcomposite1 libx11-xcb1
  ```
3. In Windows, install [VS Code Insiders for Windows](https://code.visualstudio.com/docs/?dv=win64user&build=insiders) and the [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) extension.
4. In VS Code, clone `vscode`, run `yarn`, start the build and run `./scripts/code.sh` to run dev.