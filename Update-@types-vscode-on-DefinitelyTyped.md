We are using `@types/vscode` for publishing `vscode.d.ts`. See https://github.com/Microsoft/vscode/issues/70175 for details.

For each release, we will need to publish a new version to DefinitelyTyped. Here are the steps:

1. Copy `src/vs/vscode.d.ts` from `release/<VERSION>` branch.
2. Prepare a PR for DefinitelyTyped. You only need to modify this [file](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/vscode/index.d.ts):
    - Replace the whole `declare module vscode` block with content from `vscode.d.ts`
    - Update the first line's version number `// Type definitions for Visual Studio Code <VERSION>`
    - Update the description's version number `Type Definition for Visual Studio Code <VERSION> Extension API`