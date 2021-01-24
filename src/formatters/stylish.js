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
      const template = (sign) => (value === ''
        ? `${currentIndent}${sign} ${key}:`
        : `${currentIndent}${sign} ${key}: ${iter(item, depth + spacesCount)}`);
      switch (type) {
        case 'add':
          return template('+');
        case 'remove':
          return template('-');
        case 'update':
          return template('-');
        case 'updated':
          return template('+');
        case 'unchanged':
          return template(' ');
        default:
          return new Error(type);
      }
    };
    const lines = !Array.isArray(node)
      ? Object.entries(node).map(([key, value]) => ` ${currentIndent} ${key}: ${iter(value, depth + spacesCount)}`)
      : node.map(build);
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data, 1);
};

export default defaultFormatter;
