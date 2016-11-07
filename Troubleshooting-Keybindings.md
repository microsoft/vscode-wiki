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
   * e.g. On the US layout, the key next to <kbd>1</kbd> is <kbd>OEM_3</kbd>, meanwhile on the German layout it is <kbd>OEM_5</kbd>
   * e.g. the German layout has <kbd>OEM_102</kbd>, which the US layout does not

---

