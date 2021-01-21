const defaultFormatter = (data, replacer = ' ', spacesCount = 2) => {
  const iter = (node, depth) => {
    if ((!Array.isArray(node) && typeof node !== 'object') || node === null) {
      return node;
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = !Array.isArray(node)
      ? Object.entries(node).map(([key, value]) => ` ${currentIndent} ${key}: ${iter(value, depth + spacesCount)}`)
      : node.map(({ type, key, value }) => (value === ''
        ? `${currentIndent}${type} ${key}:`
        : `${currentIndent}${type} ${key}: ${iter(value, depth + spacesCount)}`));
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data, 1);
};

export default defaultFormatter;
