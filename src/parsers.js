import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';

export default (filepath, text) => {
  const format = path.extname(filepath);
  if (format === '' || format === '.json') {
    return JSON.parse(text);
  }
  if (format === '.yaml') {
    return yaml.load(text);
  }
  if (format === '.ini') {
    return ini.parse(text);
  }
  return new Error('unsupported file extension ! ! !');
};
