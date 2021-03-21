To build for a target architecture different than the host (e.g. using x64 to build for ARM), you'll need to do the following, in addition to the setup under [How to Contribute](https://github.com/Microsoft/vscode/wiki/How-to-Contribute):

**One-Time Setup**

1. Install build toolchain and chroot/rootfs prerequisites:

   ```bash
   sudo apt-get install qemu qemu-user-static debootstrap gcc-arm-linux-gnueabihf g++-arm-linux-gnueabihf
   ```

1. Create a chroot/rootfs for the target architecture:

   ```bash
   sudo qemu-debootstrap --arch=armhf --variant=minbase xenial rootfs
   ```

1. Install libx11-dev on the chroot/rootfs:

   ```bash
   sudo chroot rootfs apt-get install -y libx11-dev
   ```

**Build**

Because cross-compiling isn't officially supported by the Visual Studio Code team, some workarounds are required to make the app build correctly:

1. Point to the target toolchain on the build host:

   ```bash
   export CC=$(which arm-linux-gnueabihf-gcc)
   export CXX="$(which arm-linux-gnueabihf-g++) -L$(pwd)/rootfs/usr/lib/arm-linux-gnueabihf/"
   ```

   *note the -L linker argument pointing to the absolute path of libx11 on the chroot/rootfs*

1. Tell `yarn` you want to cross-compile native modules for ARM:
   
   ```bash
   export npm_config_arch=arm
   ```

1. Build VS Code and create a .deb file (for easier installation on the target device) as usual:

   ```bash
   yarn
   yarn run gulp vscode-linux-arm-min
   yarn run gulp vscode-linux-arm-build-deb
   ```
