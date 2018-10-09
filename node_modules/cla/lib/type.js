
const fs = require('fs');

function Type(options) {
  const {name, argCount, value} = options;
  if(typeof name !== 'string') {
    throw new Error("Types require a 'name' string");
  }
  if(typeof argCount !== 'number') {
    throw new Error(`Type ${name} requires an 'argCount' integer.`);
  }
  if(typeof value !== 'function') {
    throw new Error(`Type '${name} requires a 'value' function.`);
  }
  return Object.assign(options, {type: 'type'});
}

function primitive(constructor, useNew) {
  return Type({
    name: constructor.name,
    argCount: 1,
    parameters: constructor.name.toLowerCase(),
    defaultValue: constructor(),
    value(x) {
      return useNew ? new constructor(x) : constructor(x);
    }
  });
}

function fsEntry(name) {
  return Type({
    name: name,
    argCount: 1,
    parameters: name,
    defaultValue: void 0,
    value(path) {
      const stats = fs.statSync(path);
      if(!stats[`is${name}`]()) {
        throw new Error(`"${path}" is not a ${name}`);
      }
      return path;
    },
  });
}

const primitives = [Number, String, Boolean, Date]
  .reduce((types, constructor) => {
    const useNew = constructor === Date;
    types[constructor.name] = primitive(constructor, useNew);
    return types;
  }, {});

const fsEntries = ['File', 'Directory', 'BlockDevice', 'CharacterDevice', 'FIFO', 'Socket']
  .reduce((types, entryType) => {
    types[entryType] = fsEntry(entryType);
    return types;
  }, {});

function Empty(value) {
  return Type({
    name: 'Empty',
    argCount: 0,
    parameters: void 0,
    defaultValue: void 0,
    value() {
      return value;
    }
  });
}

const Json = Type({
  name: 'Json',
  argCount: 1,
  parameters: 'JSON',
  defaultValue: void 0,
  value(json) {
    return JSON.parse(json);
  }
});

function List(type, argCount) {
  const parameters = Array(count).fill(type.parameters).join(' ');
  return Type({
    name: `List<${type.name}>`,
    argCount,
    parameters,
    defaultValue: [],
    value(...values) {
      return values.map(type.value);
    }
  });
}

function Tuple(...types) {
  const name = `Tuple<${types.map(t => t.name).join(',')}>`;
  const parameters = types.map(type => type.parameters).join(' ');
  const defaultValue = types.map(t => t.defaultValue);
  return Type({
    name,
    argCount: types.length,
    parameters,
    defaultValue,
    value(...values) {
      return values.map((value, index) => types[index].value(value));
    }
  });
}

const YesNo = Type({
  type: 'type',
  name: 'yesno',
  argCount: 1,
  parameters: 'yes|no',
  defaultValue: false,
  value(x) {
    return x.startsWith('y');
  }
});

module.exports = Object.assign(Type, primitives, fsEntries, {
  Empty,
  Json,
  List,
  Tuple,
  YesNo
});

