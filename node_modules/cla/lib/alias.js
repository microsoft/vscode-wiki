
function Alias(name, expansion) {
  // expansion = normalizeExpansion(expansion);
  if(!Array.isArray(expansion)) expansion = [expansion];
  return {type: 'alias', name, value: expansion};
}

module.exports = Alias;

