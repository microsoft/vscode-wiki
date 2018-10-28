
## Cursor

* [issue #11150](https://github.com/Microsoft/vscode/issues/11150): Changing multiple occurrences when they are adjacent loses one of the occurrences
* move actions that don't need a view model out of the editor core:
  - [ ] deleteAllRight (**@alex**)

## Indenting/Outdenting

* [issue #9409](https://github.com/Microsoft/vscode/issues/9409): Outdent issue with Typescript
* [issue #15598](https://github.com/Microsoft/vscode/issues/15598): Multi-line indents do not preserve partial indents
* [issue ##2272](https://github.com/Microsoft/vscode/issues/2272): Automatically indent "end" for ruby code

## Find widget
* [issue #15579](https://github.com/Microsoft/vscode/issues/15579): Regex search issue
  * seed search string only if the selection is created explicitly (i.e. not due to a find match)
* Widget size/position
  * [x] Make it resizeable: [#2657](https://github.com/Microsoft/vscode/issues/2657), [#2220](https://github.com/Microsoft/vscode/issues/2220)
  * [x] Bug, Replace Box in Current File Truncated [#5861](https://github.com/Microsoft/vscode/issues/5861)
  * [x] Cover search result: [#5525](https://github.com/Microsoft/vscode/issues/5525)
* Multiline search
  * [ ] [#15727](https://github.com/Microsoft/vscode/issues/15727), [#9051](https://github.com/Microsoft/vscode/issues/9051), [#10588](https://github.com/Microsoft/vscode/issues/10588)
* Find in selection
  * [x] Closing the find widget via x does not clear find in selection toggle [#15959](https://github.com/Microsoft/vscode/issues/15959)
  * [x] Find selected or Find in selection [#8843](https://github.com/Microsoft/vscode/issues/8843) [#24887](https://github.com/Microsoft/vscode/issues/24887)
  * [x] Toggle Find in selection option automatically when there is selection in editor, [#15148](https://github.com/Microsoft/vscode/issues/15148), [#17560](https://github.com/Microsoft/vscode/issues/17560)
* Persist search settings
  * [x] [#6158](https://github.com/Microsoft/vscode/issues/6158)
* Feature requests
  * [ ] [Introduce an universal newline character like \R](https://github.com/Microsoft/vscode/issues/8601)
  * [ ] [Support Multicursor](https://github.com/Microsoft/vscode/issues/9584)
  * [ ] [Find all](https://github.com/Microsoft/vscode/issues/10161)
  * [ ] [Replace with new line](https://github.com/Microsoft/vscode/issues/11237)
  * [ ] [Ignore comments in search](https://github.com/Microsoft/vscode/issues/11688)
  

## DVORAK on mac
* multiple keybindings issues, involves Chromium implementing a very poor w3c recommendation

## multicursor
* [issue #16486](https://github.com/Microsoft/vscode/issues/16486): Deselect one of multi-cursors
