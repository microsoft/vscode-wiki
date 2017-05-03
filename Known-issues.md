This page will provide a summary of known issues marked "upstream" (i.e. we cannot workaround/fix them in VS Code sources)

## Smooth scrolling on Windows using laptops with Precision Touchpad
Scrolling with two fingers on the touchpad feels "janky". The root cause lies within Electron/Chromium and the way they convert touchpad gestures to `mousewheel` events.
 * First reported in VSCode Version: 1.5.3
 * https://github.com/Microsoft/vscode/issues/13612
 * https://github.com/Microsoft/vscode/issues/12637

### *** Confirmed workaround reported by [**@alexpaluzzi**](https://github.com/Microsoft/vscode/issues/13612#issuecomment-263730443)
 > During my testing, I discovered that the lag occurs if you start VS Code maximized. I thought maybe I was going crazy, but all I did was restore the window and then re-maximize it and all of the scroll jank was gone.

### Unconfirmed workarounds:

reported by [**davidstoneham**](https://github.com/Microsoft/vscode/issues/14716#issuecomment-293120446)
 > Staring vscode with the flag "--disable-gpu" fixes the issue for me

reported by [**alexey-kozlenkov**](https://github.com/Microsoft/vscode/issues/12637#issuecomment-269189242)
 > If I run VSCode as an administrator, then scrolling does not work. If I run VSCode just as it is, scrolling does work.

reported by [**rcdmk**](https://github.com/Microsoft/vscode/issues/12637#issuecomment-277464550)
 > I have another trick that does work as long as I keep focus on the VS code window: 
 > 1. Tap with tree fingers, so Search/Cortana pannel shows up to the left of screen. 
 > 2. Swipe with two fingers over the VS code window and notice that the document does scroll