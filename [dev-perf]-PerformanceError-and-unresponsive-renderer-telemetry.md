## Automatic renderer profiling

The renderer process is monitored for "hangs" and when those occur automatic profiling is started. It works as follows

* after startup a performance baseline is computed (on fast machines this is fine-tuned to be roughly one frame at 64fps, 15ms)
* when a [long task](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming) that is 10x of the baseline is reported, automatic renderer profiling is started (for 5secs)
* the profile is analysed and interesting call-stacks are reported as normal- and error-telemetry


#### Dealing with `PerfSampleError` error

As mentioned above, hangs are reported as normal- and error-telemetry. When the a certain error event is reported many times it shows up on our error triage page. The error shows a synthetic stacktrace which is the callstack that the profiler saw most often. The top is the slow function and the calls is how it was called. 

If the error telemetry isn't sufficient you can dig into telemetry. Use the query below but make sure use the right version of VSCode and filter for the name of your function. _Note_ that only stable versions of VS Code yield usable results. That is because insiders generates too little data. The query will show how many machines were affected and what the average hang-time was. 

```js
RawEventsVSCode
| where EventName == "monacoworkbench/unresponsive.sample"
| where ApplicationVersion == "1.76.2" // REPLACE with stable version of vscode
| extend source = tostring(Properties.source)
| where source == '<<renderer>>'
| extend Baseline = toint(Measures.perfbaseline)
| extend TotalTime = toint(Measures.selftime)
| where TotalTime > 2 * Baseline
| extend Fn = tostring(Properties.functionname)
| where Fn == 'focus' // REPLACE with name of the function you want
| extend Callers = tostring(Properties.callers)
| summarize dcount(VSCodeMachineId), avg(TotalTime) by Fn, Callers
| sort by dcount_VSCodeMachineId

```