import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'node:path';
import { readFileSync } from 'node:fs';
import findDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedFlatting = readFileSync(getFixturePath('testResultFiles.txt'), 'utf8');
const expectedPlainFormat = readFileSync(getFixturePath('testResultPlainFormat.txt'), 'utf8');
const expectedJsonFormat = readFileSync(getFixturePath('testResultJsonFormat.txt'), 'utf8');

test('Test JSON files format - as Object', () => {
  const file1 = getFixturePath('test1.json');
  const file2 = getFixturePath('test2.json');
  expect((findDiff(file1, file2))).toEqual(expectedFlatting);
});

test('Test YML files format - as Object', () => {
  const file3 = getFixturePath('test3.yml');
  const file4 = getFixturePath('test4.yml');
  expect((findDiff(file3, file4))).toEqual(expectedFlatting);
});

test('Test YML and JSON files format - as Object', () => {
  const file1 = getFixturePath('test1.json');
  const file4 = getFixturePath('test4.yml');
  expect(findDiff(file1, file4)).toEqual(expectedFlatting);
});

test('Test JSON files format - plain', () => {
  const file1 = getFixturePath('test1.json');
  const file2 = getFixturePath('test2.json');
  expect(findDiff(file1, file2, 'plain')).toEqual(expectedPlainFormat);
});

test('Test JSON files format - JSON', () => {
  const file1 = getFixturePath('test1.json');
  const file2 = getFixturePath('test2.json');
  expect(findDiff(file1, file2, 'json')).toEqual(expectedJsonFormat);
});
