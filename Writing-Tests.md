# Writing Tests

VS Code has several types of tests:

- [Unit tests](#unit-tests) that run against VS Code itself
- [Integration Tests](#integration-tests) that test more real-world scenarios
- [Extension Tests](#extension-tests) that run against built-in extensions
- [Smoke Tests](./Smoke-Test.md) that test end-to-end in a real editor

## Unit Tests

Unit tests are the files in `src/vs/**/*.test.ts`. Depending on the [layering](./Source-Code-Organization.md), a test may run in...

- Browsers (in `common` or `browser`),
- Electron (in `common`, `browser`, or `electron-sandbox`),
- or Node.js (in `common` or `node`)

Tests can be run manually on the command line, see the instructions [here](https://github.com/microsoft/vscode/blob/main/test/unit/README.md#L1). They can also be run from the VS Code UI using the [Selfhost Test Provider](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-selfhost-test-provider).

### Writing Tests

**Infrastructure**

Unit tests are written using Mocha's BDD interface. We use the [`sinon`](https://sinonjs.org/releases/latest/) library for mocks, and the [`assert`](https://nodejs.org/api/assert.html) module for making assertions.

When using Sinon, you should make sure to call `sinon.restore()` in your `teardown` block to avoid leaking memory

**Ensuring Clean Teardown**

When writing new tests or updating old ones, you should use the `ensureNoDisposablesAreLeakedInTestSuite()` helper function in your test suite to make sure code is torn down cleanly. This can find bugs both in tests as well as the code you're testing. Use it like so:

```js
suite('myCoolTests', () => {
  setup(() => { /* ... */ });
  teardown(() => { /* ... */ });

  ensureNoDisposablesAreLeakedInTestSuite();
});
```

**Snapshot Testing**

Aside from that, we also support Jest-like [snapshot tests](https://jestjs.io/docs/snapshot-testing) using the `assertSnapshot` helper. [Here's an example](https://github.com/microsoft/vscode/blob/01029a44a2f6b3eef401849612b4a08b532c62bb/src/vs/base/test/node/snapshot.test.ts#L124-L145).

The first time you run a snapshot-containing test, the snapshot will be written to the `__snapshots__`` directory beside the test file. Look at the output file and verify that it's sensible with what you expected. On subsequent runs, the output will be compared to the snapshot file, and differences will fail the test.

## Integration Tests

The layout and authoring of integration tests is identical to [Unit Tests](#unit-tests), but their files are suffixed with `.integrationTest.ts` instead of `.test.ts`. Tests that use real external APIs that are more prone to slowness or failure should be written as integration tests.

They are supported by the Selfhost Test Provider, and can be run from the CLI can be executed using `./scripts/test-integration` or by manually running `./scripts/test.sh --runGlob **/*.integrationTest.js`.

## Extension Tests

Extension tests are written using the standard, public [extension testing system](https://code.visualstudio.com/api/working-with-extensions/testing-extension). They are not supported by the selfhost test provider _yet_. They can be executed using `./scripts/test-integration`, or by running the launch configs found in individual extensions' folders.
