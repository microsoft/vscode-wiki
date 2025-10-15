VS Code use a set of custom [ESLint](http://eslint.org) to enforce repo specific coding rules and styles. Thees custom rules are run in addition to many standard ESLine rules. Example custom rules includes:

- Enforcing proper code layering
- Preventing checking in of `test.only(...)`
- Enforcing conventions in `vscode.d.ts`

This doc provides a brief overview of how these rules are setup and how you can add a new one

# Resources
- [ESLint rules](https://eslint.org/docs/latest/extend/custom-rules) — General documentation about writing eslint rules
- [TypeScript ASTs and eslint](https://typescript-eslint.io/blog/asts-and-typescript-eslint/) — Look at how ESLint works with TS programs
- [TypeScript ESLint playground](https://typescript-eslint.io/play/#showAST=es) — Useful tool for figuring out the structure of TS programs and debugging custom rule selectors


# Custom Rule Configuration

Custom rules are defined in the `.eslint-plugin-local` folder. Each rule is defined in its own TypeScript file. These follow the naming convention:

- `code-RULE-NAME.ts` — General rules that apply to the entire repo.
- `vscode-dts-RULE-NAME.ts` — Rules that apply just to `vscode.d.ts`.

These rules are then enabled in the `eslint.config.js` file. This is the main eslint configuration for our repo. It defines a set of file scopes which rules should apple to files in those scopes.

For example, here's a configuration that enables the no `test.only` rule in all `*.test.ts` files in the VS Code repo:

```
{
    // Define which files these rules apply to
    files: [
        '**/*.test.ts'
    ],
    languageOptions: { parser: tseslint.parser, },
    plugins: {
        'local': pluginLocal,
    },
    rules: {
         // Enable the rule from .eslint-plugin-local/code-no-test-only.ts
        'local/code-no-test-only': 'error',
    }
}
```

# Creating a new custom rule

...



