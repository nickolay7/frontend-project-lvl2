import _ from 'lodash';

const getCurrentValue = (item) => {
  if (_.isString(item)) {
    return `'${item}'`;
  }
  if (_.isObject(item)) {
    return '[complex value]';
  }
  return item;
};

const plain = (data) => {
  const mapping = (items, path = '') => items.map((node) => {
    switch (node.type) {
      case 'updated':
        return `Property '${path}${node.key}' was updated. From ${getCurrentValue(node.valueBefore)} to ${getCurrentValue(node.valueAfter)}`;
      case 'added':
        return `Property '${path}${node.key}' was added with value: ${getCurrentValue(node.value)}`;
      case 'removed':
        return `Property '${path}${node.key}' was removed`;
      case 'nested':
        return mapping(node.children, `${path}${node.key}.`);
      case 'unchanged':
        return null;
      default:
        return new Error(node.type);
    }
  }).filter((el) => el).join('\n');
  return mapping(data);
};

export default plain;
