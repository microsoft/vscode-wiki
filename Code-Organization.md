# Code Organization

Code consists a layered and modular `core` that can be extended using extensions. Extensions are run in a seperate process refered to as the
`extension host.` Extensions are implemented using extension API that is described in the extension documentation <<<link>>>.

# Layers

The `core` is partitioned into the following layers:
- **base** - the base provides general utilities and user interface building blocks
- **platform** - the platform defines service injection support and the base services for Code. The service injection support is described here <<<TBD>>>
- **editor** - the Monaco code editor. The editor is available as a separate downloadable component.
- **languages** - for historical reasons not all languages are provided as extensions, yet. As Code evolve we migrate more languages to towards extensions.
- **workbench** - the workbench that hosts the monaco editor provides the framework for so called viewlets like the explorer, status bar
or menu bar. The workbench leverages Electron to implement the Code desktop application.

# Target Environments
The `core` of Code is fully implemented in TypeScript. Inside each layer the code is organized by the target run-time environment. This allows us to ensure that only the run-time specific APIs are used. In the code we distinguish between the following target environment:
- **browser** - source code that requires the **browser** APIs like access to the DOM.
- **node** - source code that requires **nodejs** APIs.
- **electron** - source code that requires the **electron** APIs.
- **common** - source code that only requires basic JavaScript APIs and run in all the other target environments.