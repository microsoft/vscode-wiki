
function Flag(name, expansion) {
  if(!isFlagName(name)) {
    const word = name ? `'${name}'` : 'names';
    throw new Error(`Flag ${word} must have one leading dash \`-\` and a single character.`);
  }
  // expansion = normalizeExpansion(expansion);
  if(!Array.isArray(expansion)) expansion = [expansion];
  return {type: 'flag', name, value: expansion};
}

function isFlagName(name) {
  return name && name.startsWith('-') && name.length === 2 && name !== '--';
}

module.exports = Flag;

