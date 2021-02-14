import _ from 'lodash';

const getDiffFiles = (data1, data2) => {
  const allKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(allKeys);
  return sortedKeys.flatMap((key) => {
    const val1 = data1[key];
    const val2 = data2[key];
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        type: 'unchanged', key, children: getDiffFiles(val1, val2),
      };
    }
    if (!(_.has(data1, [key])) && (_.has(data2, [key]))) {
      return { type: 'add', key, value: val2 };
    }
    if ((_.has(data1, [key])) && !(_.has(data2, [key]))) {
      return { type: 'remove', key, value: val1 };
    }
    if (val1 === val2) {
      return { type: 'unchanged', key, value: val1 };
    }
    return [{ type: 'update', key, value: val1 }, { type: 'updated', key, value: val2 }];
  });
};

export default getDiffFiles;
