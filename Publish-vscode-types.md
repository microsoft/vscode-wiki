We are using `@types/vscode` for publishing `vscode.d.ts`. See https://github.com/Microsoft/vscode/issues/70175 for details.

> **Note:** The steps in the bottom section refer to a CI task that is currently broken. @roblourens is trying to fix it. Until then, we will submit the PR to update the types manually. Just do this carefully- once published, we cannot unpublish a `@types/vscode` version.

Example of PR when releasing 1.84 - https://github.com/DefinitelyTyped/DefinitelyTyped/pull/67287/files.

1. Create your own fork of https://github.com/DefinitelyTyped/DefinitelyTyped, and create a PR branch
2. Update `types/vscode/index.d.ts` by copying the vscode.d.ts from our release branch. But leave the comment header in place -- we mean this one:

```
/**
 * Type Definition for Visual Studio Code <Major Version>.<Minor Version> Extension API
 * See https://code.visualstudio.com/api for more information
 */
```

3. Update the version number in the comment header to the newly published vscode version number
4. Update the minor version in `"version"` property in `types/vscode/package.json`, e.g., `1.83.9999` to `1.84.9999` (`9999` is not just an example)
5. Submit the PR
   - If there are any lint failures in the CI job for the PR, you can disable tests in either the `tslint.json` or `.eslintrc.json` files. But first check to make sure that the lint failure isn't pointing out a real issue in our `vscode.d.ts` or with the copy/paste job.
6. Ask either @jrieken or @kieferrm to merge the PR.
7. `@types/vscode` will be published in ~10 minutes.
8. Make sure a correct version of `@types/vscode` was published, e.g., if you're releasing VS Code 1.84, you should see `@types/vscode` version 1.84.0 [here](https://www.npmjs.com/package/@types/vscode)

## Recovery

- We don't easily have the ability to publish a patch release for a previous minor release - e.g. once 1.75.0 is published, we can't publish a 1.74.1. In theory we could merge a PR to change the version in main back to 1.74, which would publish a 1.74 patch release, then merge another PR to move it back to 1.75, which would publish an unnecessary 1.75.1. But if you need to do this, check with a DefinitelyTyped maintainer that this will actually work as expected.
- Per npm rules, we can't unpublish packages since `@types/vscode` has dependent packages.
- However, we can mark packages as deprecated with a warning that is shown when it is installed.
