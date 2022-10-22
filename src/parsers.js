import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';
import * as path from 'node:path';

const parse = (filepath) => {
  const data = readFileSync(filepath, 'utf8');
  const format = path.extname(filepath);
  let parserFunction;
  if (format === 'js') {
    parserFunction = JSON.parse;
  } else {
    parserFunction = yaml.load;
  }
  return parserFunction(data);
};

export default parse;
