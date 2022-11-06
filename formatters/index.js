import showDifPlain from './plain.js';
import showDifAsObject from './stylish.js';
// import findDiff from '../lib/findDiff.js';

const format = (data, typeofFormat) => {
  if (typeofFormat === 'plain') {
    return showDifPlain(data);
  }
  if (typeofFormat === 'json') {
    return JSON.stringify(data);
  }
  return showDifAsObject(data);
};

export default format;
// console.log(format(findDiff('./__fixtures__/test1.json', './__fixtures__/test2.json'), 'jads'));
