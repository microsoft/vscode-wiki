Test flakiness slows down the whole team by making the pipeline less reliable, resulting in a bunch of wasted time investigating. Also, repeated false positives can cause people to care less about health of the pipeline.

**If you have a flaky test, you should disable it ASAP to keep the build green**. Even if the test only failed a couple of times in the past month, not disabling it will cause more wasted effort and more false positives down the line.

Here are some strategies for dealing with flakiness:

- **Timeouts**: Timeouts are inherently flaky as they depend on CPU speed, cores, other processes, etc. Polling is almost always a better approach.
- **Retries**: Retrying a test can work around a flaky test temporarily, but should generally not be used in the long term. If a test needs to be retried, it means there's an underlying error being hidden and a flake could still end up happening (based on the flake rate). Retrying can be a good strategy when the test failing is acceptable and it's not worth the effort to investigate.
- **Async vs sync**: If a test can be written in a synchronous way (mostly for unit tests) this is preferable.
- **Reproducing locally**: You might be able to reproduce the failure locally by wrapping the test in a loop:
   ```ts
   for (let i = 0; i < 100; i++) {
   	test('the flaky test ' + i, async () => { ... });
   }
   ```
- **Test against the product build**: Some failures may only happen in the product build, not out of sources. Integration and [smoke tests](https://github.com/Microsoft/vscode/blob/main/test/smoke/README.md) can both run against the product build:
   ```sh
   # Integration tests
   export INTEGRATION_TEST_ELECTRON_PATH=<install dir>
   ./scripts/test-integration.sh --build

   # Smoke tests
   yarn smoketest --build <install dir>
   ```
- **Check the logs**: Log files (client and server) are available in Azure Pipelines for all tests except the unit tests as artifacts on the build. Look for the "n published" link under Related on the build summary page.
- **Playback Playwright traces**: Browser smoke tests can be played back on https://trace.playwright.dev/ by downloading the `playwright-trace-*.zip` build artifacts under `logs-<platform>-*` -> `smoke-tests-browser`.