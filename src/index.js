import _ from 'lodash';
import fs from 'fs';
import parse from './parsers.js';
import format from './formatters/index.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
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
  const file1 = fs.readFileSync(filepath1, 'utf-8');
  const file2 = fs.readFileSync(filepath2, 'utf-8');
  const diff = getDiffFiles(parse(filepath1, file1), parse(filepath2, file2));
  return format(diff, formatName);
};
