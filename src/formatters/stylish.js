import _ from 'lodash';

const getIndent = (depth, indentForSign = 0) => {
  const replacer = ' ';
  const spacesCount = 4;
  const indentSize = depth * spacesCount - indentForSign;
  return replacer.repeat(indentSize);
};
const getCurrentValue = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const lines = _.entries(data)
    .map(([key, value]) => `${getIndent(depth, -3)} ${key}: ${getCurrentValue(value, depth + 1)}`);
  return ['{', ...lines, `${getIndent(depth)}}`].join('\n');
};
const stylish = (data) => {
  const iter = (tree, depth) => {
    const currentIndent = getIndent(depth, 2);
    const bracketIndent = getIndent(depth, 4);
    const build = (node) => {
      switch (node.type) {
        case 'added':
          return `${currentIndent}+ ${node.key}: ${getCurrentValue(node.value, depth)}`;
        case 'removed':
          return `${currentIndent}- ${node.key}: ${getCurrentValue(node.value, depth)}`;
        case 'updated':
          return [`${currentIndent}- ${node.key}: ${getCurrentValue(node.valueBefore, depth)}`,
            `${currentIndent}+ ${node.key}: ${getCurrentValue(node.valueAfter, depth)}`];
        case 'unchanged':
          return `${currentIndent}  ${node.key}: ${getCurrentValue(node.value, depth)}`;
        case 'nested':
          return `${currentIndent}  ${node.key}: ${iter(node.children, depth + 1)}`;
        default:
          return new Error(node.type);
      }
    };
    const lines = tree.flatMap(build);
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(data, 1);
};

export default stylish;
