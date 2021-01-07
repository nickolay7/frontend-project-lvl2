import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

export default (filepath) => {
  const format = path.extname(filepath);
  let parse;
  if (format === '' || format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yaml') {
    parse = yaml.load;
  } else if (format === '.txt') {
    return fs.readFileSync(filepath, 'utf-8');
  }
  return parse(fs.readFileSync(filepath, 'utf-8'));
};
