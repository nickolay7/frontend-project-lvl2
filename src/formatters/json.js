const json = (data) => {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  return !Array.isArray(data)
    ? Object.entries(data).reduce((acc, [key, value]) => ({ ...acc, [key]: json(value) }), {})
    : data.reduce((acc, { type, key, value }) => {
      if (type === '-' || (type === ' ' && typeof value !== 'object')) {
        return acc;
      }
      return { ...acc, [key]: json(value) };
    }, {});
};

export default json;
