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
  ['json', 'stylish', getPath('fileBefore.json'), getPath('fileAfter.json'), expectedNested],
  ['yaml', 'stylish', getPath('fileBefore.yaml'), getPath('fileAfter.yaml'), expectedNested],
  ['ini', 'stylish', getPath('fileBefore.ini'), getPath('fileAfter.ini'), expectedNested],
  ['json', 'plain', getPath('fileBefore.json'), getPath('fileAfter.json'), expectedPlain],
  ['yaml', 'plain', getPath('fileBefore.yaml'), getPath('fileAfter.yaml'), expectedPlain],
  ['ini', 'plain', getPath('fileBefore.ini'), getPath('fileAfter.ini'), expectedPlain],
  ['json', 'json', getPath('fileBefore.json'), getPath('fileAfter.json'), expectedJson],
];

test.each(cases)('genDiff %s files, formatted as %s', (ext, format, path1, path2, expected) => {
  expect(genDiff(path1, path2, format)).toEqual(expected);
});
