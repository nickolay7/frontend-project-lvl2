import _ from 'lodash';

const getIndent = (depth, indentForSign = 0) => {
  const replacer = ' ';
  const spacesCount = 4;
  const indentSize = depth * spacesCount - indentForSign;
  return replacer.repeat(indentSize);
};
const objectToString = (obj, depth, fn) => _.keys(obj)
  .map((key) => ` ${getIndent(depth, 2)} ${key}: ${fn(obj[key], depth + 1)}`);
const stylish = (data) => {
  const iter = (tree, depth) => {
    const currentIndent = getIndent(depth, 2);
    const bracketIndent = getIndent(depth, 4);
    if (!_.isObject(tree)) {
      return tree;
    }

    const build = (node) => {
      switch (node.type) {
        case 'added':
          return `${currentIndent}+ ${node.key}: ${iter(node.value, depth + 1)}`;
        case 'removed':
          return `${currentIndent}- ${node.key}: ${iter(node.value, depth + 1)}`;
        case 'updated':
          return [`${currentIndent}- ${node.key}: ${iter(node.valueBefore, depth + 1)}`,
            `${currentIndent}+ ${node.key}: ${iter(node.valueAfter, depth + 1)}`];
        case 'unchanged':
          return `${currentIndent}  ${node.key}: ${iter(node.value, depth + 1)}`;
        case 'nested':
          return `${currentIndent}  ${node.key}: ${iter(node.children, depth + 1)}`;
        default:
          return new Error(node.type);
      }
    };
    const lines = Array.isArray(tree) ? tree.flatMap(build) : objectToString(tree, depth, iter);
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data, 1);
};

export default stylish;
