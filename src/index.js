import _ from 'lodash';
import readFile from './parsers.js';
import format from './formatters/index.js'

export default (filepath1, filepath2, formatName) => {
  const getDiffFiles = (f1, f2) => {
    const allKeys = _.union(Object.keys(f1), Object.keys(f2));
    const checkValue = (el) => typeof el === 'object' && !Array.isArray(el);
    return allKeys.flatMap((key) => {
      if (!(_.has(f1, key)) && (_.has(f2, key))) {
        return { sign: '+', key, value: f2[key] };
      }
      if ((_.has(f1, key)) && !(_.has(f2, key))) {
        return { sign: '-', key, value: f1[key] };
      }
      if ((_.has(f1, key)) && (_.has(f2, key)) && checkValue(f1[key]) && checkValue(f2[key])) {
        return { sign: ' ', key, value: getDiffFiles(f1[key], f2[key]) };
      }
      if (f1[key] === f2[key]) {
        return { sign: ' ', key, value: f2[key] };
      }
      return [{ sign: '-', key, value: f1[key] }, { sign: '+', key, value: f2[key] }];
    }).sort((a, b) => {
      if (a.key > b.key) {
        return 1;
      }
      if (a.key < b.key) {
        return -1;
      }
      return 0;
    });
  };
  const diff = getDiffFiles(readFile(filepath1), readFile(filepath2));
  return format(diff, formatName);
};
