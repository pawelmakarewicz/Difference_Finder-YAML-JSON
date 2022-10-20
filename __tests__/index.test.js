import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'node:path';
import { readFileSync } from 'node:fs';
import findDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('Test flat JSON files', () => {
  const file1 = getFixturePath('test1.json');
  const file2 = getFixturePath('test2.json');
  expect(findDiff(file1, file2)).toEqual(readFileSync(getFixturePath('testResultFlatFiles.txt'), 'utf8'));
  // expect(resultsComparison).toMatch('host: hexlet.io');
  // expect(resultsComparison).toMatch('- timeout: 50 ');
  // expect(resultsComparison).toMatch('+ timeout: 20');
  // expect(resultsComparison).toMatch('+ verbose: true');
});
