## Creating a crash report

VS Code supports a `--crash-reporter-directory <absolute-path>` option that you can use to produce crash dumps into that folder. Please try this option first:
1. Close all instances of VSCode.
2. Run `code --crash-reporter-directory <absolute-path>` from the command line.
    * Run `code-insiders` instead of `code` if the issue is occurring on the Insiders version.
3. Take the steps that lead to the crash.
4. Check for a `*.dmp` file in that folder.
5. Send the `*.dmp` file back to us, either by email, or by creating a zip archive containing it and attaching the zip to the GitHub issue.

If you can reproduce the issue running out of sources, meaning compiled from source (code-oss), then you might be able to symbolicate the crash dump (`.dmp` file) as well. Otherwise, please wait for a maintainer to symbolicate your crash dump.

## Remote Extension Host Crashes

Before running the server on the remote configure `ulimit -c unlimited` to create the dump file on crash. Once the crash happens you can retrieve the coredump either by locating with `coredumpctl` or checking the path configured in `/proc/sys/kernel/core_pattern`.

Once you have the dump file run the following command `gdb -se <path-to-vscode-server>/node -c <path-to-core-file>` and provide the output for each of the following gdb commands,

```
> set pagination off
> info sharedlibrary
> info registers
> bt full
> disassemble
```

## Symbolicating a crash dump (_Steps for VS Code team members only_)

A global install of electron-minidump is required for the following steps.  
One can install electron-minidump globally using `npm install -g electron-minidump`. 
**A macOS or Linux device is required**.

1. Run `electron-minidump crash-file.dmp > symbolicated-output.log` to generate or refresh the cache for electron-minidump. Check the symbolicated output to see which symbols are required, if any. For example, if the top of the crash output backtrace says "Electron Framework" but doesn't provide a method name after, then Electron Framework symbols are required.
2. Get the appropriate symbol files. Most likely, the crash comes from an Insiders or Stable version of Code. Those versions use an internal Electron, and symbol files for the internal Electron along with Insiders and Stable are available at [microsoft/vscode-electron-prebuilt](https://github.com/microsoft/vscode-electron-prebuilt/releases). Meanwhile, Code-OSS uses the OSS version of Electron, which has symbol files available at [electron/electron](https://github.com/electron/electron/releases).
3. Unzip the downloaded symbol zip file, and after verifying folder hashes, copy over individual `.sym` files as needed to the correct subdirectory within the electron-minidump breakpad_symbols directory, which can be found at `"$(npm root -g)/electron-minidump/cache/breakpad_symbols"`.
    * For example, let's say I unzip `insiders-symbols-v19.1.8-darwin-x64.zip` to `~/insiders-symbols/`, and that in the unzipped directory, there is a folder `Electron Framework` with a subfolder starting with the hash `4C4C444`. After confirming in `"$(npm root -g)/electron-minidump/cache/breakpad_symbols"` that there is also an Electron Framework directory there with an empty subdirectory starting with the same hash, I can run `cp "~/insiders-symbols/Electron Framework/<hash>/Electron Framework.sym" "$(npm root -g)/electron-minidump/cache/breakpad_symbols/Electron Framework/<hash>"`.
4. Run `electron-minidump crash-file.dmp > symbolicated-output.log` again. The crash output backtrace should now have method names attached.