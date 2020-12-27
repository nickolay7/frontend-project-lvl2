import _ from 'lodash';

export default (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.union(keys1, keys2);
  return `{\n${allKeys.map((key) => {
    if (!(_.has(obj1, key)) && (_.has(obj2, key))) {
      return ` + ${key}: ${obj2[key]}`;
    }
    if ((_.has(obj1, key)) && !(_.has(obj2, key))) {
      return ` - ${key}: ${obj1[key]}`;
    }
    if (obj1[key] === obj2[key]) {
      return `   ${key}: ${obj2[key]}`;
    }
    return ` - ${key}: ${obj1[key]}\n + ${key}: ${obj2[key]}`;
  }).sort(function(a, b) {
    if (a[3] > b[3]) {
      return 1; }
    if (a[3] < b[3]) {
      return -1; }
    return 0;
  }).join('\n')}\n}`;
};
