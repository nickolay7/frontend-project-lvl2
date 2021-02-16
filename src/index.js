import fs from 'fs';
import path from 'path';
import parse from './parser.js';
import format from './formatters/index.js';
import getDiffFiles from './getDiffFiles.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = fs.readFileSync(filepath1, 'utf-8');
  const data2 = fs.readFileSync(filepath2, 'utf-8');
  const getExtension = (fp) => path.extname(fp).slice(1);
  const content1 = parse(getExtension(filepath1), data1);
  const content2 = parse(getExtension(filepath2), data2);
  const diff = getDiffFiles(content1, content2);
  return format(diff, formatName);
};
