
function help(command, options) {
  const {args} = options;
  if(!args.length) {
    const help = commandHelp(command);
    return format(help);
  } else {
    const help = argumentHelp(command, args);
    if(help) return format(help);
  }
}

function format(lines) {
  return lines.map(indent).join('\n');
}

function argumentHelp(parent, args) {
  const [arg] = args;
  const command = parent.commands
    .find((cmd) => dumbEqual(cmd, arg));
  if(command) return commandTitle(command, parent);
  const option = parent.options
    .find((opt) => dumbEqual(opt, arg));
  if(option) return optionTitle(option, parent);
}

function commandHelp(command, parent) {
  const title = commandTitle(command, parent);
  const aliases = gridFit(command.aliases
    .filter(alias => !isDirectRef(alias, command))
    .map(aliasTitle));
  const commands = collect(command.commands.map((cmd) => {
    return commandTitle(cmd, command);
  }));
  const options = collect(command.options.map((option) => {
    return optionTitle(option, command);
  }));
  const flags = gridFit(command.flags
    .filter(flag => !isDirectRef(flag, command))
    .map(flagTitle));

  const aliasSection = section('ALIASES', aliases);
  const commandSection = section('COMMANDS', commands);
  const optionSection = section('OPTIONS', options);
  const flagSection = section('FLAGS', flags);

  return title
    .concat('')
    .concat(aliasSection)
    .concat(commandSection)
    .concat(optionSection);
}

function gridFit(table) {
  if(!table.length) return [];
  const columns = table[0].length;
  let sizes = [];
  for(let i = 0; i < columns; i++) {
    sizes[i] = table
      .map(row => row[i].length)
      .reduce((x,y) => Math.max(x,y), 0);
  }
  return table.map(row => {
    return row
      .map((col, i) => padRight(col, ' ', sizes[i]))
      .join(' ');
  });
}

function padRight(word, padding, len) {
  while(word.length < len) {
    word += padding;
  }
  return word;
}

function collect(list) {
  return list.reduce((list, slice) => {
    return list.concat(slice);
  }, []);
}

function aliasTitle(alias) {
  return [alias.name, '=>', stringExpansion(alias.value)];
}

function flagTitle(alias) {
  return [flag.name, '=>', stringExpansion(flag.value)];
}

function stringExpansion(expansion) {
  return expansion.map(arg => arg.name ? arg.name : arg).join(' ');
}

function commandTitle(command, parent) {
  const {name, version, description} = command;
  const names = directRefs(command, parent).concat(name);
  let title = `${names.join(', ')}`;
  if(version) title += ` (${version})`;
  let lines = [title];
  if(description) lines.push(indent(description));
  return lines;
}

function optionTitle(option, command) {
  const {name, type, description} = option;
  const names = directRefs(option, command).concat(name);
  let title = `${names.join(', ')}`;
  if(type.parameters) title + ` ${type.parameters}`;
  let lines = [title];
  if(description) lines.push(indent(description));
  return lines;
}

function isDirectRef(x, command) {
  if(x.value.length !== 1) return false;
  const z = x.value[0];
  const target = []
    .concat(command.commands)
    .concat(command.options)
    .find((y) => dumbEqual(z, y));
  return !!target;
}

function directRefs(x, command) {
  if(!command) return [];
  const {aliases, flags} = command;
  return aliases.concat(flags)
    .filter(y => directsTo(y, x))
    .map(y => y.name ? y.name : y);
}

function directsTo(x, y) {
  if(x.value.length !== 1) return false;
  let z = x.value[0];
  return dumbEqual(z, y);
}

function dumbEqual(x, y) {
  if(x.name) x = x.name;
  if(y.name) y = y.name;
  return x === y;
}

function section(title, list) {
  if(!list.length) return [];
  return [title].concat(list.map(indent)).concat('');
}

function indent(line) {
  return '  ' + line;
} 

module.exports = help;

