- [ ] Windows
- [ ] macOS
- [ ] Linux

Complexity: 2

---

**PLEASE READ THIS FIRST**
The documentation link below explains how to run the smoke test against web and remote too, but this item is ONLY for running the smoke tests against a native client on Windows, macOS and Linux. You do NOT have to run web or remote smoke tests because those run automated in our CI.

**NOTE:** Desktop tests MUST run with `--build` argument

**NOTE:** Desktop tests MUST run with `--stable-build` argument additionally

Documentation: https://github.com/Microsoft/vscode/blob/main/test/smoke/README.md#run.

If the automated tests fail, create and issue for that and run the tests manually: https://github.com/microsoft/vscode/wiki/Smoke-Test