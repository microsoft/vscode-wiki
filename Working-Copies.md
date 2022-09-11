# Synopsis

For quite some time, VSCode only provided an editor for textual edits on files or virtual documents. All logic for how to save, revert, backup these text models was not made for reuse. We then added other editor capabilities, such as custom editors and notebooks and felt the need for a unified API to deal with edits to documents: working copies. The goal was to have the same editing experience in these new editors that users got used to when editing text files.

## Working Copy

The API shape ([`IWorkingCopy`](https://github.com/microsoft/vscode/blob/835ace5796cec0ed19a7eec119b26b57220b0f1a/src/vs/workbench/services/workingCopy/common/workingCopy.ts#L120)) of a working copy provides the minimal structure for participating as an editable "thing" in the workbench. In most cases the user would edit it using an editor. If you build a new component that allows for editing, you can introduce your working copy into the workbench to benefit from:
* unified (auto)save/revert handling
* backups ("hot-exit")
* dirty tracking

The fundamental pieces of a working copy are:
* `resource`: to identify the working copy among others
* `typeId`: to tell apart your working copy from others with the same resource 
* `capabilities`: to tell if a working copy is untitled or not (e.g. untitled working copies are never auto saved)
* events (`onDidChangeDirty`, `onDidChangeContent`, `onDidSave`): to provide dirty tracking and backup support
* methods (`backup`, `save`, `revert`): to actually provide the necessary implementation for the workbench to call on

**Note:** you will likely already have a model in your component that can map directly onto the working copy shape. For example, the [`ITextFileModel`](https://github.com/microsoft/vscode/blob/835ace5796cec0ed19a7eec119b26b57220b0f1a/src/vs/workbench/services/textfile/common/textfiles.ts#L482) that is used for every textual edit in files implements `IWorkingCopy` so that essentially the text file model IS the working copy that gets registered.

### Lifecycle
As soon as your working copy comes to existence, call [`IWorkingCopyService.registerWorkingCopy`](https://github.com/microsoft/vscode/blob/835ace5796cec0ed19a7eec119b26b57220b0f1a/src/vs/workbench/services/workingCopy/common/workingCopyService.ts#L104). From that moment on, the workbench will observe the working copy for changes using its events. 

As soon as your working copy becomes void, dispose the registration again!

**Note:** it is an error to register the same working copy more than once. The combination of `resource` and `typeId` is used for comparing working copies with each other.

### Providing Backups
As soon as the working copy reports a content change, the workbench will call the `backup` method to store a backup of the unsaved state in the backup location. You can:
* provide the `content` to backup as raw buffer
* provide some `meta` information as object associated with the backup

**Note:** backups are automatically deleted once the working copy is saved and no longer reports as dirty.

### Restoring Backups
The workbench is not in charge of resolving your working copy, it is up to you as provider. In order to restore potential backups that might be present from a previous session, you have to use [`IWorkingCopyBackupService.resolve`](https://github.com/microsoft/vscode/blob/835ace5796cec0ed19a7eec119b26b57220b0f1a/src/vs/workbench/services/workingCopy/common/workingCopyBackup.ts#L64) with the identifier (`resource` and `typeId`) and set the contents of the working copy to that when resolving. In addition, you should mark your working copy as dirty.

### Save/Revert
The contract of these methods is that after the operation succeeded, the working copy is no longer dirty. In addition, the `onDidSave` and `onDidChangeDirty` should have fired.

### Working Copy Editor Associations
In most ways, working copies are editor agnostic, but there are cases where the workbench needs to convert a working copy to a functional editor. For example: when there are backups of working copies stored on disk and the workbench is asked to open, we eagerly restore all such working copies as editors so that the user is always aware of unsaved changes. However, this requires a bit of glue code so that the workbench knows how to open an editor from a working copy: `IWorkingCopyEditorService`

When you introduce a working copy to the workbench, make sure to call [`IWorkingCopyEditorService.registerHandler`](https://github.com/microsoft/vscode/blob/835ace5796cec0ed19a7eec119b26b57220b0f1a/src/vs/workbench/services/workingCopy/common/workingCopyEditorService.ts#L48):
* `handles`: given a working copy, return whether it is yours or not
* `isOpen`: given a working copy, return whether you know the working copy is opened in the provided editor
* `createEditor`: given a working copy, return an editor that can edit the working copy

**Note:** you will not be asked to `createEditor` for a working copy you do not `handle`.

## Stored Working Copy

**Note:** section is TBD and work in progress

Stored working copies are a variant of working copies that have a known representation on disk. For example, working copies of notebooks all provide a `resource` that denotes to the location of a file on disk. We introduced stored working copies to allow for even more reuse of text file editor working copy behaviour with other providers. This includes:
* fail save read/write from/to disk
* automated backup handling when resolving
* ...