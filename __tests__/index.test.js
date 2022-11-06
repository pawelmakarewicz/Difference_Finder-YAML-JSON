import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'node:path';
import { readFileSync } from 'node:fs';
import findDiff from '../index.js';
import showDifAsObject from '../formatters/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedFlatting = readFileSync(getFixturePath('testResultFiles.txt'), 'utf8');
const expectedFlatFormat = readFileSync(getFixturePath('testResultFlatFormat.txt'), 'utf8');

test('Test JSON files', () => {
  const file1 = getFixturePath('test1.json');
  const file2 = getFixturePath('test2.json');
  expect(showDifAsObject(findDiff(file1, file2))).toEqual(expectedFlatting);
});

test('Test YML files', () => {
  const file3 = getFixturePath('test3.yml');
  const file4 = getFixturePath('test4.yml');
  expect(showDifAsObject(findDiff(file3, file4))).toEqual(expectedFlatting);
});

test('Test YML and JSON files', () => {
  const file1 = getFixturePath('test1.json');
  const file4 = getFixturePath('test4.yml');
  expect(showDifAsObject(findDiff(file1, file4))).toEqual(expectedFlatting);
});

test('Test JSON files Flat format', () => {
  const file1 = getFixturePath('test1.json');
  const file2 = getFixturePath('test2.json');
  expect(showDifAsObject(findDiff(file1, file2))).toEqual(expectedFlatFormat);
});
