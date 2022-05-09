The notebook editor is a virtualized list view rendered in two contexts (mainframe and webview/iframe). It's on top of the builtin list/tree view renderer but its experience is different from traditional list views like File Explorer and Settings Editor. Making the notebook cell list view work with good performance and smooth scrolling is not trivial, most of our improvements are tracked in the [doc](https://github.com/microsoft/vscode/blob/main/src/vs/workbench/contrib/notebook/browser/docs/notebook.layout.md). The following sections here can help you to report layout issues.

## Record flaky layout issue with Replay

Replay is an app/browser which can capture browser sessions, including DOM, user interactions and network events, and generate a recording which can be used for "time-travel" troubleshooting.

* Install Replay from replay.io and login
* Open insiders.vscode.dev in Replay
* Hit the record button from the top right toolbar
  <img width="1348" alt="replay recording" src="https://user-images.githubusercontent.com/876920/167472794-4f35f366-a6c4-4e3b-a808-dfdf308deae4.png">

* The website will refresh. Once it loads again, reproduce the bug, hit stop button from the top right toolbar
* Lastly, share the recording with us in your preferred way
  <img width="852" alt="image" src="https://user-images.githubusercontent.com/876920/167473038-08cb704b-3656-4ad0-8e38-d2c4985a04c7.png">

