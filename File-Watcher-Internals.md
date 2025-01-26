### High Level

We have 2 different implementations for file watching file and folder paths:
- recursive: [`ParcelWatcher`](https://github.com/microsoft/vscode/blob/5bc9d1d7850cc9d88ea3fb117de70acba68579c6/src/vs/platform/files/node/watcher/parcel/parcelWatcher.ts#L61) via [`parcel-watcher`](https://github.com/parcel-bundler/watcher)
- non-recursive: [`NodeJSWatcherLibrary`](https://github.com/microsoft/vscode/blob/5bc9d1d7850cc9d88ea3fb117de70acba68579c6/src/vs/platform/files/node/watcher/nodejs/nodejsWatcherLib.ts#L21) via [`fs.watch`](https://nodejs.org/docs/latest/api/fs.html#fswatchfilename-options-listener)

### Update Sep-2024
⚠️ event correlation is disabled again for TS extension given instability in parcel watcher. This document is still valid, but assume that **all watching is uncorrelated**!

### Event Correlation vs. Non-Correlation
Traditionally file events are not correlated: that means, any request to `IFileService.watch()` will contribute to the global `IFileService.onDidFilesChange` event reaching a lot of consumers, including extensions.

To make file watching more efficient, event correlation was added: `IFileService.createWatcher()` is a new method that returns an emitter for events specific to the watch request. None of the events will end up on the global `IFileService.onDidFilesChange` event which helps to reduce compute need. Correlated file watcher have a unique identifier (`number`) to be able to distinguish them from others.

Today, correlated file watching is not yet being used in our product. We plan to use it for extensions that have complex file watching requests such as TypeScript.

### End to End Flow

#### `IFileService.watch()` / `IFileService.createWatcher()`

Requests for watching are deduplicated if the request is an identical match. That means, if each property of the watch request (path, recursive, includes, excludes, correlation identifier, filter) is the same. 

This is done to avoid duplicate identical requests for file watching that are easy to identify.

The request to file watch is passed onto the `IFileSystemProvider` that matches the scheme of the resource path to watch.

#### `DiskFileSystemProvider.watch()`

Our `DiskFileSystemProvider` deals with all `file` resource schemes and runs from the Electron main process. Since file watching is compute intense, we leverage `UtilityProcess` to host the file watchers in a separate process.

We look if the request to watch is `recursive` or not and hand it off to [`ParcelWatcher`](https://github.com/microsoft/vscode/blob/5bc9d1d7850cc9d88ea3fb117de70acba68579c6/src/vs/platform/files/node/watcher/parcel/parcelWatcher.ts#L61) or [`NodeJSWatcherLibrary`](https://github.com/microsoft/vscode/blob/5bc9d1d7850cc9d88ea3fb117de70acba68579c6/src/vs/platform/files/node/watcher/nodejs/nodejsWatcherLib.ts#L21)

#### `ParcelWatcher` / `NodeJSWatcherLibrary`

We do support correlated and uncorrelated watch requests. A request is considered to be equal in correlation if the correlation identifier matches or if both requests are uncorrelated.

We do some deduplication of watch requests to avoid watching the same path twice:
- requests for same path and same correlation are ignored (last one wins)
- recursive requests for overlapping path and same correlation are ignored (shortest path wins)
- requests for watching files try to reuse an existing recursive watcher

If a watched path either does not exist in the beginning or gets deleted after being watched, the watcher is suspended and resumed when the path comes back. Watcher suspend/resume is implemented with two strategies:
- if the path is already watched by a recursive watcher, reuse that watcher
- otherwise install a polling watcher on the path ([`fs.watchFile`](https://nodejs.org/docs/latest/api/fs.html#fswatchfilefilename-options-listener)) with a delay of `5s`

#### `vscode.workspace.createFileSystemWatcher`

Extensions are able to create file watchers via the [`vscode.workspace.createFileSystemWatcher()`](https://github.com/microsoft/vscode/blob/5bc9d1d7850cc9d88ea3fb117de70acba68579c6/src/vscode-dts/vscode.d.ts#L13272) API. The behaviour of the file watcher depends on the options that are passed in.

Today, the stable API will only create uncorrelated file watchers and extensions cannot specify custom `exclude` rules. A [new proposed API](https://github.com/microsoft/vscode/blob/5bc9d1d7850cc9d88ea3fb117de70acba68579c6/src/vscode-dts/vscode.proposed.createFileSystemWatcher.d.ts#L49) is offered with support for custom `exclude` rules that will create correlated file watchers (https://github.com/microsoft/vscode/issues/169724).

If the `pattern` to watch is a `string` (and not [`RelativePattern`](https://github.com/microsoft/vscode/blob/5bc9d1d7850cc9d88ea3fb117de70acba68579c6/src/vscode-dts/vscode.d.ts#L2219)), we limit events to paths that are inside the workspace only. Any event for a path outside the workspace is ignored. Under the hood, we do not install any file watcher because we do workspace watching by default.

For when `RelativePattern` is used, patterns that include `**` or `/` are considered recursive watch requests if the path is a folder.

Correlated watch requests are pretty much handed off to the file service without further massaging, but uncorrelated recursive requests are massaged to reduce the impact on everyone that listens to `IFileService.onDidFilesChange`. These get their `exclude` rules configured based on the `files.watcherExclude` setting. As such, an extension that uses uncorrelated recursive file watching is at the mercy of how `files.watcherExclude` is configured. For that reason, the new proposed API was added.

Correlated watch requests set the `filter` property to indicate which file change type to consider. This can be done because the API allows an extensions to declare which file change type to consider. By default, all file change types will be considered. We only apply the `filter` for correlated watch requests because uncorrelated requests are potentially shared across multiple requests.

<details>
  <summary>Raw File Watcher Internals</summary>
  

**`node.js / parcel watcher library`**
- requests for non existing paths are ignored unless correlated
- requests for same path and same correlation (including `undefined`) are ignored (last one wins)
- recursive requests for overlapping path and same correlation are ignored (shortest path wins)
- non-recursive requests for files try to reuse an existing recursive watcher
- requests for a path that gets deleted later maybe rewatched by reusing an existing recursive watcher or via `fs.watchFile`

**`DiskFileSystemProvider`**
- every request to `watch` is passed through and not deduplicated in any way

**`IFileService`**
- requests that are identical (`resource` and `options`) are deduplicated
- uncorrelated watch requests emit globally via `onDidFilesChange`
- correlated watch requests emit only to the one that requested the watch

**`createFileSystemWatcher`**
- correlates if new proposed API is used that allows to pass in `excludes`
- if pattern is a `string` we assume workspace watch mode
  - any "out of workspace" events are ignored
  - no request to watch is sent to the file service assuming the workspace is already watched
- patterns with a `**` or `/` are treated as recursive watch requests if the path is a folder, otherwise non-recursive
- correlated watch requests
  - get to match on events from same correlation identifier
- uncorrelated watch requests 
  - get to match on events from all other uncorrelated watchers
  - `exclude` rules are automatically added from `files.watcherExclude` setting to recursive watch requests
  - `include` rules will be computed for non-recursive watchers that are inside the workspace to match on configured `exclude` rules as a way to prevent duplicate events from non-recursive and recursive watchers inside the workspace
    - if no `exclude` rules are configured, the non-recursive watcher is ignored
</details>

