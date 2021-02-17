import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const expectedData = {};
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getPath = (fileName) => getFixturePath(fileName);

expectedData.plain = fs.readFileSync(getFixturePath('plain.txt'), 'utf-8');
expectedData.nested = fs.readFileSync(getFixturePath('nested.txt'), 'utf-8');
expectedData.json = fs.readFileSync(getFixturePath('json.txt'), 'utf-8');

const cases = [
  [getPath('nestedFile.json'), getPath('anotherNestedFile.json'), 'stylish', expectedData.nested],
  [getPath('nestedFile.yaml'), getPath('anotherNestedFile.yaml'), 'stylish', expectedData.nested],
  [getPath('file.ini'), getPath('anotherFile.ini'), 'stylish', expectedData.nested],
  [getPath('nestedFile.json'), getPath('anotherNestedFile.json'), 'plain', expectedData.plain],
  [getPath('nestedFile.yaml'), getPath('anotherNestedFile.yaml'), 'plain', expectedData.plain],
  [getPath('file.ini'), getPath('anotherFile.ini'), 'plain', expectedData.plain],
  [getPath('nestedFile.json'), getPath('anotherNestedFile.json'), 'json', expectedData.json],
];

test.each(cases)('genDiff', (path1, path2, formatName, expected) => {
  expect(genDiff(path1, path2, formatName)).toEqual(expected);
});
