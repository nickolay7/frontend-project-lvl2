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
    const build = ({
      type, key, value, children,
    }) => {
      const item = value === undefined ? children : value;
      const template = (sign) => (item === ''
        ? `${currentIndent}${sign} ${key}:`
        : `${currentIndent}${sign} ${key}: ${iter(item, depth + spacesCount)}`);
      switch (type) {
        case 'added':
          return template('+');
        case 'removed':
          return template('-');
        case 'updated':
          return [`${currentIndent}- ${key}: ${iter(item.valueBefore, depth + spacesCount)}`,
            `${currentIndent}+ ${key}: ${iter(item.valueAfter, depth + spacesCount)}`];
        case 'unchanged':
          return template(' ');
        case 'nested':
          return template(' ');
        default:
          return new Error(type);
      }
    };
    const lines = !Array.isArray(node)
      ? Object.entries(node).map(([key, value]) => ` ${currentIndent} ${key}: ${iter(value, depth + spacesCount)}`)
      : node.flatMap(build);
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data, 1);
};

export default defaultFormatter;
