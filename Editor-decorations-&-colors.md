:white_check_mark: - Uses TM theme setting.

:arrow_down: - Not yet uses TM theme setting. Low priority. 

:x: - Not required.

##Editor Contributions

**Cursor**

Status | Style | TM Setting
---|--------|--------
:white_check_mark: | `cursor` | `caret`
:arrow_down: | `bracket-match` | 

**Find**

Status | Style | TM Setting
---|--------|--------
:white_check_mark: | `findMatch` | `findMatchHighlight`
:white_check_mark: | `currentFindMatch` | `currentFindMatchHighlight`
:white_check_mark: | `findScope` | `findRangeHighlight`
:white_check_mark: | `rangeHighlight` | `rangeHighlight`
:white_check_mark: | `selectionHighlight` | `selectionHighlight`

**Goto Declaration**

Status | Style | TM Setting
---|--------|--------
:white_check_mark: | `goto-definition-link` | `gotoDefinitionLinkForeground`

**Hover**

Status | Style | TM Setting
---|--------|--------
:white_check_mark: | `hoverHighlight` | `hoverHighlight`

**Keybindings**

Status | Style | TM Setting
---|--------|--------
:arrow_down: | `keybindingError` | 
:arrow_down: | `inlineKeybindingError` | 
:arrow_down: | `keybindingInfo` | 
:arrow_down: | `inlineKeybindingInfo` | 

**Links**

Status | Style | TM Setting
---|--------|--------
:white_check_mark: | `detected-link-active` | `activeLinkForeground`
:x: | `detected-link` | 

**Markers**

Status | Style | TM Setting
---|--------|--------
:arrow_down: | `greensquiggly` | 
:arrow_down: | `redsquiggly` | 

**Quick open**

Status | Style | TM Setting
---|--------|--------
:white_check_mark: | `rangeHighlight` | `rangeHighlight`

**References**

Status | Style | TM Setting
---|--------|--------
:white_check_mark: | `reference-decoration` | `referenceHighlight`
:white_check_mark: | `referenceMatch` | `findMatchHighlight`

**Snippet**

Status | Style | TM Setting
---|--------|--------
:arrow_down: | `new-snippet` | 
:arrow_down: | `finish-snippet-placeholder` | 
:arrow_down: | `placeholder` | 

**Word Highlighter**

Status | Style | TM Setting
---|--------|--------
:white_check_mark: | `wordHighlightStrong` | `wordHighlightStrong`
:white_check_mark: | `wordHighlight` | `wordHighlight`
:white_check_mark: | `selectionHighlight` | `selectionHighlight`

##Diff Editor Contributions

Status | Style | TM Setting
---|--------|--------
 | `line-insert` | 
 | `line-delete` | 
 | `char-insert` | 
 | `char-delete` | 

##Debug Contributions

Status | Style | TM Setting
---|--------|--------
:white_check_mark: | `hoverHighlight` | `hoverHighlight`

##Git Contributions

Status | Style | TM Setting
---|--------|--------
:arrow_down: | `git-merge-control-decoration` | 
:arrow_down: | `git-dirty-modified-diff-glyph` | 
:arrow_down: | `git-dirty-added-diff-glyph` | 
:arrow_down: | `git-dirty-deleted-diff-glyph` | 

##Search Contributions

Status | Style | TM Setting
---|--------|--------
:white_check_mark: | `findMatch` | `findMatchHighlight`
:white_check_mark: | `currentFindMatch` | `currentFindMatchHighlight`
:white_check_mark: | `findInFileMatch` | `findMatchHighlight`
:white_check_mark: | `highlight` | `findMatchHighlight`
 | `replace findInFileMatch` | 
 | `replaceMatch` | 




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
- [x] `goToDeclaration`
  - [x] `goto-definition-link`
- [x] `modesContentHover`
  - [x] `hoverHighlight` => `hoverHighlight` in TM
- [x] `links.ts`
  - [ ] ~~`detected-link`~~
  - [x] `detected-link-active` => `activeLinkForeground` in TM
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
- [x] `debugHover`
  - [x]`hoverHighlight`
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