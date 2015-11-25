# Code Organization

Code consists a layered and modular `core` that can be extended using extensions. Extensions are run in a separate process refered to as the
`extension host.` Extensions are implemented using extension API that is described in the [extension documentation](https://code.visualstudio.com/docs/extensions/overview).

# Layers

The `core` is partitioned into the following layers:
- `base`: Provides general utilities and user interface building blocks
- `platform`: Defines service injection support and the base services for Code
- `editor`: The "Monaco" editor is available as a separate downloadable component
- `languages`: For historical reasons, not all languages are implemented as extensions (yet) - as Code evolves we will migrate more languages to towards extensions
- `workbench`: Hosts the "Monaco" editor and provides the framework for "viewlets" like the Explorer, Status Bar, or Menu Bar, leveraging [Electron](http://electron.atom.io/) to implement the Code desktop application.

# Target Environments
The `core` of Code is fully implemented in [TypeScript](https://github.com/microsoft/typescript). Inside each layer the code is organized by the target runtime environment. This ensures that only the runtime specific APIs are used. In the code we distinguish between the following target environments:
- `common`: Source code that only requires basic JavaScript APIs and run in all the other target environments
- `browser`: Source code that requires the `browser` APIs like access to the DOM
   - inherits: `common`
- `node`: Source code that requires [`nodejs`](https://nodejs.org) APIs
   - inherits: `common`
- `electron-browser`: Source code that requires the [Electron renderer-process](https://github.com/atom/electron/tree/master/docs#modules-for-the-renderer-process-web-page) APIs
   - inherits: `common`, `browser`, `node`
- `electron-main`: Source code that requires the [Electron main-process](https://github.com/atom/electron/tree/master/docs#modules-for-the-main-process) APIs
   - inherits: `common`, `node`