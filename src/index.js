import _ from 'lodash';
import readFile from './parsers.js';
import format from './formatters/index.js';

const isObject = (el) => typeof el === 'object' && !Array.isArray(el);
const cond = (a, b) => {
  if (a.key > b.key) {
    return 1;
  }
  if (a.key < b.key) {
    return -1;
  }
  return 0;
};
export default (filepath1, filepath2, formatName) => {
  const getDiffFiles = (data1, data2) => {
    const allKeys = _.union(Object.keys(data1), Object.keys(data2));
    return allKeys.flatMap((key) => {
      const val1 = data1[key];
      const val2 = data2[key];
      if (isObject(data1[key]) && isObject(data2[key])) {
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
      return { type: 'update', key, value: val1 };
    }).sort(cond);
  };
  const diff = getDiffFiles(readFile(filepath1), readFile(filepath2));
  return format(diff, formatName);
};
