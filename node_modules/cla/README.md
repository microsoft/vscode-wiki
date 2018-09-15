# Command-Line Awesome

Command-Line Awesome is the best command-line options parser
ever designed in the entire world by anyone who is me.

```sh
npm install cla
```

## Features

- Aliases expand as arguments are parsed
- Infinitely nestable subcommands
- Modular subcommand definitions
- Flag group expansions `-abc => -a -b -c`
- Double dash `--` ends parsing (by default)
- Type coersion and extensible type system for option arguments
- Optional Express-style `Runner` for command paths
- Optional automatic `help` output generator
- Strict parsing: unknown options are not parsed
- Does not modify `process.argv`
- 3x shorter to type than `commander`

## Example

A simple echo command with an option to shout.

```js
const {parse, Command, Option, Type} = require('cla');

const Shout = Option({
  name: '--shout',
  description: 'say it annoyingly loud',
  key: 'shout',
  type: Type.Empty(true)
});

const Echo = Command({
  name: 'echo',
  description: 'says what you say to it',
  options: [Shout]
});

const options = parse(Echo, process.argv);

let words = options.args.join(' ');
if(options.shout) words = words.toUpperCase();
console.log(words);
```

```sh
echo Hello World
# => "Hello World" 
```

```sh
echo --shout wat
# => "WAT"
```

```sh
echo please do not --shout
# => "PLEASE DO NOT"
```

## Explainations

Command-Line Awesome is designed to be as clear as possible regarding the
structure of the command-line tool. While `Command` and `Option` may seem
especially verbose compared to chaining-based option parsers like
`commander`, the goal of this project is to make intents obvious without
any obsurities or hidden side-effects. **The tools created with `cla` work
like they read.**

Throughout these feature explanations "atomics" describe the constructs of
the parser which include `Alias`, `Command`, `Flag`, and `Option`.
When demoing the `parse` command, `[,, ...]` is meant to convey the
first two arguments of `process.argv` which are ignored internally and
could be any values.

### Aliases expand as arguments are parsed
Aliases are very power constructs. As the command-line arguments are parsed,
aliases are the first constructs that get evaluated and expanded. Aliases
consist of a `name` string and an `expansion` array of atomics or strings.

```js
const assert = require('assert');
const {parse, Alias, Command} = require('cla');

const install = Command({name: 'install'});
const iAlias = Alias('i', [install]);
const npm = Command({
  name: 'npm',
  aliases: [iAlias],
  commands: [install]
});

const aliasOptions = parse(npm, [,, 'i']);
const fullOptions = parse(npm, [,, 'install']);
assert.deepEqual(aliasOptions, fullOptions);
```

**Warning:** Aliases are so powerful they should be used sparingly. Deciding to use
an alias should require the same amount of consideration as "should I
write a macro for this?" in Lisp or C. Aliases can expand to other aliases,
even the same alias. You may find yourself with infinite expansions. 

> True programming power is measured of how many ways to can shoot yourself in the foot.

### Infinitely nestable subcommands
Commands can be nested as deep as need be. As the arguments are parsed, a
command path is generated creating a scope for option parsing. Each command
essentially has a closure around each of its subcommands where only the
commands along the path effect the output options, in which the lowest
subcommand takes precedence.

```js
const assert = require('assert');
const {parse, Command, Option, Type} = require('cla');

const o2 = Option({name: '--val', key: 'val', type: Type.Empty(2)});
const c2 = Command({name: 'c2', options: [o2]});

const o1 = Option({name: '--val', key: 'val', type: Type.Empty(1)});
const c1 = Command({name: 'c1', options: [o1], commands: [c2]});

const o0 = Option({name: '--val', key: 'val', type: Type.Empty(0)});
const c0 = Command({name: 'c0', options: [o0], commands: [c1]});

assert.equal(parse(c0, [,, '--val']).val, 0);
assert.equal(parse(c0, [,, 'c1', '--val']).val, 1);
assert.equal(parse(c0, [,, '--val', 'c1']).val, 1);
assert.equal(parse(c0, [,, 'c1', 'c2', '--val']).val, 2);
assert.equal(parse(c0, [,, 'c1', '--val', 'c2']).val, 2);
assert.equal(parse(c0, [,, '--val', 'c1', 'c2']).val, 2);
```

