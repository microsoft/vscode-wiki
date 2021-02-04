### Updating `node-pty` in vscode
1. Within your `node-pty` folder run:
```
git pull
git clean -xfd
yarn && yarn watch
```
2. Test the changes:
```
node ./examples/fork/index.js
```
3. If everything works well:
```
git commit -m "release number"
git push
```
4. Merge the PR
### Verify the release worked
1. In `electron/package.json`, update `node-pty` version number
2. In `examples/electron`, run:
```
./npm_install.sh
npm start
npm test
```
3. Test the functionality
4. Close the prior milestone