import yaml from 'js-yaml';
import ini from 'ini';

export default (format, text) => {
  if (format === 'json') {
    return JSON.parse(text);
  }
  if (format === 'yaml' || format === 'yml') {
    return yaml.load(text);
  }
  if (format === 'ini') {
    return ini.parse(text);
  }
  return new Error(`Unsupported format ${format}!`);
};
