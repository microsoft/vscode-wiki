
function parse(command, argv = process.argv) {
  const {path, args} = expandArgs(command, argv.slice(2));
  return expandOptions(path, args);
}

function expandArgs(root, args) {
  let scopes = [root];
  let finalArgs = [];

  function skipForward(len) {
    for(let i = 0; i < len; i++) {
      finalArgs.push(args.shift());
    }
  }

  while(args.length) {
    const arg = args.shift();
    if(isParseEnd(root, arg)) {
      finalArgs.push(arg);
      skipForward(args.length);
      break;
    }
    const expansion = expandArg(scopes, arg);
    if(Array.isArray(expansion)) {
      args = expansion.concat(args);
    } else {
      const {value, skips, scope} = expansion;
      if(scope) scopes.push(scope);
      finalArgs.push(value);
      skipForward(skips);
    }
  }
  return {
    args: finalArgs,
    path: scopes
  };
}

function isParseEnd(root, arg) {
  return !root.disableDoubleDash && arg === '--';
}

function commandForArg(root, name) {
  return root.commands.find((command) => {
    return command.name === name;
  });
}

function expandArg(scopes, arg) {
  scopes = scopes.reverse();
  if(arg.name) arg = arg.name;
  return (
    expandArgAlias(scopes, arg) ||
    expandArgCommand(scopes, arg) ||
    expandArgFlag(scopes, arg) ||
    expandArgOption(scopes, arg) ||
    {value: arg, skips: 0});
}

function expandArgAlias(scopes, arg) {
  for(let i = 0; i < scopes.length; i++) {
    const scope = scopes[i];
    const alias = scope.aliases.find((alias) => {
      return alias.name === arg;
    });
    if(alias) return alias.value;
  }
}

function expandArgCommand(scopes, arg) {
  const scope = scopes[0]; // only care about nearest scope
  const command = scope.commands.find((command) => {
    return command.name === arg;
  });
  if(command) return {
    value: command,
    skips: 0,
    scope: command
  };
}

function expandArgFlag(scopes, arg) {
  if(!arg.startsWith('-') || arg.startsWith('--')) return;
  for(let i = 0; i < scopes.length; i++) {
    const scope = scopes[i];
    const flag = scope.flags.find((flag) => {
      return flag.name === arg;
    });
    if(flag) return flag.value;
  }

  if(arg.indexOf('=') > 1) return arg.split('=');
  if(arg.length === 2) return {value: arg, skips: 0};

  const flagList = arg.slice(1).split('').map(f => '-'+f);
  return flagList;
}

function expandArgOption(scopes, arg) {
  for(let i = 0; i < scopes.length; i++) {
    const scope = scopes[i];
    const option = scope.options.find((option) => {
      return option.name === arg;
    });
    if(option) return {
      value: option,
      skips: option.type.argCount
    };
  }

  if(arg.includes('=')) {
    for(let i = 0; i < scopes.length; i++) {
      const scope = scopes[i];
      const option = scope.options.find((option) => {
        return arg.startsWith(option.name + '=') && option.type.argCount;
      });
      if(option) {
        const argument = arg.slice(option.name.length + 1);
        return [option, argument];
      }
    }
  }
}

function expandOptions(path, args) {
  const defaults = defaultOptions(path);
  const options = parsePathArgs(path, args);
  return Object.assign(defaults, options);
}

function defaultOptions(path) {
  return path.reduce((options, command) => {
    return command.options.reduce((options, option) => {
      options[option.key] = option.defaultValue || option.type.defaultValue;
      return options;
    }, options);
  }, {path});
}

function parsePathArgs(path, args) {
  const scopeIndex = 1;
  let options = {args: []};
  while(args.length) {
    const arg = args.shift();
    if(isParseEnd(path[0], arg)) {
      options.args = options.args.concat(args);
      break;
    } else if(isNextCommand(path[scopeIndex], arg)) {
      scopeIndex++;
    } else {
      const option = typeof arg === 'object' ? arg : lookupOption(path, arg);
      if(option) {
        const {key, type: {value, argCount}} = option;
        let list = [];
        for(let i = 0; i < argCount; i++) {
          list.push(args.shift());
        }
        options[key] = value(...list);
      } else {
        options.args.push(arg);
      }
    }
  }
  return options;
}

function isNextCommand(route, command) {
  if(route && route.name) route = route.name;
  if(command && command.name) command = command.name;
  return route === command;
}

function lookupOption(path, name) {
  const scopes = path.reverse();
  for(let i = 0; i < scopes.length; i++) {
    const scope = scopes[i];
    const option = scope.options.find((option) => {
      return option.name === name;
    });
    if(option) return option;
  }
}

module.exports = Object.assign(parse, {expandArgs, expandOptions});

