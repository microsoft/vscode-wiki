# Code Organization

Code consists a layered and modular `core` that can be extended using extensions. Extensions are run in a separate process refered to as the
`extension host.` Extensions are implemented using extension API that is described in the [extension documentation](https://code.visualstudio.com/docs/extensions/overview).

# Layers

The `core` is partitioned into the following layers:
- `base`: Provides general utilities and user interface building blocks
- `platform`: Defines service injection support and the base services for Code. The service injection support is described here.
- `editor`: The "Monaco" editor is available as a separate downloadable component.
- `languages`: For historical reasons, not all languages are provided as extensions, yet. As Code evolve we will migrate more languages to towards extensions.
- `workbench`: Hosts the "Monaco" editor provides the framework for so called "viewlets" like the Explorer, Status Bar, or Menu Bar. The workbench leverages Electron to implement the Code desktop application.

# Target Environments
The `core` of Code is fully implemented in TypeScript. Inside each layer the code is organized by the target run-time environment. This allows us to ensure that only the run-time specific APIs are used. In the code we distinguish between the following target environment:
- `browser`: Source code that requires the `browser` APIs like access to the DOM
- `node`: Source code that requires `nodejs` APIs.
- `electron`: Source code that requires the `electron` APIs.
- `common`: Source code that only requires basic JavaScript APIs and run in all the other target environments.