import _ from 'lodash';

const getIndents = (depth) => {
  const replacer = ' ';
  const spacesCount = 2;
  const indentSize = depth * spacesCount;
  const currentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);
  return [spacesCount, currentIndent, bracketIndent];
};
const stylish = (data) => {
  const iter = (node, depth) => {
    if (!_.isObject(node)) {
      return node;
    }
    const [, currentIndent, bracketIndent] = getIndents(depth);
    const build = ({
      type, key, value, children,
    }) => {
      switch (type) {
        case 'added':
          return `${currentIndent}+ ${key}: ${iter(value, depth + 1)}`;
        case 'removed':
          return `${currentIndent}- ${key}: ${iter(value, depth + 1)}`;
        case 'updated':
          return [`${currentIndent}- ${key}: ${iter(value.valueBefore, depth + 1)}`,
            `${currentIndent}+ ${key}: ${iter(value.valueAfter, depth + 1)}`];
        case 'unchanged':
          return `${currentIndent}  ${key}: ${iter(value, depth + 1)}`;
        case 'nested':
          return `${currentIndent}  ${key}: ${iter(children, depth + 1)}`;
        default:
          return new Error(type);
      }
    };
    const lines = !Array.isArray(node)
      ? _.entries(node).map(([key, value]) => ` ${currentIndent} ${key}: ${iter(value, depth + 1)}`)
      : node.flatMap(build);
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data, 1);
};

export default stylish;
