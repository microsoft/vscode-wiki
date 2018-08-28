# Setting description styleguide

This page describes style guidelines for writing descriptions for settings.

- `description`/`enumDescriptions` is rendered as plain text. `markdownDescription`/`markdownEnumDescriptions` is rendered as markdown. Be careful to use the correct one. If you are using links, backticks, lists, etc use the markdown property.
- Commands, keycodes, code snippets, or other "data items" must be in backticks with no quotes.
- Descriptions should be understandable by non-developers or users who don't know everything about vscode.
- Don't use "we" to mean "vscode".
- Use "macOS" instead of "OS X"
- Descriptions and enumDescriptions must end in a period.
- Bools
  - Use "Controls whether" instead of "Controls if". (Other wordings are ok)
  - Use enabled/disabled or other language instead of true/false.
- Enums
    - Ideally, enum settings should have a description and enum values clear enough that enumDescriptions aren't needed. But if the enum values aren't self-evident, enum settings should have enumDescriptions.
        - Example of enum without enumDescriptions: `editor.cursorStyle`.
	- An enum setting description should not duplicate info in the enumDescriptions (enumDescriptions will be rendered next to the description in both setting editors).
        - The description shouldn't list the possible enum values.
	- If enumDescriptions is specified, the length of enumDescriptions must match the length of enum. An empty string for an enumDescription is ok, if the value is self-evident. Example:
![image](https://user-images.githubusercontent.com/323878/42973896-f92c6a0e-8b69-11e8-9c8e-a3e937a48098.png)

    - Enum values mentioned in a description must be in backticks with no quotes.
    - Note - if an enum setting has more than 10 options, its enum descriptions will be rendered inline inside the dropdown control (or in the old settings editor, only in the suggest widget). As far as I can tell, this only affects `files.encoding`.
    - Avoid using links in enumDescriptions, because they will not be clickable.
- Links
	- Settings should have a markdown-style link to documentation when relevant docs exist
    - Example:

```ts
'search.exclude': {
    type: 'object',
    description: nls.localize('exclude', "[snip] [Read more about glob patterns](https://code.visualstudio.com/docs/editor/codebasics#_advanced-search-options)."),
```

- Other setting references
	- All references to other settings must be written in the following special format, which is rewritten into a link by the settings editor:

```
`#editor.detectIndentation#`
```
