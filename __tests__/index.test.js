import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'node:path';
import { readFileSync } from 'node:fs';
import findDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedFlatting = readFileSync(getFixturePath('testResultFlatFiles.txt'), 'utf8');

test('Test flat JSON files', () => {
  const file1 = getFixturePath('test1.json');
  const file2 = getFixturePath('test2.json');
  expect(findDiff(file1, file2)).toEqual(expectedFlatting);
});

test('Test flat YML files', () => {
  const file3 = getFixturePath('test3.yml');
  const file4 = getFixturePath('test4.yml');
  expect(findDiff(file3, file4)).toEqual(expectedFlatting);
});

test('Test flat YML and JSON files', () => {
  const file3 = getFixturePath('test1.json');
  const file4 = getFixturePath('test4.yml');
  expect(findDiff(file3, file4)).toEqual(expectedFlatting);
});
