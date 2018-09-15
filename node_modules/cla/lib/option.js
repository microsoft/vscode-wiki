
function Option(options) {
  const {name, description, key, type, defaultValue} = options;
  if(!name) {
    throw new Error('Option requires a name with two leading dashes `--`');
  }
  if(!name.startsWith('--')) {
    throw new Error(`Option ${name} need to begin with two dashes \`--\`.`);
  }
  if(!key) {
    throw new Error(`${name} requires a 'key' for its value to be set in options[key].`);
  }
  if(!type) {
    throw new Error(`${name} requires a 'type', see lib/types.js for built-in types.`);
  }
  return {type: 'option', name, description, key, type, defaultValue};
}

module.exports = Option;

