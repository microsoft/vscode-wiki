### Development

Check out the [xterm.js contribution documentation](https://github.com/sourcelair/xterm.js#development-and-contribution) for how to work on the project.

### Pulling changes into VS Code

Since xterm.js is on a [month release cycle](https://github.com/sourcelair/xterm.js#releases) we need to do a little extra work to pull our changes into VS Code quickly in order to get better test coverage from Insiders. Since we're working with git, it's pretty easy to pull in changes that are blocked on PR.

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

2. If the release branch is a new branch we need to modify `.gitignore` to remove the `lib` so we can commit the compiled javascript.
3. Build the library:

  ```bash
  npm i
  npm run build
  ```

4. Commit and push

  ```bash
  git add .
  git commit -m "Build lib"
  git push
  ```

5. Get the commit hash:

  ```bash
  git show # record the commit hash
  ```

6. Go to the vscode repo and update the `xterm` entry in `npm-shrinkwrap.json` to point to the new commit:

  ```js
  {
    "xterm": {
    "version": "2.7.0",
    "from": "Tyriar/xterm.js#vscode-release/1.14",
    "resolved": "git+https://github.com/Tyriar/xterm.js.git#<commit>"
  },
  ```
7. Reinstall the xterm module

  ```bash
  rm -rf node_modules/xterm
  ./scripts/npm.sh install
  ```