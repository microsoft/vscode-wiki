To build for a target architecture different than the host (e.g. using x64 to build for ARM), you'll need to do the following:

**One-Time Setup**

1. install prerequisites:

   ```
   sudo apt-get install qemu qemu-user-static debootstrap gcc-arm-linux-gnueabihf g++-arm-linux-gnueabihf
   ```

2. create a chroot/rootfs for the target architecture:

   ```
   sudo qemu-debootstrap --arch=armhf --variant=minbase xenial rootfs
   ```

3. install libx11-dev on the chroot/rootfs:

   ```
   sudo chroot rootfs apt-get install -y libx11-dev
   ```

**Build**

1. point to the target toolchain on the build host:

   ```
   export CC=$(which arm-linux-gnueabihf-gcc)
   export CXX="$(which arm-linux-gnueabihf-g++) -L$(pwd)/rootfs/usr/lib/arm-linux-gnueabihf/"
   ```

   *note the -L linker argument pointing to the absolute path of libx11 on the chroot/rootfs*

2. install prerequisites for the target architecture:

   ```
   yarn --arch=armhf
   ```

3. create a .deb file for easy installation on the target device:

   ```
   yarn run gulp vscode-linux-arm-min
   yarn run gulp vscode-linux-arm-build-deb
   ```