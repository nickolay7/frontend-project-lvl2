const codeType = {
  add: '+',
  remove: '-',
  update: '-',
  updated: '+',
  unchanged: ' ',
};
const defaultFormatter = (data) => {
  const iter = (node, depth) => {
    if ((!Array.isArray(node) && typeof node !== 'object') || node === null) {
      return node;
    }
    const replacer = ' ';
    const spacesCount = 2;
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = !Array.isArray(node)
      ? Object.entries(node).map(([key, value]) => ` ${currentIndent} ${key}: ${iter(value, depth + spacesCount)}`)
      : node.map(({
        type, key, value, children,
      }) => {
        if (value === '') {
          return `${currentIndent}${codeType[type]} ${key}:`;
        }
        return (value !== undefined ? `${currentIndent}${codeType[type]} ${key}: ${iter(value, depth + spacesCount)}`
          : `${currentIndent}${codeType[type]} ${key}: ${iter(children, depth + spacesCount)}`);
      });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data, 1);
};

export default defaultFormatter;
