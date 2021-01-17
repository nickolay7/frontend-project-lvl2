import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import readFile from '../src/parsers.js';
import defaultFormatter from '../src/stylish.js';
import plainFormatter from '../src/plain.js';

const expectedData = { nested: '', plain: '' };
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

beforeAll(() => {
  expectedData.plain = readFile(getFixturePath('plain.txt'));
  expectedData.nested = readFile(getFixturePath('nested.txt'));
});

test('genDiff.json nested', () => {
  const path1 = getFixturePath('nestedFile.json');
  const path2 = getFixturePath('anotherNestedFile.json');
  const expected = expectedData.nested;
  expect(defaultFormatter(genDiff(path1, path2))).toEqual(expected);
});

test('genDiff.yaml nested', () => {
  const path1 = getFixturePath('nestedFile.yaml');
  const path2 = getFixturePath('anotherNestedFile.yaml');
  const expected = expectedData.nested;
  expect(defaultFormatter(genDiff(path1, path2))).toEqual(expected);
});

test('genDiff.json plain', () => {
  const path1 = getFixturePath('nestedFile.json');
  const path2 = getFixturePath('anotherNestedFile.json');
  const expected = expectedData.plain;
  expect(plainFormatter(genDiff(path1, path2))).toEqual(expected);
});

test('genDiff.yaml plain', () => {
  const path1 = getFixturePath('nestedFile.yaml');
  const path2 = getFixturePath('anotherNestedFile.yaml');
  const expected = expectedData.plain;
  expect(plainFormatter(genDiff(path1, path2))).toEqual(expected);
});
