We are using `@types/vscode` for publishing `vscode.d.ts`. See https://github.com/Microsoft/vscode/issues/70175 for details.

For each release, we will need to publish a new version to DefinitelyTyped. Here are the steps:

1. When you publish a tag such as `1.34.0`
2. CI creates a branch `vscode-types-1.34.0` at https://github.com/DefinitelyTyped/DefinitelyTyped with commit message `VS Code 1.34.0 Extension API`.
3. Manually create a PR for that branch. Note that if this is your first endgame, you might want to fork the repo first, in case the CI fails and you don't have write permissions to add onto it.
4. Ask either @jrieken, @kieferrm or @egamma to merge the PR.
5. `@types/vscode` will be published in ~10 minutes.
