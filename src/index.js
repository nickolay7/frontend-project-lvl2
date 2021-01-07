import _ from 'lodash';
import readFile from './parsers.js';

export default (filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = _.union(keys1, keys2);
  const handler = allKeys.map((key) => {
    if (!(_.has(data1, key)) && (_.has(data2, key))) {
      return `  + ${key}: ${data2[key]}`;
    }
    if ((_.has(data1, key)) && !(_.has(data2, key))) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (data1[key] === data2[key]) {
      return `    ${key}: ${data2[key]}`;
    }
    return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
  }).sort((a, b) => {
    if (a[4] > b[4]) {
      return 1;
    }
    if (a[4] < b[4]) {
      return -1;
    }
    return 0;
  }).join('\n')
  return `{\n${handler}\n}`;
};
