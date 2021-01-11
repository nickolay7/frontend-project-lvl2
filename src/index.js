import _ from 'lodash';
import readFile from './parsers.js';

export default (filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const getDiff = (f1, f2) => {
    const keys1 = Object.keys(f1);
    const keys2 = Object.keys(f2);
    const allKeys = _.union(keys1, keys2);
    const checkValue = (el) => typeof el === 'object' && !Array.isArray(el);
    const handler = allKeys.flatMap((key) => {
      if (!(_.has(f1, key)) && (_.has(f2, key))) {
        return { sign: '+', key, value: f2[key] };
      }
      if ((_.has(f1, key)) && !(_.has(f2, key))) {
        return { sign: '-', key, value: f1[key] };
      }
      if ((_.has(f1, key)) && (_.has(f2, key)) && checkValue(f1[key]) && checkValue(f2[key])) {
        return { sign: ' ', key, value: getDiff(f1[key], f2[key]) };
      }
      if (f1[key] === f2[key]) {
        return { sign: ' ', key, value: f2[key] };
      }
      if ((_.has(f1, key)) && (_.has(f2, key))) {
        return [{ sign: '-', key, value: f1[key] }, { sign: '+', key, value: f2[key] }];
      }
      return true;
    }).sort((a, b) => {
      if (a.key > b.key) {
        return 1;
      }
      if (a.key < b.key) {
        return -1;
      }
      return 0;
    });
    return handler;
  };
  return getDiff(data1, data2);
};
