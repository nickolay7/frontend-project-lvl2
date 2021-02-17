import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getPath = (fileName) => getFixturePath(fileName);
const expectedPlain = fs.readFileSync(getFixturePath('plain.txt'), 'utf-8');
const expectedNested = fs.readFileSync(getFixturePath('nested.txt'), 'utf-8');
const expectedJson = fs.readFileSync(getFixturePath('json.txt'), 'utf-8');

const cases = [
  [getPath('nestedFile.json'), getPath('anotherNestedFile.json'), 'stylish', expectedNested],
  [getPath('nestedFile.yaml'), getPath('anotherNestedFile.yaml'), 'stylish', expectedNested],
  [getPath('file.ini'), getPath('anotherFile.ini'), 'stylish', expectedNested],
  [getPath('nestedFile.json'), getPath('anotherNestedFile.json'), 'plain', expectedPlain],
  [getPath('nestedFile.yaml'), getPath('anotherNestedFile.yaml'), 'plain', expectedPlain],
  [getPath('file.ini'), getPath('anotherFile.ini'), 'plain', expectedPlain],
  [getPath('nestedFile.json'), getPath('anotherNestedFile.json'), 'json', expectedJson],
];

test.each(cases)('genDiff', (path1, path2, formatName, expected) => {
  expect(genDiff(path1, path2, formatName)).toEqual(expected);
});
