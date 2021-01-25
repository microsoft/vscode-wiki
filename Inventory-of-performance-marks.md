We use `perf.mark` (`vs/base/common/performance`) and `performance.mark` (browser-native) to name certain moments in VS Code's startup timeline. The following is an inventory of these marks:


| name  | context  | description  |
|---|---|---|
| `code/timeOrigin` | electron-main, electron-renderer, browser-renderer, webworker, nodejs | Marks the origin, usually the same value as the native [timeOrigin](https://developer.mozilla.org/en-US/docs/Web/API/Performance/timeOrigin) property. Is polyfilled in safari and _not available_ in safari web workers |
| `code/didStartMain` | electron-main | Marks the start of the _electron_ main process. |
| `code/mainAppReady` | electron-main | Marks the receiving of the `appReady` event from _electron_. |
| `code/willLoadMainBundle` | electron-main | Marks the point before loading the main bundle of the main process. |
| `code/didLoadMainBundle` | electron-main | Marks the point after loading the main bundle of the main process. |
| `code/willOpenNewWindow` | electron-main | Marks the point at which a new renderer/browser window is being created. This event occurs repeatedly. |
| `code/didStartRenderer` | browser-renderer, electron-renderer | Marks the start of the renderer. Should be set by embedders. |
| `code/willShowPartsSplash` | electron-renderer | Marks the point before the in-place-splash screen (rapid render) is being created |
| `code/didShowPartsSplash` | electron-renderer | Marks the point at which the in-place-splash screen (rapid render) is showing |
| `code/willLoadWorkbenchMain` | electron-renderer, browser-renderer | Marks the point before loading the main bundle of the renderer. |
| `code/didLoadWorkbenchMain` | electron-renderer, browser-renderer | Marks the point after loading the main bundle of the renderer. |
| `code/willWaitForShellEnv` | electron-renderer | Marks the start of resolving the shell environment (obsolete soon #108804) |
| `code/didWaitForShellEnv` | electron-renderer | Marks the end of resolving the shell environment (obsolete soon #108804) |
| `code/willInitWorkspaceService` | electron-renderer | Marks the start of resolving the workspace and associated configuration (blocking) |
| `code/didInitWorkspaceService` | electron-renderer | Marks the end of resolving the workspace and associated configuration (blocking) |
| `code/willInitWorkspaceStorage` | electron-renderer | Marks the start of resolving the UI state storage (blocking) |
| `code/didInitWorkspaceStorage` | electron-renderer | Marks the end of resolving the UI state storage (blocking) |
| `code/willStartWorkbench` | electron-renderer | Marks the beginning of creating and restoring the workbench and services |
| `code/LifecyclePhase/<phase>` | electron-renderer, browser-renderer | Marks the workbench lifecycle phase, potential values for `<phase>` are starting, ready, restored, and eventually |
| `code/willRestoreEditors` | electron-renderer, browser-renderer | Marks the point before creating/restoring editors. |
| `code/willRestoreViewlet` | electron-renderer, browser-renderer | Marks the point before creating the viewlet. Note that this is just creation, not population. |
| `code/willRestorePanel` | electron-renderer, browser-renderer | Marks the point before creating the bottom panel. |
| `code/didRestoreViewlet` | electron-renderer, browser-renderer | Marks the point after creating the viewlet. |
| `code/didRestorePanel` | electron-renderer, browser-renderer | Marks the point after creating the bottom panel. |
| `code/didRestoreEditors` | electron-renderer, browser-renderer | Marks the point after creating/restoring editors. |
| `code/didStartWorkbench` | renderer | Marks the end of creating and restoring the workbench and services |
| `code/didRemovePartsSplash` | electron-renderer, browser-renderer | Marks the point at which the in-place-spash screen (rapid render) is removed |
| `code/willLoadExtensions` | electron-renderer, browser-renderer | Marks the point before starting extension hosts and discovering registered extensions |
| `code/willHandleExtensionPoints` | electron-renderer, browser-renderer | Marks the point before processing package.json-data from extensions |
| `code/didHandleExtensionPoints` | electron-renderer, browser-renderer | Marks the point after processing package.json-data from extensions |
| `code/didLoadExtensions` | electron-renderer, browser-renderer |  Marks the point after starting extension hosts and discovering registered extensions |
| `code/registerFilesystem/<scheme>` | electron-renderer, browser-renderer, electron-main | Marks the point at which a file system has been registered. The last segment of the name is the scheme of the file system |
| `code/fork/start` | nodejs | Marks the point when JS execution begins on the extension host process |
| `code/fork/willLoadCode` | nodejs | Marks the point when AMD code loading begins on the extension host process |
| `code/extHost/willConnectToRenderer` | nodejs, webworker | Marks the point when the extension host code is loaded and executing |
| `code/extHost/didConnectToRenderer` | nodejs | Marks the point when a socket was established to the renderer process |
| `code/extHost/didWaitForInitData` | nodejs, webworker | Marks the point when the extension host init data was received |
| `code/extHost/didCreateServices` | nodejs, webworker | Marks the point when services are created |
| `code/extHost/willWaitForConfig` | nodejs, webworker | Marks the point when waiting begins for the configuration options to be sent by renderer |
| `code/extHost/didWaitForConfig` | nodejs, webworker | Marks the point when the configuration options were received from the renderer |
| `code/extHost/didInitAPI` | nodejs, webworker | Marks the point when require('vscode') is up and running |
| `code/extHost/didInitProxyResolver` | nodejs | Marks the point when proxy settings have been configured |
| `code/extHost/willResolveAuthority/<authorityPrefix>` | nodejs | Marks the point when a resolver will be invoked |
| `code/extHost/didResolveAuthorityOK/<authorityPrefix>` | nodejs | Marks the point when a resolver has resolved OK |
| `code/extHost/didResolveAuthorityError/<authorityPrefix>` | nodejs | Marks the point when a resolver has resolved with an error |
| `code/extHost/ready` | nodejs, webworker | Marks the point when the extension host process is ready to generally load extensions |
| `code/extHost/willFetchExtensionCode/<extId>` | webworker | Marks the point when the code for an extension will be fetched |
| `code/extHost/didFetchExtensionCode/<extId>` | webworker | Marks the point when the code for an extension has been fetched |
| `code/extHost/willLoadExtensionCode/<extId>` | nodejs, webworker | Marks the point when the code for an extension will be executed |
| `code/extHost/didLoadExtensionCode/<extId>` | nodejs, webworker | Marks the point when the code for an extension has been executed |
| `code/extHost/willActivateExtension/<extId>` | nodejs, webworker | Marks the point when `activate()` will be called for an extension |
| `code/extHost/didActivateExtension/<extId>` | nodejs, webworker | Marks the point when `activate()` has resolved for an extension |
| `code/server/start` | nodejs | Marks the start of the server process |
| `code/server/started` | nodejs | Marks the point when the server is listening for incoming connections at the configured port / domain socket |
| `code/server/codeLoaded` | nodejs | Marks the point when the server code is loaded |
| `code/server/ready` | nodejs | Marks the point when the server is fully initialized |
| `code/server/firstRequest` | nodejs | Marks the point when the server receives a first request |
| `code/server/firstWebSocket` | nodejs | Marks the point when the server receives a first WebSocket |
