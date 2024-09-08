Test flakiness slows down the whole team by making the pipeline less reliable, resulting in a bunch of wasted time investigating. Also, repeated false positives can cause people to care less about health of the pipeline.

**If you have a flaky test, you should disable it ASAP to keep the build green**. Even if the test only failed a couple of times in the past month, not disabling it will cause more wasted effort and more false positives down the line. You can check how often the test is failing in the [ADO dashboards](https://monacotools.visualstudio.com/Monaco/_build?definitionId=111&view=ms.vss-pipelineanalytics-web.new-build-definition-pipeline-analytics-view-cardmetrics).

Here are some strategies for dealing with flakiness:

- **Timeouts**: Timeouts are inherently flaky as they depend on CPU speed, cores, other processes, etc. Polling is almost always a better approach.
- **Retries**: Retrying a test can work around a flaky test temporarily, but should generally not be used in the long term. If a test needs to be retried, it means there's an underlying error being hidden and a flake could still end up happening (based on the flake rate). Retrying can be a good strategy when the test failure is acceptable and it's not worth the effort to investigate.
- **Async vs sync**: If a test can be written in a synchronous way (mostly for unit tests) this is preferable.
- **Reproducing locally**: You might be able to reproduce the failure locally by wrapping the test in a loop:
   ```ts
   for (let i = 0; i < 100; i++) {
   	test('the flaky test ' + i, async () => { ... });
   }
   ```
  - Wrap the code under test in `withVerboseLogs` to increase the amount of information you can get out of the test.
  - Also call `mocha.bail` before `mocha.run` in the appropriate `testrunner.js` so that the test run will end on a failure and is easier to find in the output.
- **Test against the product build**: Some failures may only happen in the product build, not out of sources. Integration and [smoke tests](https://github.com/Microsoft/vscode/blob/main/test/smoke/README.md) can both run against the product build:
   ```sh
   # Integration tests
   export INTEGRATION_TEST_ELECTRON_PATH=<install dir>
   ./scripts/test-integration.sh --build

   # Smoke tests
   npm run smoketest --build <install dir>
   ```
- **Check the logs**: Log files (client and server) are available in Azure Pipelines for all tests except the unit tests as artifacts on the build. Look for the "n published" link under Related on the build summary page.
  - If the logs don't provide any useful information, try improving the assert failure message to provide more information about the state when the test failed. You might need to wrap a timeout failure in a try/catch and add an `assert.fail` within the catch block.
- **Playback Playwright traces**: Browser smoke tests can be played back on https://trace.playwright.dev/ by downloading the `playwright-trace-*.zip` build artifacts under `logs-<platform>-*` -> `smoke-tests-browser`.
