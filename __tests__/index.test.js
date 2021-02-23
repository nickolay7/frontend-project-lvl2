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

test.each(['json', 'yaml'])('genDiff %s files', (ext) => {
  const path1 = getPath(`fileBefore.${ext}`);
  const path2 = getPath(`fileAfter.${ext}`);
  expect(genDiff(path1, path2, 'stylish')).toEqual(expectedNested);
  expect(genDiff(path1, path2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(path1, path2, 'json')).toEqual(expectedJson);
});

test('genDiff ini files', () => {
  const path1 = getPath('fileBefore.ini');
  const path2 = getPath('fileAfter.ini');
  expect(genDiff(path1, path2, 'stylish')).toEqual(expectedNested);
  expect(genDiff(path1, path2, 'plain')).toEqual(expectedPlain);
});
