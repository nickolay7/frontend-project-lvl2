import plain from './plain.js';
import stylish from './stylish.js';

export default (data, formatName) => (formatName === 'stylish' ? stylish(data) : plain(data));