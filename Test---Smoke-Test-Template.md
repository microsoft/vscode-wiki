- [ ] Windows
- [ ] macOS
- [ ] Linux

Complexity: 2

---

**Instructions**
* make sure you are on a node.js version that is compatible with building VSCode
* download insiders and stable builds of VSCode matching your platform
* clone `vscode` to a local folder
* `yarn && yarn compile`
* `yarn --cwd test/smoke`
* `node build/lib/preLaunch.js`
* `yarn smoketest --build <path to latest version> --stable-build <path to stable version>`

If the automated tests fail, create and issue for that and run the tests manually: https://github.com/microsoft/vscode/wiki/Smoke-Test