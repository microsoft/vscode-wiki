
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
- [ ] `modesContentHover`
  - [ ] `hoverHighlight`
- [ ] `links.ts`
  - [ ] `detected-link`
  - [ ] `detected-link-active`
- [x] `editorQuickOpen.ts`
  - [x] `rangeHighlight` => `rangeHighlight` in TM
* `referencesWidget.ts`
  * `reference-decoration`
* `snippetController.ts`
  * `new-snippet`
  * `finish-snippet-placeholder`
  * `snippet-placeholder`
* `wordHighlighter`
  * `wordHighlightStrong`
  * `selectionHighlight`
  * `wordHighlight`
* `debugEditorModelManager.ts`
  * `debug-top-stack-frame-line`
  * `debug-top-stack-frame-exception-line`
  * `debug-top-stack-frame-column`
  * `debug-focused-stack-frame-line`
* `debugHover`
  * `hoverHighlight`
* `gitEditorContributions`:
  * `git-merge-control-decoration`
* `gitWorkbenchContributions`:
  * `git-dirty-modified-diff-glyph`
  * `git-dirty-added-diff-glyph`
  * `git-dirty-deleted-diff-glyph`
* `searchModel`:
  * `findMatch`
  * `currentFindMatch`