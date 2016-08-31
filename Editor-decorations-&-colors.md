
* `oneCursor.ts`
  * ~~`bracket-match`~~
* `modelServiceImpl.ts`
  * ~~`greensquiggly`~~
  * ~~`redsquiggly`~~
* `defineKeybinding.ts`
  * ~~`keybindingError`~~
  * ~~`inlineKeybindingError`~~
  * ~~`keybindingInfo`~~
  * ~~`inlineKeybindingInfo`~~
- [x] `findController.ts`
  - [x] `selectionHighlight` => `selectionHighlight` in TM
- [x] `findDecorations.ts`
  - [x] `findMatch` => `findMatchHighlight` in TM
  - [x] `currentFindMatch` => `currentFindMatchHighlight` in TM
  - [x] `rangeHighlight` => `rangeHighlight` in TM
  - [x] `findScope` => `findRangeHighlight` in TM
- [ ] `goToDeclaration`
  - [ ] `goto-definition-link`
- [x] `modesContentHover`
  - [x] `hoverHighlight` => `hoverHighlight` in TM
- [ ] `links.ts`
  - [ ] `detected-link`
  - [ ] `detected-link-active`
- [x] `editorQuickOpen.ts`
  - [x] `rangeHighlight` => `rangeHighlight` in TM
- [x] `referencesWidget.ts`
  - [x] `reference-decoration`=> `referenceHighlight` in TM
  - [x] `referenceMatch`=> `findMatchHighlight` in TM
- [ ] `snippetController.ts`
  - [ ] `new-snippet`
  - [ ] `finish-snippet-placeholder`
  - [ ] `placeholder`
- [x] `wordHighlighter`
  - [x] `wordHighlightStrong` => `wordHighlightStrong` in TM
  - [x] `selectionHighlight` => `selectionHighlight` in TM
  - [x] `wordHighlight` => `wordHighlight` in TM
* `debugEditorModelManager.ts`
  * ~~`debug-top-stack-frame-line`~~
  * ~~`debug-top-stack-frame-exception-line`~~
  * ~~`debug-top-stack-frame-column`~~
  * ~~`debug-focused-stack-frame-line`~~
- [ ] `debugHover`
  - [ ]`hoverHighlight`
* `gitEditorContributions`:
  * ~~`git-merge-control-decoration`~~
* `gitWorkbenchContributions`:
  * ~~`git-dirty-modified-diff-glyph`~~
  * ~~`git-dirty-added-diff-glyph`~~
  * ~~`git-dirty-deleted-diff-glyph`~~
- [x] `searchModel`:
  - [x] `findMatch` => `findMatchHighlight` in TM
  - [x] `currentFindMatch` => `currentFindMatchHighlight` in TM
  - [x] `findInFileMatch` => `findMatchHighlight` in TM
  - [x] `highlight` => `findMatchHighlight` in TM