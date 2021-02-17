const currentValue = (item) => {
  if (typeof item === 'string') {
    return `'${item}'`;
  }
  if (typeof item === 'object' && item !== null) {
    return '[complex value]';
  }
  return item;
};

const plain = (data, path = '') => {
  if (typeof data !== 'object') {
    return null;
  }
  return data.map(({
    type, key, value, children,
  }) => {
    if (type === 'updated') {
      return `Property '${path}${key}' was updated. From ${currentValue(value.valueBefore)} to ${currentValue(value.valueAfter)}`;
    }
    if (type === 'added') {
      return `Property '${path}${key}' was added with value: ${currentValue(value)}`;
    }
    if (type === 'removed') {
      return `Property '${path}${key}' was removed`;
    }
    return plain(children, `${path}${key}.`);
  }).filter((el) => el).join('\n');
};

export default plain;
