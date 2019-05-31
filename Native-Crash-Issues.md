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
* download & install [Debug Diagnostic Tools for Windows](https://www.microsoft.com/en-us/download/details.aspx?id=58210) (pick the `DebugDiagx64.msi` option)
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

**Tip:** See https://felixrieseberg.com/debugging-electron-apps-on-windows/ for a good explanation for how to debug the produced `*.dmp` using Visual Studio

## Linux
On Linux we need to temporarily increase the limit for crash dumps. From a terminal:
* run `ulimit -c unlimited`
* then start code from the terminal
* wait for the crash
* watch for a file called `core` produced in the current working directory

With the core dump in hand we can use `gdb` to find out more about the crash:
* run `gdb <path to code binary> <path to core>`
* from the GDB session type `bt`
* attach the output, you should see a full stacktrace like the one in the image below:

![image](https://user-images.githubusercontent.com/900690/33883192-43ba0026-df3b-11e7-8ebc-e21f59058990.png)

## Read the Stacktrace
Once we have a stack trace of a crash we can user another tool for converting the cryptic messages into something useful. 

Let us consider a stack like this one:
```
0   libnode.dylib                 	0x000000010cfd7bf6 0x10cef5000 + 928758
1   libnode.dylib                 	0x000000010cfd3946 0x10cef5000 + 911686
2   libnode.dylib                 	0x000000010d122551 0x10cef5000 + 2282833
3   libnode.dylib                 	0x000000010d1ee24e 0x10cef5000 + 3117646
4   libnode.dylib                 	0x000000010d1ed76b 0x10cef5000 + 3114859
```

On *macOS* we can use [electron-atos](https://github.com/kevinsawicki/electron-atos) to print the actual stack trace:
* `npm install -g electron-atos`
* save the stack to a file e.g. `crash.txt`
* run `electron-atos --file /path/to/crash.txt --version 1.7.9`
* this will take some time but eventually print this:

```
node::EnvEnumerator(v8::PropertyCallbackInfo<v8::Array> const&) (in libnode.dylib) (node.cc:2849)
node::MakeCallback(node::Environment*, v8::Local<v8::Value>, v8::Local<v8::Function>, int, v8::Local<v8::Value>*) (in libnode.dylib) (node.cc:1225)
v8::Module::Evaluate(v8::Local<v8::Context>) (in libnode.dylib) (counters-inl.h:67)
v8::internal::Builtin_Impl_DataViewPrototypeSetFloat64(v8::internal::BuiltinArguments, v8::internal::Isolate*) (in libnode.dylib) (objects-inl.h:0)
v8::internal::Builtin_Impl_Stats_DataViewPrototypeSetFloat32(int, v8::internal::Object**, v8::internal::Isolate*) (in libnode.dylib) (builtins-dataview.cc:335)
```

**Note**: if the command shows an error, try to remove some lines from the stack trace. It can be picky about the format. 
