
This guide will explain how VS Code handles keybindings and guide you through identifying keybindings issues (especially related to different keyboard layouts).

Please take the time to read through this detailed explanation before proceeding to troubleshooting.

## How VS Code dispatches keybindings

* Our keybindings work with key codes (as defined [here](https://msdn.microsoft.com/en-us/library/windows/desktop/dd375731(v=vs.85).aspx)). e.g.:
  * Toggle Line Comment is bound to <kbd>Ctrl</kbd> + <kbd>VKEY_OEM_2</kbd>, where `VKEY_OEM_2 = 0xBF = 191`
  * Toggle Integrated Terminal is bound to <kbd>Ctrl</kbd> + <kbd>VKEY_OEM_3</kbd>, where `VKEY_OEM_3 = 0xC0 = 192`
  * Split Editor is bound to <kbd>Ctrl</kbd> + <kbd>VKEY_OEM_5</kbd>, where `VKEY_OEM_5 = 0xDC = 220`

* We listen to `keydown` events from Chromium and use the `e.keyCode` coming from Chromium to dispatch a keybinding:
  * e.g. when we receive a `keydown` event with `ctrlKey = true` and `keyCode = 191` we will invoke the action associated with <kbd>Ctrl</kbd> + <kbd>VKEY_OEM_2</kbd>, which out of the box is Toggle Comment Line
  * we must use `e.keyCode` until `e.code` is [fully supported](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code).

## Keyboard layouts and key codes

Most of the keyboard layouts show only the **produced** characters. Here is the US standard keyboard layout annotated also with the key codes "behind" some of the produced characters:

  [[images/keyboard/KB_United_States-NoAltGr-keycodes.png]]

Here is the GER (Germany) keyboard layout together with key codes on Windows:

  [[images/keyboard/900px-KB_Germany-keycodes.png]]

As you can see, different keyboard layouts do various things (and it varies across OSes):
 * sometimes they change what a key code produces.
   * e.g. <kbd>Shift</kbd> + <kbd>COMMA</kbd> produces `<` on the US layout, but produces `;` on the German layout. 
 * sometimes they rearrange/remove/add key codes on the keyboard.
   * e.g. On the US layout, the key next to <kbd>1</kbd> is <kbd>OEM_3</kbd>, on the German layout it is <kbd>OEM_5</kbd>
   * e.g. the German layout has <kbd>OEM_102</kbd>, which the US layout does not

## Key Code rendering in the UI

It would not be very friendly if we were to render in the UI that the keybinding for Toggle Line Comment is <kbd>Ctrl</kbd> + <kbd>VKEY_OEM_2</kbd>. Unfortunately, Chromium does not have any API that would give us the keyboard layout and the mappings from key code to produced characters.

We have therefore written a native node module, [`native-keymap`](https://github.com/Microsoft/node-native-keymap). The module has distinct implementations for each OS (mac, windows, linux) and it basically works by creating fake keyboard events and then scanning the produced characters (each OS has its own particular way of doing this).

The native node module can be basically queried to get the key code -> produced characters mapping with the current keyboard layout. **For performance reasons, we query this mapping only on VS Code window startup, therefore if you change your keyboard layout while VS Code is running, please restart VS Code**.

### Here is the information that module gives us for the US standard layout:

| Key Code | Produced | Shift+ | AltGr+ | Shift+AltGr+ |
|----------|----------|--------|--------|--------------|
| <kbd>VKEY_OEM_1</kbd> | <kbd>;</kbd> | <kbd>:</kbd> |  |  |
| <kbd>VKEY_OEM_PLUS</kbd> | <kbd>=</kbd> | <kbd>+</kbd> |  |  |
| <kbd>VKEY_OEM_COMMA</kbd> | <kbd>,</kbd> | <kbd><</kbd> |  |  |
| <kbd>VKEY_OEM_MINUS</kbd> | <kbd>-</kbd> | <kbd>_</kbd> |  |  |
| <kbd>VKEY_OEM_PERIOD</kbd> | <kbd>.</kbd> | <kbd>></kbd> |  |  |
| <kbd>VKEY_OEM_2</kbd> | <kbd>/</kbd> | <kbd>?</kbd> |  |  |
| <kbd>VKEY_OEM_3</kbd> | <kbd>\`</kbd> | <kbd>~</kbd> |  |  |
| <kbd>VKEY_OEM_4</kbd> | <kbd>[</kbd> | <kbd>{</kbd> |  |  |
| <kbd>VKEY_OEM_5</kbd> | <kbd>\\</kbd> | <kbd>\|</kbd> |  |  |
| <kbd>VKEY_OEM_6</kbd> | <kbd>]</kbd> | <kbd>}</kbd> |  |  |
| <kbd>VKEY_OEM_7</kbd> | <kbd>'</kbd> | <kbd>"</kbd> |  |  |
| <kbd>VKEY_OEM_102</kbd> | <kbd>\\</kbd> | <kbd>\|</kbd> | | |  

### Here is the information that module gives us for the German (Germany) layout:

| Key Code | Produced | Shift+ | AltGr+ | Shift+AltGr+ |
|----------|----------|--------|--------|--------------|
| <kbd>VKEY_OEM_1</kbd> | <kbd>ü</kbd> | <kbd>Ü</kbd> |  | 
| <kbd>VKEY_OEM_PLUS</kbd> | <kbd>+</kbd> | <kbd>*</kbd> | <kbd>~</kbd> | 
| <kbd>VKEY_OEM_COMMA</kbd> | <kbd>,</kbd> | <kbd>;</kbd> |  | 
| <kbd>VKEY_OEM_MINUS</kbd> | <kbd>-</kbd> | <kbd>_</kbd> |  | 
| <kbd>VKEY_OEM_PERIOD</kbd> | <kbd>.</kbd> | <kbd>:</kbd> |  | 
| <kbd>VKEY_OEM_2</kbd> | <kbd>#</kbd> | <kbd>'</kbd> |  | 
| <kbd>VKEY_OEM_3</kbd> | <kbd>ö</kbd> | <kbd>Ö</kbd> |  | 
| <kbd>VKEY_OEM_4</kbd> | <kbd>ß</kbd> | <kbd>?</kbd> | <kbd>\\</kbd> | <kbd>ẞ</kbd>
| <kbd>VKEY_OEM_5</kbd> | <kbd><span style="color:red">^</span></kbd> | <kbd>°</kbd> |  | 
| <kbd>VKEY_OEM_7</kbd> | <kbd>ä</kbd> | <kbd>Ä</kbd> |  | 
| <kbd>VKEY_OEM_102</kbd> | <kbd><</kbd> | <kbd>></kbd> | <kbd>\|</kbd> | 

### Finally, the rendering

We use this information **for rendering purposes**. e.g. in the `F1` list:

 * when under the US standard layout, <kbd>VKEY_OEM_2</kbd> -> <kbd>/</kbd> :
    [[images/keyboard/toggle-line-comment-US.png]]
 * when under the German (Germany) layout, <kbd>VKEY_OEM_2</kbd> -> <kbd>#</kbd>:
    [[images/keyboard/toggle-line-comment-German.png]]


## Key Codes in `keybindings.json`

Most software I know does not expose in any human readable, much less editable format its keybindings table. VS Code is minimalistic in terms of UI and exposes the keybindings in a JSON format, in `keybindings.json`.

This file must be keyboard layout agnostic, as it is written to disk. We therefore store, represent, and refer to key codes in there. Again, it would not be very friendly if we would represent the keybinding for Toggle Line Comment (`editor.action.commentLine`) as <kbd>Ctrl</kbd> + <kbd>VKEY_OEM_2</kbd> (`"ctrl+oem_2"`).

We've chosen to use the US produced characters to refer to key codes, i.e. although we can parse `"ctrl+oem_2"`, we have chosen to represent it as `"ctrl+/"`. This is definitely unexpected and confusing when using a different keyboard layout, and IMHO can be alleviated only by building a custom UI for keybindings customization.

Long story short, when you see `"ctrl+/"` in `keybindings.json`, it means `"ctrl+oem_2"`, and the same is true for the rest of the keys.

We try to be somewhat helpful and point out mismatches when we detect them. Here is how the default keybindings look like when being opened with the German (Germany) layout:

  [[images/keyboard/default-kb-Germany.png]]

## Troubleshooting 1: pressing a key -> running a command

This section describes what to do when you want to press a key on your keyboard and you'd like it to result in a command being executed in VS Code.

**Use the Define Keybinding widget**:

  [[images/keyboard/define-keybinding.gif]]

## Troubleshooting 2: command -> what key to press

This section describes what to do when you'd like to find out what key a command is bound to. Let's pick Toggle Line Comment (`editor.action.commentLine`) as an example.

#### 1. Find the key code it is bound to out-of-the-box


Go to the default keybindings and find the entry for the command:

```
{ "key": "ctrl+/",  "command": "editor.action.commentLine",
                    "when": "editorTextFocus && !editorReadonly" }
```

| `keybindings.json` | Key Code | Value |
|----------|----------|--------|--------|
| <kbd>;</kbd> | <kbd>VKEY_OEM_1</kbd> | 186 |
| <kbd>=</kbd> | <kbd>VKEY_OEM_PLUS</kbd> | 187 |
| <kbd>,</kbd> | <kbd>VKEY_OEM_COMMA</kbd> | 188 |
| <kbd>-</kbd> | <kbd>VKEY_OEM_MINUS</kbd> | 189 |
| <kbd>.</kbd> | <kbd>VKEY_OEM_PERIOD</kbd> | 190 |
| <kbd>/</kbd> | <kbd>VKEY_OEM_2</kbd> | 191 |
| <kbd>\`</kbd> | <kbd>VKEY_OEM_3</kbd> | 192 |
| <kbd>[</kbd> | <kbd>VKEY_OEM_4</kbd> | 219 |
| <kbd>\\</kbd> | <kbd>VKEY_OEM_5</kbd> | 220 |
| <kbd>]</kbd> | <kbd>VKEY_OEM_6</kbd> | 221 |
| <kbd>'</kbd> | <kbd>VKEY_OEM_7</kbd> | 222 |
| <kbd>\\</kbd> | <kbd>VKEY_OEM_102</kbd> | 226 |  

Use the above table and deduce that the command is bound to <kbd>Ctrl</kbd> + <kbd>VKEY_OEM_2</kbd>:

#### 2. Find which key on your keyboard layout is mapped to `VKEY_OEM_2`

Use the above table and deduce that we're looking for a `keydown` event that generates the `keyCode = 191`. Go to https://www.w3.org/2002/09/tests/keys.html with Chrome and press keys until you see one that generates `keyCode = 191`.

For the US standard layout, that is the key next to Shift <kbd>/?</kbd>.

For the German (Germany) layout, that is the key next to Shift <kbd>#'</kbd>.

#### 3. Correlate with VS Code

VS Code should have informed you and should have rendered `VKEY_OEM_2` in your current keyboard layout correctly. If that is not the case, proceed to the next troubleshooting section.

## Troubleshooting 3: verifying that Chromium is sending the correct key code

Open https://www.w3.org/2002/09/tests/keys.html in both Chromium and Firefox (or IE). Press the key you are interested in. It should produce the same `keyCode` in both browsers. If that's not the case, then most likely this is an issue with Chromium.

## Troubleshooting 4: verifying that VS Code renders key codes as expected

You will need node.js and a good (node compatible) C++ toolchain.

```
git clone https://github.com/Microsoft/node-native-keymap.git
cd node-native-keymap
npm install -g node-gyp
node-gyp configure
node-gyp build
npm test
```

This should print out the mapping table that VS Code is using to render the key codes.

This mapping table could be incorrect, in which case this is an issue with `node-native-keymap`.
