We are using `@types/vscode` for publishing `vscode.d.ts`. See https://github.com/Microsoft/vscode/issues/70175 for details.

> **Note:** The steps in the bottom section refer to a CI task that is currently broken. @roblourens is trying to fix it. Until then, we will submit the PR to update the types manually. Just do this carefully- once published, we cannot unpublish a `@types/vscode` version.

1. Create your own fork of https://github.com/DefinitelyTyped/DefinitelyTyped, and create a PR branch
2. Update `types/vscode/index.d.ts` by copying the vscode.d.ts from our release branch. But leave the comment headers in place.
3. **Important**: Update the two version numbers in those comment headers to the newly published vscode version number. The first comment header is what determines the published version of the `@types/vscode` package.
4. Submit the PR
5. If there are any lint failures in the CI job for the PR, you can disable tests in either the `tslint.json` or `.eslintrc.json` files. But first check to make sure that the lint failure isn't pointing out a real issue in our vscode.d.ts or with the copy/paste job.
4. Ask either @jrieken or @kieferrm to merge the PR.
5. `@types/vscode` will be published in ~10 minutes.

## Recovery
- We don't easily have the ability to publish a patch release for a previous minor release - e.g. once 1.75.0 is published, we can't publish a 1.74.1. In theory we could merge a PR to change the version in main back to 1.74, which would publish a 1.74 patch release, then merge another PR to move it back to 1.75, which would publish an unnecessary 1.75.1. But if you need to do this, check with a DefinitelyTyped maintainer that this will actually work as expected.
- Per npm rules, we can't unpublish packages since `@types/vscode` has dependent packages.
- However, we can mark packages as deprecated with a warning that is shown when it is installed.

---

## Publishing via CI (not currently working)

For each release, we will need to publish a new version to DefinitelyTyped. Here are the steps:

1. When you publish a tag such as `1.34.0`
2. CI creates a branch `vscode-types-1.34.0` at https://github.com/DefinitelyTyped/DefinitelyTyped with commit message `VS Code 1.34.0 Extension API`.
3. Manually create a PR for that branch. Note that you might want to fork the repo first, in case the CI fails and you don't have write permissions to add onto it.
4. Ask either @jrieken, @kieferrm or @egamma to merge the PR.
5. `@types/vscode` will be published in ~10 minutes.
