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
      if (type === 'updated') {
        return `Property '${path}${key}' was updated. From ${getCurrentValue(value.valueBefore)} to ${getCurrentValue(value.valueAfter)}`;
      }
      if (type === 'added') {
        return `Property '${path}${key}' was added with value: ${getCurrentValue(value)}`;
      }
      if (type === 'removed') {
        return `Property '${path}${key}' was removed`;
      }
      return mapping(children, `${path}${key}.`);
    }).filter((el) => el).join('\n');
  };
  return mapping(data);
};

export default plain;
