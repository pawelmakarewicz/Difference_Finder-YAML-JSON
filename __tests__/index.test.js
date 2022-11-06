import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'node:path';
import { readFileSync } from 'node:fs';
import findDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedStylishFormat = readFileSync(getFixturePath('expectedResultStylish.txt'), 'utf8');
const expectedPlainFormat = readFileSync(getFixturePath('expectedResultPlain.txt'), 'utf8');
const expectedJsonFormat = readFileSync(getFixturePath('expectedResultJSON.txt'), 'utf8');
const firstJSON = getFixturePath('fileTest1.json');
const secondJSON = getFixturePath('fileTest2.json');
const firstYML = getFixturePath('fileTest1.yml');
const secondYML = getFixturePath('fileTest2.yml');

test('1Test JSON files format - as Object', () => {
  expect((findDiff(firstJSON, secondJSON))).toEqual(expectedStylishFormat);
});

test('2Test YML files format - as Object', () => {
  expect((findDiff(firstYML, secondYML))).toEqual(expectedStylishFormat);
});

test('3Test YML and JSON files format - as Object', () => {
  expect(findDiff(firstYML, secondJSON)).toEqual(expectedStylishFormat);
});

test('4Test JSON files format - plain', () => {
  expect(findDiff(firstJSON, secondJSON, 'plain')).toEqual(expectedPlainFormat);
});

test('5Test JSON files format - JSON', () => {
  expect(findDiff(firstJSON, secondJSON, 'json')).toEqual(expectedJsonFormat);
});
