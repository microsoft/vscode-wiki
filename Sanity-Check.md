# Sanity Checking VS Code

## Table of Contents

[About](#about) \
[Getting Started](#getting-started) \
[Client Testing Steps](#client-testing-steps) \
[Server Testing Steps](#server-testing-steps) \
[CLI Testing Steps](#cli-testing-steps)

## About

### What is sanity testing and why do we do it?

VS Code has an extensive release process, called [Endgame](https://github.com/Microsoft/vscode/wiki/Running-the-Endgame), that contains multiple testing processes to ensure that we deliver a product of the highest quality to our users. Sanity testing is the final verification process a build must pass before being released.

> NOTE: This testing is done for each platform build we ship.

Sanity testing is a manual process and is the opportunity to have a final set of eyes on a build before it is released to users. This testing ensures that the VS Code stable release candidate (Stable RC) installs and runs as expected.

#### What are we looking for when we sanity test?

We are looking for errors, failures, or anything else that is not desired behavior. Examples are things not loading or errors when trying to open the build in the first place.

#### What does it mean to sanity test and what are some things to try during sanity testing?

- On the most basic level: install, launch, then open a file or the about dialog
- Other options to test a bit more:
  - Click through all the items on the sidebar
  - Try some command from the command palette
  - Open / click around in the terminal
  - Install and use an extension

## Getting Started

During sanity testing, sections are assigned by operating system. Some operating systems along with the sections that they can test are as follows:

| Operating system | Sections that it can test                                |
| ---------------- | -------------------------------------------------------- |
| Mac x64          | Mac x64, Windows x64, Linux x64, Linux Server, Linux CLI |
| Mac ARM          | Mac ARM, Windows ARM, Linux Server, Linux CLI            |
| Windows x64      | Windows x64, Linux x64, Linux Server, Linux CLI          |

In addition to those operating systems, any web browser on devbox.microsoft.com can test Windows x64, Linux x64, Linux Server, and Linux CLI sections.

Each section on the endgame plan lists specific builds to test. Some of the builds are as follows:

- Client: the following group of builds
  - Installer: on Windows, the system and user executables are installers that install VS Code to a system or user directory, respectively. With these executables, a user can launch VS Code after installing it.
  - Archive: a zip or tar.gz archive. On Windows and Linux, these builds do not have an installer and can be run automatically after extracting them. On macOS, the builds can be run after extracting them and moving the application file to the `/Applications` folder.
  - Universal Archive: an archive specifically for macOS that supports both Intel and Apple Silicon chips by bundling two binaries into a single product.
  - Debian, RPM, and Snap packages: Linux packages that require differing steps per package to install. Steps for each package are listed in the following sections.
- Server: the [VS Code server](https://code.visualstudio.com/docs/remote/vscode-server). Steps for each platform are listed in the following sections.
- CLI: the VS Code command line interface that comes bundled with VS Code. During sanity testing, we use the CLI to test [remote tunnels](https://code.visualstudio.com/docs/editor/command-line#_create-remote-tunnel). Steps for each platform are listed in the following sections.

Once sections are assigned, follow the steps for your assigned section and/or builds below, then check off your assigned section and/or builds on the endgame plan.

### Tools for Testing Different Builds

- On macOS you can get a Parallels license from the team admin to spin up Windows and Linux VMs.
- On Windows (virtualized or not), you can use the [sanity testing WSL images](https://microsoft-my.sharepoint.com/:f:/p/stbatt/EvLnK6RCcW9KttxeqDR59WkBbqoPxHehXV4-EkQinN62sA?e=yk9YNE) created by @sbatten.
- [Dev Box](https://devbox.microsoft.com/%25C2%25A0), thanks to @lszomoru, allows us to spin up and access Windows x64 VMs from any browser.
- An [Ubuntu Desktop VM](https://ubuntu.com/download/desktop) can run the Debian, Archive, and Snap builds. A [Fedora Workstation VM](https://fedoraproject.org/en/workstation/download) can run the RPM and Archive builds.

## Client Testing Steps

The Windows system and user executables are installers. After installing VS Code, it can be launched from the start menu. \
The Windows archive can be run by extracting the archive and double-clicking on the extracted executable. \
The macOS archives can be run by extracting the archive, moving the app to the `/Applications` folder, and launching it. \
The Linux archive can be run by extracting it, opening a terminal to that directory, and running `./code`. \
The Linux packages require differing commands to install and remove:

| Package | Install steps                                         | Remove steps            |
| ------- | ----------------------------------------------------- | ----------------------- |
| Debian  | `sudo dpkg -i <file>.deb`                             | `sudo dpkg -r code`     |
| RPM     | `sudo dnf install <file>.rpm`                         | `sudo dnf remove code`  |
| Snap    | `sudo snap install --classic --dangerous <file>.snap` | `sudo snap remove code` |

After installing a Linux package, run VS Code by running `code` in the terminal.

## Server Testing Steps

### Linux Platforms

> **Note:** You can run this test from Linux, Mac or Windows.

#### Pre-requisites

- Install and run [Docker Desktop](https://docs.docker.com/engine/install/)
- Install [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

#### Steps

1. Install VS Code at the exact version (commit) that needs sanity checking. https://builds.code.visualstudio.com/builds/stable
2. Run the following commands. They register the QEMU hardware emulator and start 5 kinds of containers:

```sh
docker run --privileged --rm tonistiigi/binfmt --uninstall '*'
docker run --pull always --privileged --rm tonistiigi/binfmt --install all

docker run -d --pull always --platform linux/amd64 amd64/ubuntu sleep inf
docker run -d --pull always --platform linux/arm64 arm64v8/ubuntu sleep inf
docker run -d --pull always --platform linux/arm/v7 arm32v7/ubuntu /bin/sh -c 'apt update && apt install -y libatomic1 && sleep inf'
docker run -d --pull always --platform linux/amd64 amd64/alpine sleep inf
docker run -d --pull always --platform linux/arm64 arm64v8/alpine sleep inf
```

3. Check that you can connect to each of the containers using the "Attach in New Window" button for each container in the Remote Explorer. For each container:
    - Check which platform you are on by running `uname -m` from the integrated terminal. (Expect: `x86_64` for amd64, `armv7l` for arm32 and `aarch64` for arm64)
    - Alpine Linux runs on `x86_64` and `aarch64`, check `cat /etc/os-release` shows Alpine as the distro.
4. Use the Remote Explorer to remove the containers. Note that the current window's container cannot be removed, so use a new window instead.

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

```text
Host localhost
    HostName localhost
    User <username>@microsoft.com
```

Where `<username>` can be found by running `whoami /user` on cmd.exe.
When connecting, the password is the same as the user password (which might be the Active Directory password, but definitely not the login pin).

Set the undocumented setting `"remote.SSH.force32bitWindows": true` to force a 32-bit VS Code server to be installed on a 64-bit Windows host. If you have previously connected to this host with this version of VS Code, you will first want to run the command "Kill VS Code Server on Host" to remove the previously installed server.

### macOS using Remote-SSH

Use the Remote-SSH extension to connect from any client platform to a macOS remote (connecting to `localhost` is ok). To start the SSH server, you just have to enable Remote Login as described [here](https://osxdaily.com/2011/09/30/remote-login-ssh-server-mac-os-x/).

## CLI Testing Steps

### Windows & macOS

1. Download the CLI archive and extract it
2. Run it with `./code tunnel` and make sure it starts and you see the license notice

### Linux

> **Note:** You can run this test from Linux, Mac or Windows.

#### Pre-requisites

- Install [Docker Desktop](https://docs.docker.com/engine/install/)

#### Steps

1. Look up the build's commit id and replace `<commit>` with that value below.
2. Run the following commands one-by-one. They register the QEMU hardware emulator and start 5 Linux builds of the CLI:

```sh
export COMMIT="<commit>" # Bash
$env:COMMIT='<commit>' # PowerShell

docker run --privileged --rm tonistiigi/binfmt --uninstall '*'
docker run --pull always --privileged --rm tonistiigi/binfmt --install all

docker run -e COMMIT -it --rm --pull always --platform linux/amd64 mcr.microsoft.com/devcontainers/base:latest /bin/sh -c 'apt update && DEBIAN_FRONTEND=noninteractive apt install -y wget libatomic1 ca-certificates python3-minimal && wget "https://update.code.visualstudio.com/commit:$COMMIT/cli-linux-x64/stable" -O- | tar -xz && ./code tunnel'
docker run -e COMMIT -it --rm --pull always --platform linux/arm64 mcr.microsoft.com/devcontainers/base:latest /bin/sh -c 'apt update && DEBIAN_FRONTEND=noninteractive apt install -y wget libatomic1 ca-certificates python3-minimal && wget "https://update.code.visualstudio.com/commit:$COMMIT/cli-linux-arm64/stable" -O- | tar -xz && ./code tunnel'
docker run -e COMMIT -it --rm --pull always --platform linux/arm/v7 arm32v7/ubuntu /bin/sh -c 'apt update && DEBIAN_FRONTEND=noninteractive apt install -y wget libatomic1 ca-certificates python3-minimal && wget "https://update.code.visualstudio.com/commit:$COMMIT/cli-linux-armhf/stable" -O- | tar -xz && ./code tunnel'
docker run -e COMMIT -it --rm --pull always --platform linux/amd64 amd64/alpine /bin/sh -c 'apk update && apk add musl libgcc libstdc++ && wget "https://update.code.visualstudio.com/commit:$COMMIT/cli-alpine-x64/stable" -O- | tar -xz && ./code tunnel'
docker run -e COMMIT -it --rm --pull always --platform linux/arm64 arm64v8/alpine /bin/sh -c 'apk update && apk add musl libgcc libstdc++ && wget "https://update.code.visualstudio.com/commit:$COMMIT/cli-alpine-arm64/stable" -O- | tar -xz && ./code tunnel'
```

3. For each CLI test:
    1. Make sure the program starts and you see and can agree to the license
    2. Connect to the tunnel via `https://vscode.dev/tunnel/<name>?vscode-version=COMMIT`
    3. Close the tab, then hit Ctrl+C on the server.
