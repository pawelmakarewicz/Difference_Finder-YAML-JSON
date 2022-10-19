import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'node:path';
import findDiff from '../lib/findDiffTwoJSONFiles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const file1 = getFixturePath('test1.json');
const file2 = getFixturePath('test2.json');
test('findDiff', () => {
  expect((findDiff(file1, file2))).toMatch('- follow: false');
  expect((findDiff(file1, file2))).toMatch('host: hexlet.io');
  expect((findDiff(file1, file2))).toMatch('- timeout: 50');
  expect((findDiff(file1, file2))).toMatch('+ timeout: 20');
  expect((findDiff(file1, file2))).toMatch('+ verbose: true');
});
