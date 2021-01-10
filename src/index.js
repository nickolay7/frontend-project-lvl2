import _ from 'lodash';
import readFile from './parsers.js';
import formatter from './stylish.js';

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
  // const handler = allKeys.map((key) => {
  //   if (!(_.has(data1, key)) && (_.has(data2, key))) {
  //     return `  + ${key}: ${data2[key]}`;
  //   }
  //   if ((_.has(data1, key)) && !(_.has(data2, key))) {
  //     return `  - ${key}: ${data1[key]}`;
  //   }
  //   if (data1[key] === data2[key]) {
  //     return `    ${key}: ${data2[key]}`;
  //   }
  //   return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
  // }).sort((a, b) => {
  //   if (a[4] > b[4]) {
  //     return 1;
  //   }
  //   if (a[4] < b[4]) {
  //     return -1;
  //   }
  //   return 0;
  // }).join('\n');
  // return `{\n${handler}\n}`;
  // return formatter(handler.sort((a, b) => {
  //   if (a.key > b.key) {
  //     return 1;
  //   }
  //   if (a.key < b.key) {
  //     return -1;
  //   }
  //   return 0;
  // }));
  return formatter(getDiff(data1, data2));
};
