const plain = (data, path = '') => {
  if (typeof data !== 'object') {
    return null;
  }
  const currentValue = (item) => {
    if (typeof item === 'boolean' || item === null) {
      return item;
    }
    if (typeof item === 'object') {
      return '[complex value]';
    }
    return `'${item}'`;
  };
  return data.map(({
    type, key, value, children,
  }, index, arr) => {
    if (type === 'update') {
      return `Property '${path}${key}' was updated. From ${currentValue(value)} to ${currentValue(arr[index + 1].value)}`;
    }
    if (type === 'updated') {
      return null;
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
