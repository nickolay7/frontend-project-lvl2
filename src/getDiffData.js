import _ from 'lodash';

const getDiffData = (data1, data2) => {
  const allKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(allKeys);
  return sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { type: 'added', key, value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { type: 'removed', key, value: data1[key] };
    }
    const val1 = data1[key];
    const val2 = data2[key];
    if (_.isEqual(val1, val2)) {
      return { type: 'unchanged', key, value: val1 };
    }
    if (_.isPlainObject(val1) && _.isPlainObject(val2)) {
      return {
        type: 'nested', key, children: getDiffData(val1, val2),
      };
    }
    return {
      type: 'updated', key, valueBefore: val1, valueAfter: val2,
    };
  });
};

export default getDiffData;
