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

Most of the keyboard layouts show only the **produced** characters. Here is, for example the US standard keyboard layout:

  [[images/keyboard/KB_United_States-NoAltGr.png]]

Here I have annotated the US standard keyboard layout with the key codes "behind" the produced characters:

  [[images/keyboard/KB_United_States-NoAltGr-keycodes.png]]

Different keyboard layouts do various things (and it varies across OSes):
 * sometimes they change what a key code produces.
 * sometimes they rearrange key codes on the keyboard.
 * sometimes they remove key codes.
 * sometimes they add key codes.

Here is, for example, the GER (Germany) keyboard layout on Windows:

  [[images/keyboard/900px-KB_Germany.png]]

Here I have annotated the GER (Germany) keyboard layout with the key codes:

  [[images/keyboard/900px-KB_Germany-keycodes.png]]

Let's see them side-by-side:

| Standard US | GER (Germany) |
|----|----|
| [[images/keyboard/KB_United_States-NoAltGr-keycodes.png]] | [[images/keyboard/900px-KB_Germany-keycodes.png]]|


* Different keyboard layouts do various things:
  * sometimes they change what a key code produces:
    * e.g. under US standard, `VKEY_OEM_3` produces a backtick (`` ` ``) and `Shift`+ `VKEY_OEM_3` produces a tilde (`~`)
    * under DE (GER), `VKEY_OEM_3` produces a combining circumflex accent (`^`) and `Shift` + `VKEY_OEM_3` produces a degree sign (`°`)
  * sometimes they rearrange key codes on the keyboard (e.g. `VKEY_OEM_3` is moved from the left of `1` to somewhere else on the keyboard)
  * sometimes they remove key codes (e.g. `VKEY_OEM_6` is not on the DE (GER) keyboard layout)
  * sometimes they introduce key codes (e.g. `VKEY_OEM_102` is on the DE (GER) keyboard layout)

---