### Modular subcommand definitions
The entire API is designed to be modular, leaving subcommands to not
have any knowledge of each other or even their parent commands. This
makes changing old and adding new commands easy as a project evolves.
If a command defines all of its options and only uses those options
to perform its task, no other higher commands will have any effect.

This can be seen in the previous example where an option was overloaded
by each of the commands in the command path. Only the lowest command's
`--val` option had any bearing on the parsed output `val`.

### Flag group expansions `-abc => -a -b -c`
There is only one concrete difference between `Flag` and `Alias` and that
is the restrictions on flags to make flag groups possible. Flags must
begin with a single dash `-` and only have one other character other than
another dash. (You can have `--` but it won't expand, see double dash below).

```js
const assert = require('assert');
const {parse, Command, Flag, Option, Type} = require('cla');

const name = Option({
  name: '--name',
  key: 'name',
  type: Type.String,
  defaultValue: 'Chris'
});
const nameMason = Flag('-m', [name, 'Mason']);
const nameTyler = Flag('-t', [name, 'Tyler']);

const repeat = Option({
  name: '--repeat',
  key: 'repeat',
  type: Type.Number,
  defaultValue: 1
});
const repeatTwice = Flag('-2', [repeat, 2]);

const greet = Command({
  name: 'greet',
  flags: [nameMason, nameTyler, repeatTwice]
  options: [name, repeat]
});

const options = parse(greet, [,, '-m2']);
assert.equal(options.name, 'Mason');
assert.equal(options.repeat, 2);
while(options.repeat--) console.log('Hello', options.name);
```

### Double dash `--` ends parsing (by default)
The double dash is used in Bash and other shells to signify the end of
option arguments, meaning every argument after it is just as it should
look to the program. This is useful for conflicting names and exotic
filenames and most options parsers handle it for the developer.

To disable this feature, the **root** command passed to `parse` must
have `disableDoubleDash` set to `true`.

```js
const {parse, Command} = require('cla');
const tool = Command({
  name: 'my-cli-tool',
  disableDoubleDash: true
});
const options = parse(tool, process.argv);
```

### Type coersion and extensible type system for option arguments
Some option parsers take pride in how dumb they are, making the
developer do all the work in the end regarding inputs.
This is fine for simple programs, but pretending types don't exist
just leaves the developer with the work of maintaining them internally.

The `Type` construct is very simple but just having it makes a slew of
concerns fall away and makes problems easier to solve. All `Option` 
constructs require a type, even if they do not take arguments (i.e. 
`Type.Empty`). Type coersion is no problem, just pass the right type to
each option.

```js
const assert = require('assert');
const {parse, Command, Option, Type} = require('cla');

const count = Option({
  name: '--count',
  key: 'count',
  type: Type.Number,
  defaultValue: 0
});
const double = Command({
  name: 'double',
  options: [count]
});

const options = parse(double, process.argv);
assert(typeof options.count === 'number');
console.log(options.count * 2);
```

#### Included Types

##### Basic types
- `Number`
- `String`
- `Boolean`
- `Date`
- `Json` (not `JSON`)
- `YesNo`: returns `true` if the argument begins with a "y" otherwise `false`

##### Filesystem types
These types call `fs.statSync` on their arguments and throw if the
argument is not a valid path, the path does not exist, or the entry at
the path is not of the correct type by checking `stats.isFile()` for example.

- `File`
- `Directory`
- `BlockDevice`
- `CharacterDevice`
- `FIFO`
- `Socket`

##### Complex types
- `Empty(x)`: Returns a type that takes no arguments but assigns
  `x` to its option's `key` if it is used in the parsed arguments.
- `List(Type, count)`: Returns a type taking `count` number of arguments
  of type `Type`.
- `Tuple(...Types)`: Returns a type that takes a number of arguments equal
  to the number of types supplied. Each argument is coerced by the matching
  type at the same index.

##### Custom Types
Developers can define their own types. To demonstrate the power of types,
here is how a `Glob` type can be defined that expands a glob path before
it even reaches the logic to interpret the parsed options.

```js
// ./my-types/glob.js
const glob = require('glob');
const {Type} = require('cla');

function Glob(options) {
  return Type({
    name: 'Glob',
    parameters: 'Glob',
    argCount: 1,
    defaultValue: [],
    value(path) {
      return glob.sync(path, options);
    }
  });
}

module.exports = Glob;
```

```js
const assert = require('assert');
const {parse, Command, Option} = require('cla');
const Glob = require('./my-types/glob');

const files = Option({
  name: '--files',
  key: 'files',
  type: Glob()
});
const find = Command({
  name: 'find',
  options: [files]
});

const options = parse(find, process.argv);
assert(Array.isArray(options.files));
```

### Optional Express-style `Runner` for command paths
Any time when writing CLI tools, the option parser will take the arguments
and return the parsed options and leave the developer to map the options
to another program's API. Often times this means writing non-reusable,
non-modular, procedural code with quite a few switch statements and
duplication of logic. This is especially apparent with subcommands.

Since the option parser generates a command path, the `Runner` utility helps
abstract subcommand routing in a way similar to Express/Connect routing.

```js
const {parse, Runner} = require('cla');
const tool = require('./my-cli-tool');

// add a help subcommand
const Help = Command({name: 'help'});
tool.commands.push(Help);

const main = Runner()
  .use((options, next) => {
    // will be called every time
    next();
  })
  .use(Help, (options, next) => {
    // will be called if the first subcommand is 'help'
    // see the `help` utility below
    next();
  })
  .use('help', (options, next) => {
    // will be called just like the route above, however
    // the above is more maintainable if the name changes
    next();
  })
  .use('version', Runner()
    .use((options, next) => {
      // Runners accept other Runners just like functions
      console.log(require('./package.json').version);
      next();
    }))
  .use('subcommand', require('./my-subcommand-runner'));

const options = parse(tool, process.argv);
main.run(options, (error) => {
  // if any route passes an error to next, execution
  // stops and that error is passes here
  
  // if there is no error, this will be called when
  // all routes have been exhausted
});
```

### Optional automatic `help` output generator
The included but completely optional `help` tool is very powerful because any
`Command` can take advantage of it, not just the top level command. The tool
does not print its output, allowing customization if need be. The help tool
will even make logical conclusions about how to group atomics in cases where
aliases or flags map directly to commands or options.

```js
const {parse, help, Command} = require('cla');
const tool = require('./my-cli-tool');

// add the help subcommand
const Help = Command({name: 'help'});
tool.commands.push(Help);

const options = parse(tool, [,, 'help']);
const info = help(tool, options);
/* => Without any arguments, `info` will contain a multi-line string
      description containing the command's aliases, subcommands, and
      flags grouped logically where applicable. */

const {path} = parse(tool, [,, 'help', 'subcommand']);
const isHelp = path.length > 1 && path[1].name === 'help';
if(isHelp) {
  console.log(help(tool, options));
  /* => With an argument, here 'subcommand,' `info` will detail the
        subcommand alone. This works in the same manner for aliases,
        flags, and options. */
}
```

### Strict parsing: unknown options are not parsed
Most option parsers silently ignore options passed in that they do not recognize
or simply are not able to recognize because the program is not well-defined.
Worse, some option parsers will have default intents for adding unknown values to
the final `options` object that may not be understood by the developer.
Instead of allowing mistakes to "fall through" unknown options will be included
in the final `options.args` array returned by `parse`. This allows developers
to assist the user use the tool properly from simply throwing an error for 
unrecognized options and arguments up to returning "Did you mean" sugguestions.

### Does not modify `process.argv`
The first two elements of `process.argv` are ignored by the parser. If the original
arguments are needed, reach for them like normal in `process.argv`.

### 3x shorter to type than `commander`
Command-Line Awesome just cannot be beat by any other options parser.

- 3x shorter than [`commander`](https://github.com/tj/commander.js/)
- 2.6x shorter than [`minimist`](https://github.com/substack/minimist)
- 2.6x shorter than [`optimist`](https://github.com/substack/node-optimist) (deprecated)
- 2.6x shorter than [`optparse`](https://github.com/jfd/optparse-js)
- 1.6x shorter than [`yargs`](https://github.com/yargs/yargs)
- 1.3x shorter than [`nopt`](https://github.com/npm/nopt)

With benchmarks like these, you would be insane to use anything else.

## Contributing

Contributions are incredibly welcome as long as they are standardly applicable
and pass the tests (or break bad ones). Tests are written in Mocha and
assertions are done with the Node.js core `assert` module.

```bash
# running tests
npm run test
```

Follow me on [Twitter](https://twitter.com/compooter) for updates or just for
the lolz and please check out my other [repositories](https://github.com/andrejewski)
 if I have earned it. I thank you for reading.
