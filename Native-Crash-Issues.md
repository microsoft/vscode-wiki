# Summary

This page documents how you can help us to track down native crash issues. It contains:
- How to get at the native crash information so that you can share it with us

The solutions are split across each operating system we support.

## macOS
On macOS, application crashes can easily be looked at from the Console application.
* open Console application
* click on User Reports
* find the crash from Code
* attach it here

It should look something like this:

![image](https://cloud.githubusercontent.com/assets/900690/24793769/89c9ef12-1b83-11e7-83b6-b7e1bfafab1a.png)

## Windows
On Windows, you will need to install a program in order to collect more information when a crash occurs.
* download & install [Debug Diagnostic Tools for Windows](https://www.microsoft.com/en-us/download/details.aspx?id=49924) (pick the `DebugDiagx64.msi` option)
* run `DebugDiag 2 Collection`
* select to capture crash dumps:

![image](https://user-images.githubusercontent.com/900690/33835293-492352f2-de86-11e7-91cf-73cca332610d.png)
* pick a specific process:

![image](https://user-images.githubusercontent.com/900690/33835320-62e52012-de86-11e7-88aa-08298ff3fa00.png)
* pick the first `Code.exe` process (or `Code - Insiders.exe` if you are on insiders).

![image](https://user-images.githubusercontent.com/900690/33835702-9b6766ce-de87-11e7-8822-9e4d1bcaa87e.png)
* finish the wizard by stepping through without changing any option but note the directory that is picked to store dumps
* wait until the crash happens
* check for the contents of the crash folder (e.g. `C:\Program Files\DebugDiag\Logs\Crash rule for all instances of Code.exe`)
* if the crash was recorded you should see a very large file (`*.dmp`) and a `*_log.txt` file with the same process ID
* attach the smaller `*_log.txt` file

## Linux
Please check the contents of `/var/crash` for crash dumps. 