# Synopsis

For quite some time, VSCode only provided an editor for textual edits on files or virtual documents. All logic for how to save, revert, backup these text models was not made for reuse. We then added other editor capabilities, such as custom editors and notebooks and felt the need for a unified API to deal with edits to documents: working copies. The goal was to have the same editing experience in these new editors that users got used to when editing text files.

## Working Copy

The API shape of a working copy provides the minimal structure for participating as an editable "thing" in the workbench. In most cases the user would edit it using an editor. If you build a new component that allows for editing, you can introduce your working copy into the workbench to benefit from:
* unified (auto)save/revert handling
* backups ("hot-exit")
* dirty tracking

The fundamental pieces of a working copy are:
* `capabilities`: to tell if a working copy is untitled or not (e.g. untitled working copies are never auto saved)
* events (`onDidChangeDirty`, `onDidChangeContent`, `onDidSave`): to provide dirty tracking and backup support
* methods (`backup`, `save`, `revert`): to actually provide the necessary implementation for the workbench to call on

## Lifecycle