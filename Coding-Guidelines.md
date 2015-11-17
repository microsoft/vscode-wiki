While these guidelines are mainly meant for contributors to the TypeScript project, certain suggestions apply as to how idiomatic TypeScript code should be written (e.g. the "Names" and "Style" sections).

## Names
1. Use PascalCase for type names.
3. Use PascalCase for enum values.
4. Use camelCase for function names.
5. Use camelCase for property names and local variables.
7. Use whole words in names when possible.

## Types
1. Do not export types/functions unless you need to share it across multiple components.
2. Do not introduce new types/values to the global namespace.

## Comments
1. Use JSDoc style comments for functions, interfaces, enums, and classes.

## Strings
1. Use double quotes for strings shown to the user that need to be externalized.
2. Use single quotes otherwise. 
3. All strings visible to the user need to be externalized.

## Style

1. Use arrow functions over anonymous function expressions.
2. Only surround arrow function parameters when necessary. <br />For example, `(x) => x + x` is wrong but the following are correct:
  1. `x => x + x`
  2. `(x,y) => x + y`
  3. `<T>(x: T, y: T) => x === y`
3. Always surround loop and conditional bodies with curly braces.
4. Open curly braces always go on the same line as whatever necessitates them.
5. Parenthesized constructs should have no surrounding whitespace. <br />A single space follows commas, colons, and semicolons in those constructs. For example:
  1. `for (var i = 0, n = str.length; i < 10; i++) { }`
  2. `if (x < 10) { }`
  3. `function f(x: number, y: string): void { }`

