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
  const mapping = (items, path = '') => {
    if (!_.isObject(items)) {
      return null;
    }
    return items.map(({
      type, key, value, children,
    }) => {
      switch (type) {
        case 'updated':
          return `Property '${path}${key}' was updated. From ${getCurrentValue(value.valueBefore)} to ${getCurrentValue(value.valueAfter)}`;
        case 'added':
          return `Property '${path}${key}' was added with value: ${getCurrentValue(value)}`;
        case 'removed':
          return `Property '${path}${key}' was removed`;
        case 'nested':
          return mapping(children, `${path}${key}.`);
        case 'unchanged':
          return null;
        default:
          return new Error(type);
      }
    }).filter((el) => el).join('\n');
  };
  return mapping(data);
};

export default plain;
