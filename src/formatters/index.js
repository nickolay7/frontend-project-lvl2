import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

export default (data, formatName) => {
  if (formatName === 'stylish') {
    return stylish(data);
  }
  if (formatName === 'plain') {
    return plain(data);
  }
  if (formatName === 'json') {
    return json(data);
  }
  throw new Error(`Wrong format name: "${formatName}", please look doc...`);
};
