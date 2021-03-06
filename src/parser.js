import yaml from 'js-yaml';
import ini from 'ini';

export default (text, format) => {
  if (format === 'json') {
    return JSON.parse(text);
  }
  if (format === 'yaml' || format === 'yml') {
    return yaml.load(text);
  }
  if (format === 'ini') {
    return ini.parse(text);
  }
  throw new Error(`Unsupported file format: ${format}!`);
};
