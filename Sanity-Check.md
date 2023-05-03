
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

- Install [Docker Desktop](https://docs.docker.com/engine/install/)
- Install [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

#### Steps

1. Install VS Code at the exact version (commit) that needs sanity checking.
2. Install the Remote-Containers extension.
3. Run the following commands. They register the QEMU hardware emulator and start 5 kinds of containers:

```
docker run --privileged --rm tonistiigi/binfmt --install all

docker run -d amd64/ubuntu sleep inf
docker run -d arm64v8/ubuntu sleep inf
docker run -d arm32v7/ubuntu /bin/sh -c 'apt update && apt install -y libatomic1 && sleep inf'
docker run -d amd64/alpine sleep inf
docker run -d arm64v8/alpine sleep inf
```

4. Check that you can connect to each of the containers from the Remote Explorer.
	- Check which platform you are on by running `uname -m` from the integrated terminal. (Expect: `x86_64`, `armv7l` and `aarch64`)
	- Alpine Linux runs on `x86_64` and `aarch64`, check `cat /etc/os-release` shows Alpine as the distro.
5. Use the Remote Explorer to remove the containers. (Note that the current window's container cannot be removed, use a new window instead.)

### Windows

Use the Remote-SSH extension to connect from any client platform to a Windows remote. You can connect to localhost on your own Windows machine, a parallels VM, or another machine. You'll need to [set up and start OpenSSH services](https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse), such as the OpenSSH SSH Server service and the OpenSSH Authentication Agent service.

Note: if you are an [AAD user](https://github.com/PowerShell/Win32-OpenSSH/issues/1787) on your Windows machine, you may have to apply [this workaround](https://github.com/PowerShell/Win32-OpenSSH/issues/1476#issuecomment-642974745).

Here is an example localhost config that can be added to your SSH `config` file:
```
Host localhost
    HostName localhost
    User <username>@microsoft.com
```

Where `<username>` can be found by running `whoami /user` on cmd.exe.
When connecting, the password is the same as the user password (which might be the Active Directory password, but definitely not the login pin).

Set the undocumented setting `"remote.SSH.force32bitWindows": true` to force a 32-bit VS Code server to be installed on a 64-bit Windows host.

### macOS

Use the Remote-SSH extension to connect from any client platform to a macOS remote (connecting to `localhost` is ok). To start the SSH server, you just have to enable Remote Login as described [here](https://osxdaily.com/2011/09/30/remote-login-ssh-server-mac-os-x/).

## CLI

### Linux Platforms

> **Note:** You can run this test from Linux, Mac or Windows.

#### Pre-requisites

- Install [Docker Desktop](https://docs.docker.com/engine/install/)

#### Steps

1. Look up the build's commit id and replace `<commit>` with that value below.
2. Run the following commands one-by-one. They register the QEMU hardware emulator and start 5 Linux-builds of the CLI:

```
export COMMIT="<commit>" # Bash
$env:COMMIT='<commit>' # PowerShell

docker run --privileged --rm tonistiigi/binfmt --install all

docker run -e COMMIT -it --rm --platform linux/amd64 mcr.microsoft.com/devcontainers/base:latest /bin/sh -c 'wget "https://update.code.visualstudio.com/commit:$COMMIT/cli-linux-x64/stable" -O- | tar -xz && ./code tunnel'
docker run -e COMMIT -it --rm --platform linux/arm64 mcr.microsoft.com/devcontainers/base:latest /bin/sh -c 'wget "https://update.code.visualstudio.com/commit:$COMMIT/cli-linux-arm64/stable" -O- | tar -xz && ./code tunnel'
docker run -e COMMIT -it --rm arm32v7/ubuntu /bin/sh -c 'apt update && apt install -y wget && wget "https://update.code.visualstudio.com/commit:$COMMIT/cli-linux-armhf/stable" -O- | tar -xz && ./code tunnel'
docker run -e COMMIT -it --rm amd64/alpine /bin/sh -c 'wget "https://update.code.visualstudio.com/commit:$COMMIT/cli-alpine-x64/stable" -O- | tar -xz && ./code tunnel'
docker run -e COMMIT -it --rm arm64v8/alpine /bin/sh -c 'wget "https://update.code.visualstudio.com/commit:$COMMIT/cli-alpine-arm64/stable" -O- | tar -xz && ./code tunnel'
```

3. Check that each CLI prompts for accepting the EULA and that you can continue to the sign-in step.
