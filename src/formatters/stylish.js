import _ from 'lodash';

const getIndents = (depth) => {
  const replacer = ' ';
  const spacesCount = 4;
  const indentForSign = 2;
  const depthStep = 1;
  const indentSize = depth * spacesCount - indentForSign;
  const currentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - indentForSign);
  return [depthStep, currentIndent, bracketIndent];
};
const stylish = (data) => {
  const iter = (node, depth) => {
    if (!_.isObject(node)) {
      return node;
    }
    const [depthStep, currentIndent, bracketIndent] = getIndents(depth);
    const build = ({
      type, key, value, children,
    }) => {
      switch (type) {
        case 'added':
          return `${currentIndent}+ ${key}: ${iter(value, depth + depthStep)}`;
        case 'removed':
          return `${currentIndent}- ${key}: ${iter(value, depth + depthStep)}`;
        case 'updated':
          return [`${currentIndent}- ${key}: ${iter(value.valueBefore, depth + depthStep)}`,
            `${currentIndent}+ ${key}: ${iter(value.valueAfter, depth + depthStep)}`];
        case 'unchanged':
          return `${currentIndent}  ${key}: ${iter(value, depth + depthStep)}`;
        case 'nested':
          return `${currentIndent}  ${key}: ${iter(children, depth + depthStep)}`;
        default:
          return new Error(type);
      }
    };
    const lines = !Array.isArray(node)
      ? _.entries(node).map(([key, value]) => ` ${currentIndent} ${key}: ${iter(value, depth + depthStep)}`)
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
