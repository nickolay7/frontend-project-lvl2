const json = (data) => {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  return !Array.isArray(data)
    ? Object.entries(data).reduce((acc, [key, value]) => ({ ...acc, [key]: json(value) }), {})
    : data.reduce((acc, {
      type, key, value, children,
    }) => {
      if (type === 'removed' || (type === 'unchanged' && typeof value !== 'object' && value !== undefined)) {
        return acc;
      }
      if (value === undefined) {
        return { ...acc, [key]: json(children) };
      }
      const currentValue = type === 'updated' ? value.valueAfter : value;
      return { ...acc, [key]: json(currentValue) };
    }, {});
};

export default json;
