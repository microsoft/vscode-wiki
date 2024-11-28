# Sanity Checking VS Code
## Jump to a section:
[About](#about) \
[Getting Started](#getting-started) \
[Steps to Test Per Build Type](#steps-to-test-per-build-type) 


## About

### What is sanity testing and why do we do it?

VS Code has an extensive release process, called [Endgame](https://github.com/Microsoft/vscode/wiki/Running-the-Endgame), that contains multiple testing processes to ensure that we deliver a product of the highest quality to our users. The final process a build must pass before being released is what we call "Sanity testing".

> NOTE: This testing is done for each platform build we ship.

Sanity testing is human run and is the opportunity to have a final set of eyes on a build before it is released to users. This testing helps catch any final issues that might have slipped through the rest of the testing processes and ensures that the installer install VS Code correctly and it runs as expect.

#### What to look for when you sanity test?

We are looking for errors, failures, or anything else that is not desired behavior. Examples are things not loading or errors when trying to open the build in the first place.

#### What does it mean to sanity test and what are some things to try during sanity testing?

- On the most basic level:  install, launch, then open a file or the about dialog
- Other options to test a bit more:
    - Click through all the items on the sidebar
    - Try some command from the command palette
    - Open / click around in the terminal
    - Install and use an extension

## Getting Started

When the step of sanity testing comes in endgame, sections are assigned based on device type. The devices tested are as follows with the compatible testing machine:

| OS you are running | Additional builds you are able to test |
| ----------- | ----------- |
| Mac x64      | Windows x64, Windows x86, Linux x64, Linux Server, Linux CLI       |
| Mac ARM   | Windows ARM, Linux Server, Linux CLI,        |
| Windows x64 | Windows x86, Linux x64, Linux Server, Linux CLI |
| Any Web Browser for devbox.microsoft.com|  Windows x64, Windows x86, Linux x64, Linux Server, Linux CLI |

credit to @tylerleonhardt for this table and the below tool descriptions.

#### Tools for Testing Different OS
* On macOS you can get a Parallels license from our admin to spin up VMs , you can get a Parallels license. 
* On Windows (virtualized or not), you can use the Sanity Testing WSL image created by @sbatten. Find images and instructions [here](https://microsoft-my.sharepoint.com/:f:/p/stbatt/EvLnK6RCcW9KttxeqDR59WkBbqoPxHehXV4-EkQinN62sA?e=yk9YNE).
* And don’t forget, we have [dev box](https://devbox.microsoft.com/%25C2%25A0) thanks to @lszomoru which allows us to spin up Windows x64 VMs to access from any browser.




Other system types have specific builds, these will be outlined in the release issue. Here are the types of builds and what this means:

- Archive: a build that doesn't have an installer (also referred to as client below)
- Server: Running vscode on a server on a remote client.
- CLI: Running vscode from the command line interface.
- Universal Archive (for macOS): Same as the regular archive but just a build that should work universally for both Intel and Apple Silicon based chips.


Once sections are assigned, follow the Steps to Test Build Type below to check off each of your assigned sections on the release issue.

## Steps to Test Per Build Type
follow the steps below for the client, server, and CLI steps.

## Client

Download the correct bits and make sure they start and the window opens correctly.

### Linux Snap

```
sudo snap install --classic --dangerous <file>.snap
```

## Server

### Linux Platforms

> **Note:** You can run this test from Linux, Mac or Windows.

#### Pre-requisites

- Install and run [Docker Desktop](https://docs.docker.com/engine/install/)
- Install [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

#### Steps

1. Install VS Code at the exact version (commit) that needs sanity checking. https://builds.code.visualstudio.com/builds/stable
2. Run the following commands. They register the QEMU hardware emulator and start 5 kinds of containers:

```
docker run --privileged --rm tonistiigi/binfmt --install all

docker run -d amd64/ubuntu sleep inf
docker run -d arm64v8/ubuntu sleep inf
docker run -d arm32v7/ubuntu /bin/sh -c 'apt update && apt install -y libatomic1 && sleep inf'
docker run -d amd64/alpine sleep inf
docker run -d arm64v8/alpine sleep inf
```

4. Check that you can connect to each of the containers using the "Attach in New Window" button for each container in the Remote Explorer. For each container:
    - Check which platform you are on by running `uname -m` from the integrated terminal. (Expect: `x86_64` for amd64, `armv7l` for arm32 and `aarch64` for arm64)
    - Alpine Linux runs on `x86_64` and `aarch64`, check `cat /etc/os-release` shows Alpine as the distro.
5. Use the Remote Explorer to remove the containers. Note that the current window's container cannot be removed, so use a new window instead.

### Windows and Mac using the CLI/Tunnels

You can sanity test the CLI and the server at the same time, by using the CLI to start a tunnel and connecting to it from a browser, specifying the right commit hash for the server version under test.

1. Download and extract the CLI
2. Run it with `./code tunnel`
3. The CLI will print a `vscode.dev` link. Open that link, but add `?vscode-version=<commit hash>` to the end of the URL, where `<commit hash>` is the hash of the build that is being tested. You can find this on the builds page.
4. Navigate to that URL. This will cause the CLI to download the specified version of the server and open a remote session in your browser over the tunnel.

### Windows using Remote-SSH

This is a second option for sanity testing the Windows server. Use the Remote-SSH extension to connect from any client platform to a Windows remote. You can connect to localhost on your own Windows machine, a parallels VM, or another machine. You'll need to [set up and start OpenSSH services](https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse), such as the OpenSSH SSH Server service and the OpenSSH Authentication Agent service.

Note: if you are an [AAD user](https://github.com/PowerShell/Win32-OpenSSH/issues/1787) on your Windows machine, you may have to apply [this workaround](https://github.com/PowerShell/Win32-OpenSSH/issues/1476#issuecomment-642974745).

Here is an example localhost config that can be added to your SSH `config` file:
```
Host localhost
    HostName localhost
    User <username>@microsoft.com
```

Where `<username>` can be found by running `whoami /user` on cmd.exe.
When connecting, the password is the same as the user password (which might be the Active Directory password, but definitely not the login pin).

Set the undocumented setting `"remote.SSH.force32bitWindows": true` to force a 32-bit VS Code server to be installed on a 64-bit Windows host. If you have previously connected to this host with this version of VS Code, you will first want to run the command "Kill VS Code Server on Host" to remove the previously installed server.

### macOS using Remote-SSH

Use the Remote-SSH extension to connect from any client platform to a macOS remote (connecting to `localhost` is ok). To start the SSH server, you just have to enable Remote Login as described [here](https://osxdaily.com/2011/09/30/remote-login-ssh-server-mac-os-x/).

## CLI

### Windows & macOS

1. Download the CLI archive and extract it
2. Run it with `./code tunnel` and make sure it starts and you see the license notice

### Linux

> **Note:** You can run this test from Linux, Mac or Windows.

#### Pre-requisites

- Install [Docker Desktop](https://docs.docker.com/engine/install/)

#### Steps

1. Look up the build's commit id and replace `<commit>` with that value below.
2. Check that the Remote Tunnels pre-release extension is installed on the Stable client, and that the Stable client is at the exact version (commit) that needs sanity checking. Since there is a limit to the number of tunnels that can be registered at once, unregister any unnecessary tunnels before and during this sanity test.
3. Run the following commands one-by-one. They register the QEMU hardware emulator and start 5 Linux builds of the CLI:

```
export COMMIT="<commit>" # Bash
$env:COMMIT='<commit>' # PowerShell

docker run --privileged --rm tonistiigi/binfmt --install all

docker run -e COMMIT -it --rm --platform linux/amd64 mcr.microsoft.com/devcontainers/base:latest /bin/sh -c 'apt update && apt install -y wget libatomic1 ca-certificates python3-minimal && wget "https://update.code.visualstudio.com/commit:$COMMIT/cli-linux-x64/stable" -O- | tar -xz && ./code tunnel'
docker run -e COMMIT -it --rm --platform linux/arm64 mcr.microsoft.com/devcontainers/base:latest /bin/sh -c 'apt update && apt install -y wget libatomic1 ca-certificates python3-minimal && wget "https://update.code.visualstudio.com/commit:$COMMIT/cli-linux-arm64/stable" -O- | tar -xz && ./code tunnel'
docker run -e COMMIT -it --rm arm32v7/ubuntu /bin/sh -c 'apt update && apt install -y wget libatomic1 ca-certificates python3-minimal && wget "https://update.code.visualstudio.com/commit:$COMMIT/cli-linux-armhf/stable" -O- | tar -xz && ./code tunnel'
docker run -e COMMIT -it --rm amd64/alpine /bin/sh -c 'apk update && apk add musl libgcc libstdc++ && wget "https://update.code.visualstudio.com/commit:$COMMIT/cli-alpine-x64/stable" -O- | tar -xz && ./code tunnel'
docker run -e COMMIT -it --rm arm64v8/alpine /bin/sh -c 'apk update && apk add musl libgcc libstdc++ && wget "https://update.code.visualstudio.com/commit:$COMMIT/cli-alpine-arm64/stable" -O- | tar -xz && ./code tunnel'
```

4. For each CLI test:
    1. Make sure the program starts and you see and can agree to the license
    2. Connect to the tunnel using the Remote Tunnels prerelease extension on the Stable client
    3. Check which platform you are on by running `uname -m` from the integrated terminal. (Expect: `x86_64` for amd64, `armv7l` for arm32 and `aarch64` for arm64)
    4. Run `cat /etc/os-release`. For Alpine Linux tunnels, ensure the output shows Alpine as the distro. Otherwise, ensure that Ubuntu or Debian are mentioned in the output.
    5. Close the remote connection on the client. Then, hit Ctrl+C on the server.
