import _ from 'lodash';

const getIndents = (depth) => {
  const replacer = ' ';
  const spacesCount = 4;
  const indentForSign = 2;
  const indentSize = depth * spacesCount - indentForSign;
  const currentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - indentForSign);
  return [currentIndent, bracketIndent];
};
const stylish = (data) => {
  const iter = (tree, depth) => {
    if (!_.isObject(tree)) {
      return tree;
    }
    const [currentIndent, bracketIndent] = getIndents(depth);
    const build = (node) => {
      switch (node.type) {
        case 'added':
          return `${currentIndent}+ ${node.key}: ${iter(node.value, depth + 1)}`;
        case 'removed':
          return `${currentIndent}- ${node.key}: ${iter(node.value, depth + 1)}`;
        case 'updated':
          return [`${currentIndent}- ${node.key}: ${iter(node.value.valueBefore, depth + 1)}`,
            `${currentIndent}+ ${node.key}: ${iter(node.value.valueAfter, depth + 1)}`];
        case 'unchanged':
          return `${currentIndent}  ${node.key}: ${iter(node.value, depth + 1)}`;
        case 'nested':
          return `${currentIndent}  ${node.key}: ${iter(node.children, depth + 1)}`;
        default:
          return new Error(node.type);
      }
    };
    const lines = !Array.isArray(tree)
      ? _.keys(tree).map((key) => ` ${currentIndent} ${key}: ${iter(tree[key], depth + 1)}`)
      : tree.flatMap(build);
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data, 1);
};

export default stylish;
