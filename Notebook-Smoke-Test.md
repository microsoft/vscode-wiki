## Manual Smoke Test

### Prereqs

* Clone the [notebook extensions repository](https://github.com/microsoft/notebook-extension-samples)
  * `git clone https://github.com/microsoft/notebook-extension-samples`
  * `yarn && yarn run install && yarn run build`
* Run Insiders with specifying `notebook-extension-samples` as the extension directory (or you can symlink the folders)
  * `code-insiders --extensions-dir notebook-extension-samples`
* Clone the notebook test repository
  * `git clone https://github.com/microsoft/vscode-notebook-testdata`
  * Open the folder in OSS  

### File opening & rendering

One major goal of native notebook experience in VS Code is performance: file opening, scrolling and editing should be as performant as a normal text editor. Please test the code change doesn't regress the performance

* Open `samples/runCode.ipynb`, make sure markdown cell and code cells are rendered properly.
  * Scrolling in the editor is smooth, no significant noticeable lag.
* Open `samples/runCode50.ipynb`. This file contains 600 code cells and 1300 markdown cells, but opening this file should be fast too.
  * Test scrolling with scrollbar, try to scroll to the middle or the bottom of the document.
  * Please check all outputs are rendered properly

### Output rendering

Outputs are rendered under code cells. When an output is secure and simple, like text, png, we will render them in the core. If it's insecure, like html/javascript, we will render them in a webview.

* Open `samples/mimetypes.ipynb`
  * Make sure all outputs are rendered as expected
* Open `samples/runCode_iframe_form_15.ipynb`, test iframes and forms are rendered properly and they are interactive
  * Scroll the document to the bottom, scroll back and check if the iframe is still running

### Editing

Open `runCode.ipynb`

* Hover on a cell, and click the gear icon on the left, test commands in the context menu works as expected
  * Inserting a cell should focus the newly added cell (focus should be inside the nested monaco editor)
  * After modifying the cells, the file should be a dirty state
* Cmd+S to save the document, the document should be persisted on disk and please check if the changes are correct.

### Execution

* Open `test/ipywidgets.test.ipynb`, focus in the editor, click `Execute Notebook` actions on the editor toolbar
  * Check if the outputs are rendered properly