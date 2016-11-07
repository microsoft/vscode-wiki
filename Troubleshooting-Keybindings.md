# Troubleshooting keybindings

This guide will explain how VS Code handles keybindings and guide you through identifying keybindings issues (especially related to different keyboard layouts).

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

 * when under the US standard layout:
    [[images/keyboard/toggle-line-comment-US.png]]
 * when under the German (Germany) layout:
    [[images/keyboard/toggle-line-comment-German.png]]

  