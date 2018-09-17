### Development

Check out the [xterm.js contribution documentation](https://github.com/xtermjs/xterm.js#development-and-contribution) for how to work on the project.

### Managing issues

Since bugs and/or features manifest themselves in both VS Code and xterm.js, it's a little unclear initially where the issue(s) should be created. After some experimentation I landed on the best way to deal with this is to create the an issue in both the Microsoft/vscode and xtermjs/xterm.js repositories. The reason this is the best workflow is because the changes will then be verified during endgame and it's much easier to compose release notes for the terminal changes.

### Pulling changes into VS Code

Since xterm.js is on a [month release cycle](https://github.com/xtermjs/xterm.js#releases) we need to do a little extra work to pull our changes into VS Code quickly in order to get better test coverage from Insiders. Since we're working with git, it's pretty easy to pull in changes that are blocked on PR.

Here's what you need to do to pull your changes into VS Code:

1. Checkout the release branch in the fork of xterm.js and merge your change. Right now this is a [personal fork under Tyriar](https://github.com/Tyriar/xterm.js):

   ```bash
   git clone https://github.com/Tyriar/xterm.js
   cd xterm.js
   git checkout vscode-release/1.14 # whatever version
   git remote add branch_source https://github.com/<yourname>/xterm.js
   git fetch branch_source
   git merge branch_source/<pr_branch>
   ```

   Note that there is an individual release branch for each version unlike many other modules we use. This is the case so that there can be a "clean slate" on the following version based off master.

2. Build the library and make sure tests pass:

   ```bash
   yarn
   yarn build
   yarn test
   ```

3. Update `package.json`, the name should be `vscode-xterm` and the version should be `<x>.<y>.<z>-beta<n>`

   ```bash
   "name": "vscode-xterm",
   "version": "3.0.0-beta1",
   ```

4. Commit and push

   ```bash
   git add package.json
   git commit -m "v3.0.0-beta1"
   git push
   ```

5. Publish `vscode-xterm` to npm:

   ```
   npm publish
   ```

   If you don't have permissions ask someone who has published before to add you.

6. Go to the vscode repo and add the new version:

   ```
   rm -rf node_modules/vscode-xterm
   yarn add vscode-xterm@3.0.0-beta1
   ```