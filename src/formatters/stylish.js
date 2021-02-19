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
const objectToString = (obj, depth, fn) => {
  const [currentIndent] = getIndents(depth);
  return _.keys(obj).map((key) => ` ${currentIndent} ${key}: ${fn(obj[key], depth + 1)}`);
};
const stylish = (data) => {
  const iter = (tree, depth) => {
    const [currentIndent, bracketIndent] = getIndents(depth);
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
