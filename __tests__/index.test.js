import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import readFile from '../src/parsers.js';

const expectedData = { nested: '', plain: '', json: '' };
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

beforeAll(() => {
  expectedData.plain = readFile(getFixturePath('plain.txt'));
  expectedData.nested = readFile(getFixturePath('nested.txt'));
  expectedData.json = readFile(getFixturePath('diff.json'));
});

test('genDiff.json nested', () => {
  const path1 = getFixturePath('nestedFile.json');
  const path2 = getFixturePath('anotherNestedFile.json');
  const expected = expectedData.nested;
  expect(genDiff(path1, path2, 'stylish')).toEqual(expected);
});

test('genDiff.yaml nested', () => {
  const path1 = getFixturePath('nestedFile.yaml');
  const path2 = getFixturePath('anotherNestedFile.yaml');
  const expected = expectedData.nested;
  expect(genDiff(path1, path2, 'stylish')).toEqual(expected);
});

test('genDiff.json plain', () => {
  const path1 = getFixturePath('nestedFile.json');
  const path2 = getFixturePath('anotherNestedFile.json');
  const expected = expectedData.plain;
  expect(genDiff(path1, path2, 'plain')).toEqual(expected);
});

test('genDiff.yaml plain', () => {
  const path1 = getFixturePath('nestedFile.yaml');
  const path2 = getFixturePath('anotherNestedFile.yaml');
  const expected = expectedData.plain;
  expect(genDiff(path1, path2, 'plain')).toEqual(expected);
});

test('genDiff.json json', () => {
  const path1 = getFixturePath('nestedFile.json');
  const path2 = getFixturePath('anotherNestedFile.json');
  const expected = expectedData.json;
  expect(genDiff(path1, path2, 'json')).toEqual(expected);
});
