## Table of Contents
- [CPU profiling unresponsive window via tracing](#tracing-cpu-profiler)

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
