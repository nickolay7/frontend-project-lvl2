import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import readFile from '../src/parsers.js';

const expectedData = { nested: '', plain: '' };
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

beforeAll(() => {
  expectedData.plain = readFile(getFixturePath('plain.txt'));
  // expectedData.nested = readFile(getFixturePath('nested.txt'));
});

test('genDiff.json', () => {
  const path1 = getFixturePath('file.json');
  const path2 = getFixturePath('anotherFile.json');
  const expected = expectedData.plain;
  expect(genDiff(path1, path2)).toEqual(expected);
});

test('genDiff.yaml', () => {
  const path1 = getFixturePath('file.yaml');
  const path2 = getFixturePath('anotherFile.yaml');
  const expected = expectedData.plain;
  expect(genDiff(path1, path2)).toEqual(expected);
});
