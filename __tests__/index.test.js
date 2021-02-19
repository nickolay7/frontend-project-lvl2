import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getPath = (fileName) => getFixturePath(fileName);
const expectedPlain = fs.readFileSync(getFixturePath('plain.txt'), 'utf-8');
const expectedNested = fs.readFileSync(getFixturePath('stylish.txt'), 'utf-8');
const expectedJson = fs.readFileSync(getFixturePath('json.txt'), 'utf-8');

const cases = [
  [getPath('fileBefore.json'), getPath('fileAfter.json'), 'stylish', expectedNested],
  [getPath('fileBefore.yaml'), getPath('fileAfter.yaml'), 'stylish', expectedNested],
  [getPath('fileBefore.ini'), getPath('fileAfter.ini'), 'stylish', expectedNested],
  [getPath('fileBefore.json'), getPath('fileAfter.json'), 'plain', expectedPlain],
  [getPath('fileBefore.yaml'), getPath('fileAfter.yaml'), 'plain', expectedPlain],
  [getPath('fileBefore.ini'), getPath('fileAfter.ini'), 'plain', expectedPlain],
  [getPath('fileBefore.json'), getPath('fileAfter.json'), 'json', expectedJson],
];

test.each(cases)('genDiff', (path1, path2, formatName, expected) => {
  expect(genDiff(path1, path2, formatName)).toEqual(expected);
});
