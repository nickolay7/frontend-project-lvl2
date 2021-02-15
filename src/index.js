import fs from 'fs';
import parse from './parsers.js';
import format from './formatters/index.js';
import getDiffFiles from './getDiffFiles.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = fs.readFileSync(filepath1, 'utf-8');
  const data2 = fs.readFileSync(filepath2, 'utf-8');
  const diff = getDiffFiles(parse(filepath1, data1), parse(filepath2, data2));
  return format(diff, formatName);
};
