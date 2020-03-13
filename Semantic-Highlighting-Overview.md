## Semantic Highlighting

In 1.43 we enabled Semantic Highlighting as a [new feature](https://code.visualstudio.com/updates/v1_43#_typescript-semantic-highlighting). 

This resulted in several issues filed by our users like https://github.com/microsoft/vscode/issues/92308.

We went through all the feedback in the issue and identified the following themes:

- users don't appreciate too many coloring changes
- theme authors want more time to test and tune their theme to semantic highlighting

For the recovery build 1.43.1, planned for next week, we have therefore decided on the following steps:
- give themes a way to opt-in to semantic highlighting
- only the built-in themes have semantic coloring enabled by default, all other themes can be enabled by the theme author or in the user settings.
- show a notification when semantic coloring shows up the first time. The notification will point to the docs with background and information on how to configure the feature.
- fix the bugs found related to wrong token classification and color lookup.
- no longer add semantic color in imports

## FAQ

### What is the difference between syntax and semantic highlighting

Syntax highlighting colors the text based on lexical rules. In the VS Code the lexical rules are expressed as regular expressions contained in a TextMate grammar. 

Semantic highlighting enriches the syntax coloring based on symbol information from a language service that has the full understanding of the project. Based on this understanding each identifier gets colored & styled with the color of the symbol it resolves to. A constant variable name is rendered as such throughout the file, not just at its declaration. Same for parameter names, property names, class names and so on.


### Why does my highlighting change comes in with some delay?

The server takes a while to load and analyze the project, that's why the highlighting comes in delayed depending on the project size.

### My theme is not ready for semantic coloring, can I disable it?

In 1.43.1, we add a feature to give a theme a way to opt-in to semantic highlighting. In 1.43.1, only built-in themes will have semantic coloring enabled out-of-the-box.

### As a theme author, do I need to change my theme to make it work with semantic highlighting?

Our goal was that this feature works out of the box with all themes. However, we learnt that there are:
- some issues in our implementation that make themes look broken 
- themes need to be tuned further by its authors to take advantage of the new highlighting possibilities.

More information and guidance for theme authors is coming.

### The semantic highlighting for TypeScript / JavaScript files looks wrong. How can I debug this?

Set the cursor to the symbol to inspect and run the `Developer: Inspect Editor Tokens and Scopes` command.

![](https://user-images.githubusercontent.com/57580/76448823-5f6bb480-63a1-11ea-862e-d59db8599a73.png)

`Semantic token type` and `modifiers` show the classification that was evaluates for the given symbol and the TextMate scope that was used to style the token.

Please file an issue against [that repo](https://github.com/aeschli/typescript-vscode-sh-plugin) if you feel the classification is wrong. Please add a small code sample to reproduce along what classification you expect.

[This Readme](https://github.com/aeschli/typescript-vscode-sh-plugin/blob/master/README.md) describes the token types and modifiers that the TypeScript / JavaScript semantic highlighter produces, along with a list of known issues.

### Known issues
- symbols that are functions as well as objects (e.g. `require`) are classified as variables. 
- `Promise.resolve`: `Promise` is a variable instead of a class. 

## SemanticTokensProvider API (proposed)

  - 3 flavors:
	- tokens for a range (e.g. view port)
	- tokens for the full document
	- tokens for the full document with a reference to the previous result: Result will be reported as delta (`SemanticTokenEdits`)

  - optimized to minimize response sizes
	- using number arrays for all information: line, character, length, token-classification
	- token classification is split into __token type__ and __token modifier__ and represented as an __index into a legend__. Legend is provided when the provider is registered.
	- lines and characters are relative to the previous token in order to reduce the number of `SemanticTokenEdits` needed to report a delta.
  - pull model (LS provides token on demand).

## Token Classification
 - token classification is split into __token types__ and __token modifiers__
 - standard token types and token modifiers defined by us
 - standard token types:
	- `namespace`,
	- `type`, `class`, `enum`, `interface`, `struct`, `typeParameter`
	- `parameter`, `variable`, `property`, `enumMember`, `event`
	- `function`, `member`, `macro`
	- `label`,
	- `comment`, `string`, `keyword`, `number`, `regexp`, `operator`
 - standard token modifiers:
    - `declaration`
	- `readonly`, `static`, `deprecated`, `abstract`
	- `async`, `modification`, `documentation`
 - extensions can contribute new types and modifiers along with default styling rules
```jsonc
"contributes": {
	"semanticTokenTypes": [{
		"id": "testToken", 
		"description": "A test token"
	}],
	"semanticTokenModifiers": [{
		"id": "testModifier", 
		"description": "A test modifier"
	}],
	"semanticTokenStyleDefaults": [
		{
			"selector": "testToken",
			"scope": [ "entity.name.variable.special" ]
		},
		{
			"selector": "testToken.testModifier",
			"scope": [ "entity.name.variable.special.extra" ]
		}
	]
}
```
## Token Styling
- VSCode defines a [default mapping](#token-classification-to-textmate-scopes-mapping) of token classifications to TextMate scope(s). To evaluate the style for a token, the current color theme is probed against the TextMate scope(s). If the theme has a rule that matches, the token is rendered with the rule's style. If no rule matches, the semantic token is not rendered (that means the regular syntax highlighting is used instead).


- Experimental: Themes and user settings can define rules to assign classifications to styles (foreground, italic, underline, bold)

```
    "editor.tokenColorCustomizationsExperimental": {
        "property.readonly": {
            "foreground": "#35166d"
        },
        "*.declaration": {
            "fontStyle": "underline"
        }
    }
```

## Highlighting in the editor
- Semantic tokens are merged with syntax (TextMate) tokens, semantic tokens win
- language and standard token classification (string, regex, comment) is still done with the TextMate grammars
- Setting `editor.semanticHighlighting.enable` to turn feature on/off (also per language)

## Try it out:

- Latest insiders ( >20200116)
- Open TypeScript file
- use `Inspect Editor Tokens and Scopes` to see the semantic tokens classifications
- set theming rules with `editor.tokenColorCustomizationsExperimental`

Planned work and work in progress:
- LSP proposal in work by @dbaeumer
- extended theming rules syntax (- operator)
- use new token types in the built-in themes


## FAQ

### 

### As a theme author, do I need to change my theme to make it work with semantic highlighting?

No, themes are not required to change anything. Semantic highlighting doesn't add any new styles or colors. It uses the theme to evaluate the color and styles of the semantic tokens it draws on top to the syntax highlighting.

Each semantic token has one or more TextMate scopes associated (see [table below](#token-classification-to-textmate-scopes-mapping)). To evaluate the style for a semantic token, the scope is matched against the theme's rules.

If a theme rule matches, the semantic token is rendered with the rule's style. If no theme rule matches, the semantic token is not rendered (that means the underlying syntax highlight prevails).

If a theme wants to take advantage of the semantic tokens, it can decide to add more rules. The [table below](#token-classification-to-textmate-scopes-mapping) for the scopes to match.

### The semantic highlighting for TypeScript / JavaScript files looks wrong. How can I debug this?

Set the cursor to the symbol to inspect and run the `Developer: Inspect Editor Tokens and Scopes` command.

![](https://user-images.githubusercontent.com/57580/76448823-5f6bb480-63a1-11ea-862e-d59db8599a73.png)

`Semantic token type` and `modifiers` show the classification that was evaluates for the given symbol and the TextMate scope that was used to style the token.

Please file an issue against [that repo](https://github.com/aeschli/typescript-vscode-sh-plugin) if you feel the classification is wrong. Please add a small code sample to reproduce along what classification you expect.

[This Readme](https://github.com/aeschli/typescript-vscode-sh-plugin/blob/master/README.md) describes the token types and modifiers that the TypeScript / JavaScript semantic highlighter produces, along with a list of known issues.

### Known issues
- symbols that are functions as well as objects (e.g. `require`) are classified as variables. We probably need to show them according to their actual use. 
- `Promise.resolve`: `Promise` is a variable instead of a class. That's unfortunately what the d.ts for Promise declares.


## Links:

- API: [vscode.proposed.d.ts#L223](
https://github.com/Microsoft/vscode/blob/master/src/vs/vscode.proposed.d.ts#L223)
- Latest standard token types and modifiers:
[tokenClassificationRegistry.ts#L364](https://github.com/Microsoft/vscode/blob/master/src/vs/platform/theme/common/tokenClassificationRegistry.ts#L364)
- Semantic highlighting for JS in HTML:
[javascriptSemanticTokens.ts](https://github.com/microsoft/vscode/blob/master/extensions/html-language-features/server/src/modes/javascriptSemanticTokens.ts)
- Sample:
[semantic-tokens-sample](https://github.com/microsoft/vscode-extension-samples/blob/master/semantic-tokens-sample)

## Token Classification to TextMate Scopes Mapping

- `namespace`: `entity.name.namespace`
- `type`: `entity.name.type` | `support.type`
- `struct`: `storage.type.struct`
- `class`: `entity.name.type.class`
- `interface`: `entity.name.type.interface`
- `enum`: `entity.name.type.enum`
- `function`: `entity.name.function` | `support.function`
- `member`: `entity.name.function.member` | `support.function`
- `macro`: `entity.name.other.preprocessor.macro`
- `variable`: `variable.other.readwrite` | `entity.name.variable`
- `variable.readonly`: `variable.other.constant`
- `parameter`: `variable.parameter`
- `property`: `variable.other.property`
- `property.readonly`: `variable.other.constant.property`
- `enumMember`: `variable.other.enummember`
- `event`: `variable.other.event`