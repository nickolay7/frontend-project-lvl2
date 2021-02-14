import fs from 'fs';
import parse from './parsers.js';
import format from './formatters/index.js';
import getDiffFiles from './getDiffFiles';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = fs.readFileSync(filepath1, 'utf-8');
  const file2 = fs.readFileSync(filepath2, 'utf-8');
  const diff = getDiffFiles(parse(filepath1, file1), parse(filepath2, file2));
  return format(diff, formatName);
};
