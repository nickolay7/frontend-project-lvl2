import fs from 'fs';
import path from 'path';
import parse from './parser.js';
import format from './formatters/index.js';
import getDiffData from './getDiffData.js';

const getFormatName = (fp) => path.extname(fp).slice(1);

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = fs.readFileSync(filepath1, 'utf-8');
  const data2 = fs.readFileSync(filepath2, 'utf-8');
  const content1 = parse(data1, getFormatName(filepath1));
  const content2 = parse(data2, getFormatName(filepath2));
  const diff = getDiffData(content1, content2);
  return format(diff, formatName);
};
