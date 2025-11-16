## Table of Contents
- [CPU profiling unresponsive window via tracing](#tracing-cpu-profiler)
- [Using samply on macOS](#samply-sampling-profiler)
- [Using samply on windows](#samply-sampling-profiler)
- [Using samply on linux](#samply-sampling-profiler)
- [Using etw on windows](#etw-windows-profiler)

<a name="tracing-cpu-profiler"/>

## CPU profiling unresponsive window via tracing

When a window (renderer process) is unresponsive the devtools might be unable to collect the required cpu profile. A reliable way to profile in such cases is with the tracing infra using the steps below,

* Restart VS Code with the following flags `--trace --trace-category-filter="renderer,blink,v8,disabled-by-default-v8.cpu_profiler"`
* Once the unresponsive dialog pop ups, click on the `Reopen` button
* In the new window, execute "<kbd>F1</kbd> > Developer: Stop Tracing"

This will generate a trace json file which can be loaded into any of the following clients that supports the [Google's Trace Event format](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/preview?tab=t.0#heading=h.yr4qxyxotyw)

1. chrome://tracing in any chromium browser
2. [ui.perfetto.dev](https://ui.perfetto.dev/)
3. [Firefox profiler](https://profiler.firefox.com/)

<a name="samply-sampling-profiler"/>

## Using samply on macOS

If you have an unsigned build of VSCode, then samply can be used to capture both JIT and native traces

* Download the latest release of https://github.com/mstange/samply/releases
* Start from the command line with following `samply.exe record -s -o profile.json.gz --browsers -- <path>/Visual\ Studio\ Code.app/Contents/MacOS/Electron --js-flags="--perf-basic-prof --perf-prof-unwinding-info --interpreted-frames-native-stack"`
* Perform the steps for unresponsiveness or slow startups etc
* Exit the application and the profile will be saved to `profile.json.gz`

You can inspect the profile with `samply.exe load --breakpad-symbol-dir <path> profile.json.gz`

## Using samply on windows

If you want to capture only application related cpu profile with both JIT and native traces

* Download the latest release of https://github.com/mstange/samply/releases
* Start from the command line with following `samply.exe record -s -o profile.json.gz --browsers -- <path>/Microsoft\ VS\ Code/Code.exe --js-flags="--enable-etw-stack-walking --interpreted-frames-native-stack"`
* Perform the steps for unresponsiveness or slow startups etc
* Exit the application and the profile will be saved to `profile.json.gz`

You can inspect the profile with `samply.exe load --breakpad-symbol-dir <path> profile.json.gz`

## Using samply on linux

* Download the latest release of https://github.com/mstange/samply/releases
* Start from the command line with following `samply.exe record -s -o profile.json.gz --browsers -- <path>/code --js-flags="--perf-basic-prof --perf-prof-unwinding-info --interpreted-frames-native-stack"`
* Perform the steps for unresponsiveness or slow startups etc
* Exit the application and the profile will be saved to `profile.json.gz`

You can inspect the profile with `samply.exe load --breakpad-symbol-dir <path> profile.json.gz`

<a name="etw-windows-profiler"/>

## Using etw on windows

* Open `Windows Performance Recorder` from System start menu, it is not installed by default. You can install it via [Windows Assessment and Deployment Kit](https://learn.microsoft.com/en-us/windows-hardware/get-started/adk-install) (ADK) and choose ` Windows Performance Toolkit`.
* Select the following options under `Resource Analysis`
   1) CPU Usage
   2) File I/O activity
   3) Registry I/O activity
   4) Pool usage
   5) VirtualAlloc usage
* Set `Performance Scenario` to `General`, `Detail level` to `verbose` and `Logging mode` to `file`
* Start the recorder
* Start the VSCode application from the terminal with the following additional flags `--js-flags="--enable-etw-stack-walking --interpreted-frames-native-stack"`
* Perform the actions that trigger the issue (slow startups, out of memory, unresponsive threads etc)
* Stop the recorder and save the file

The `.etl` file should **not** be attached to public issues since they contain PII and only shared via trusted channels.