### Development

Check out the [xterm.js contribution documentation](https://github.com/xtermjs/xterm.js/wiki/Contributing) for how to work on the project.

### Managing issues

Since bugs and/or features manifest themselves in both VS Code and xterm.js, it's a little unclear initially where the issue(s) should be created. After some experimentation I landed on the best way to deal with this is to create the an issue in both the Microsoft/vscode and xtermjs/xterm.js repositories. The reason this is the best workflow is because the changes will then be verified during endgame and it's much easier to compose release notes for the terminal changes. This guideline is less important for more obscure terminal issues where it's typically easier to keep a single source of truth in the xterm.js repo.

### Updating `xterm`

Since June 2019 we use the official `xterm` module provided by the upstream project instead of the [`vscode-xterm`](https://github.com/microsoft/xterm.js) fork in order to save time it takes to update the module. Every commit that goes into the master branch of [xterm.js](https://github.com/xtermjs/xterm.js) is automatically released under the beta tag using Azure Pipelines. To update, follow these steps:

1. Identify the release to be used and install it. If you want the latest beta based on master you can run `yarn add xterm@beta` (also do this in the `remote/` and `remote/web` folders). If you want an older commit the easiest way to do this right now is to identify the commit and then find the "Merge pull request" build on this [pipeline](https://dev.azure.com/xtermjs/xterm.js/_build?definitionId=3), click into the "Release" job and view the output of the "Publish to npm" step to find the version number then install it with `yarn add xterm@x.y.z-betaX`
2. Update the typings in `./src/typings/xterm.d.ts` by copying over the content and replacing the top portion with `./node_modules/xterm/typings/xterm.d.ts`.
3. Build/test locally to make sure it works or push a branch and do a PR so that tests are run automatically. If the version change is significant it's a good idea to do a product build and verify it passes fully.
4. Ideally write the commit message in the following format:

   ```
   xterm@4.2.0-beta18

   Diff: https://github.com/xtermjs/xterm.js/compare/91cbeec...eb25243

   - Change 1...
   - Change 2...
   ```

### Updating `xterm-addon-*`

Similar to `xterm`, identify the release, pull it in and then update the typings. There are some typings hacks at the top due to issues with `gulp-tsb`.

Once [xtermjs/xterm.js#2165](https://github.com/xtermjs/xterm.js/issues/2165) is done we can refine this process more.

### Building one off builds of xterm and addons

Right now one off builds are manual. [xtermjs/xterm.js#2154](https://github.com/xtermjs/xterm.js/issues/2154) will improve this.
