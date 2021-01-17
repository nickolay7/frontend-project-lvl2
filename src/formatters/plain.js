const plain = (data, path = '') => {
  if (typeof data !== 'object') {
    return null;
  }
  const prepareData = Array.isArray(data) ? data : Object.keys(data);
  return prepareData.map(({ sign, key, value }, index, arr) => {
    const currentValue = (item) => {
      if (typeof item === 'boolean' || item === null) {
        return item;
      }
      if (typeof item === 'object') {
        return '[complex value]';
      }
      return `'${item}'`;
    };
    if (arr[index + 1] !== undefined && key === arr[index + 1].key) {
      return `Property '${path}${key}' was updated. From ${currentValue(value)} to ${currentValue(arr[index + 1].value)}`;
    }
    if (arr[index - 1] !== undefined && key === arr[index - 1].key) {
      return null;
    }
    if (sign === '+') {
      return `Property '${path}${key}' was added with value: ${currentValue(value)}`;
    }
    if (sign === '-') {
      return `Property '${path}${key}' was removed`;
    }
    return plain(value, `${path}${key}.`);
  }).filter((el) => el).join('\n');
};

export default plain;
