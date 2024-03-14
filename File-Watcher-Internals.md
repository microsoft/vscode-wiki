### High Level

We have 2 different implementations for file watching:
- recursive: [`ParcelWatcher`](https://github.com/microsoft/vscode/blob/5bc9d1d7850cc9d88ea3fb117de70acba68579c6/src/vs/platform/files/node/watcher/parcel/parcelWatcher.ts#L61) via [`parcel-watcher`](https://github.com/parcel-bundler/watcher)
- non-recursive: [`NodeJSWatcherLibrary`](https://github.com/microsoft/vscode/blob/5bc9d1d7850cc9d88ea3fb117de70acba68579c6/src/vs/platform/files/node/watcher/nodejs/nodejsWatcherLib.ts#L21) via [`fs.watch`](https://nodejs.org/docs/latest/api/fs.html#fswatchfilename-options-listener)

### Event Correlation vs. Non-Correlation

Traditionally file events are not correlated: that means, any request to `IFileService.watch()` will contribute to the global `IFileService.onDidFilesChange` event reaching a lot of consumers.

To make file watching more efficient, event correlation was added: `IFileService.createWatcher()` is a new method that returns an emitter for events specific to the watch request. None of the events will end up on the global `IFileService.onDidFilesChange` event which helps to reduce compute need. Correlated file watcher have a unique identifier (`number`) to be able to distinguish them from others.

Today, correlated file watching is not yet being used in our product. We plan to use it for extensions that have complex file watching requests such as TypeScript.

### End to End Flow

#### `IFileService.watch()` / `IFileService.createWatcher()`

Requests for watching are deduplicated if the request is an identical match. That means, if each property of the watch request (path, recursive, includes, excludes, correlation identifier) is the same. 

This is done to avoid duplicate identical requests for file watching that are easy to identify.

The request to file watch is passed onto the `IFileSystemProvider` that matches the scheme of the resource path to watch.

#### `DiskFileSystemProvider.watch()`

Our `DiskFileSystemProvider` deals with all `file` resource schemes. We look if the request to watch is `recursive` or not and hand it off to [`ParcelWatcher`](https://github.com/microsoft/vscode/blob/5bc9d1d7850cc9d88ea3fb117de70acba68579c6/src/vs/platform/files/node/watcher/parcel/parcelWatcher.ts#L61) or [`NodeJSWatcherLibrary`](https://github.com/microsoft/vscode/blob/5bc9d1d7850cc9d88ea3fb117de70acba68579c6/src/vs/platform/files/node/watcher/nodejs/nodejsWatcherLib.ts#L21)

#### `ParcelWatcher` / `NodeJSWatcherLibrary`

We do support correlated and uncorrelated watch requests. A request is considered to be equal in correlation if the correlation identifier matches or if both requests are uncorrelated.

We do some deduplication of watch requests to avoid watching the same path twice:
- requests for same path and same correlation are ignored (last one wins)
- recursive requests for overlapping path and same correlation are ignored (shortest path wins)

Requests for non-existing paths are ignored unless the request is correlated. This was done to aid TypeScript extension to adopt our file watcher where this need exists. In that case we install a polling watcher on the path ([`fs.watchFile`](https://nodejs.org/docs/latest/api/fs.html#fswatchfilefilename-options-listener)) to figure out when it is added. Since this is potentially compute intense, we only do this for correlated watch requests for now, but may later decide to do it for all requests.

If a watched path gets deleted after being watched, the watcher maybe suspended and resumed when the path comes back, based on these rules:
- correlated watch requests support suspend / resume unconditionally (again, to support TypeScript)
- uncorrelated recursive watch requests try to resume watching by installing a listener on the parent path which can fail if the parent is deleted as well

#### `vscode.workspace.createFileSystemWatcher`

Extensions are able to create file watchers via the [`vscode.workspace.createFileSystemWatcher()`](https://github.com/microsoft/vscode/blob/5bc9d1d7850cc9d88ea3fb117de70acba68579c6/src/vscode-dts/vscode.d.ts#L13272) API. The behaviour of the file watcher depends on the options that are passed in.

Today, the stable API will only create uncorrelated file watchers and extensions cannot specify custom `exclude` rules. A [new proposed API](https://github.com/microsoft/vscode/blob/5bc9d1d7850cc9d88ea3fb117de70acba68579c6/src/vscode-dts/vscode.proposed.createFileSystemWatcher.d.ts#L49) is offered with support for custom `exclude` rules that will create correlated file watchers (https://github.com/microsoft/vscode/issues/169724).

If the `pattern` to watch is a `string` (and not [`RelativePattern`](https://github.com/microsoft/vscode/blob/5bc9d1d7850cc9d88ea3fb117de70acba68579c6/src/vscode-dts/vscode.d.ts#L2219)), we limit events to paths that are inside the workspace only. Any event for a path outside the workspace is ignored. Under the hood, we do not install any file watcher because we do workspace watching by default.

For when `RelativePattern` is used, patterns that include `**` or `/` are considered recursive watch requests if the path is a folder.

Correlated watch requests are pretty much handed off to the file service without further massaging, but uncorrelated recursive requests are massaged to reduce the impact on everyone that listens to `IFileService.onDidFilesChange`. These get their `exclude` rules configured based on the `files.watcherExclude` setting. As such, an extension that uses uncorrelated recursive file watching is at the mercy of how `files.watcherExclude` is configured. For that reason, the new proposed API was added.


<details>
  <summary>Raw File Watcher Internals</summary>
  
**`node.js / parcel watcher library`**
- requests for non existing paths are ignored unless correlated
- requests for same path and same correlation (including `undefined`) are ignored (last one wins)
- recursive requests for overlapping path and same correlation are ignored (shortest path wins)
- requests for a path that gets deleted later maybe rewatched
  - correlated requests get rewatched via `fs.watchFile`
  - uncorrelated recursive requests get rewatched by `fs.watch` on the parent path if exists

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

