import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';
import * as path from 'node:path';

const parse = (filepath) => {
  const data = readFileSync(filepath, 'utf8');
  const format = path.extname(filepath);
  if (format === 'js') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};

export default parse;
