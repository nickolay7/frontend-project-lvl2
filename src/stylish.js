const defaultFormatter = (data, replacer = ' ', spacesCount = 2) => {
  const iter = (node, depth) => {
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = node.map(({ sign, key, value }) => {
      const cond = !Array.isArray(value) ? value : `${iter(value, depth + spacesCount)}`;
      return `${currentIndent}${sign} ${key}: ${cond}`;
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
