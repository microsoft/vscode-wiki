We are using `@types/vscode` for publishing `vscode.d.ts`. See https://github.com/Microsoft/vscode/issues/70175 for details.

For each release, we will need to publish a new version to DefinitelyTyped. Here are the steps:

1. When you publish a tag such as `1.34.0`, a new commit will be created at https://github.com/microsoft/vscode-DefinitelyTyped with commit message `VS Code 1.34.0 Extension API`.
2. Use [this link](https://github.com/DefinitelyTyped/DefinitelyTyped/compare/master...octref:master?quick_pull=1&body=Updating%20VS%20Code%20Extension%20API.%20See%20https%3A%2F%2Fgithub.com%2Fmicrosoft%2Fvscode%2Fissues%2F70175%20for%20details.) to send a PR to DefinitelyTyped.
3. Ask either @octref, @jrieken, @kieferrm or @egamma to merge the PR.
4. `@types/vscode` will be published in ~10 minutes.