
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
- VSCode defines a list of default styling rules that maps token classifications (e.g. `variable.readonly`) to TextMate scope(s) (`variable.other.constant`). To evaluate the style for a token, the current color theme is probed against the scope(s). If the theme has a rule that matches, then the token is rendered with the rule's style. If no rule matches, the semantic token is not rendered.


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

> I'm a theme author, do I need to change my theme to make it work with semantic highlighting?

No, themes don't need to change anything. Each semantic token has one or more TextMate scopes associated (see table below). To evaluate the style for a semantic token, the theme is probed against the these scope.

If a theme rule matches, the semantic token is rendered with the rule's style. If no theme rule matches, the semantic token is not rendered (that means the underlying syntax token prevails).

No new colors or styles are added. Only the styles that the theme defines are used, and semantic tokens are only shown if the theme has a rule for the tokens associated TextMate scope.

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