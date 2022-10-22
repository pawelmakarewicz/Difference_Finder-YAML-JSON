import _ from 'lodash';
import parse from '../src/parsers.js';

const findDiff = (filePath1, filePath2) => {
  const addDifference = (differenceDescription, key, value) => `${differenceDescription} ${key}: ${value}`;
  const differences = ['{'];
  const firstFileToCompare = parse(filePath1);
  const secondeFileToCompare = parse(filePath2);
  const keys1 = Object.keys(firstFileToCompare);
  const keys2 = Object.keys(secondeFileToCompare);
  const keysAlphabeticOrder = _.union(keys1, keys2).sort();
  const itemAdded = '+';
  const itemRemoved = '-';
  const itemSame = ' ';
  keysAlphabeticOrder.forEach((key) => {
    if (!Object.hasOwn(firstFileToCompare, key)) {
      differences.push(addDifference(itemAdded, key, secondeFileToCompare[key]));
    } else if ((!Object.hasOwn(secondeFileToCompare, key))) {
      differences.push(addDifference(itemRemoved, key, firstFileToCompare[key]));
    } else if (firstFileToCompare[key] !== secondeFileToCompare[key]) {
      differences.push(addDifference(itemRemoved, key, firstFileToCompare[key]));
      differences.push(addDifference(itemAdded, key, secondeFileToCompare[key]));
    } else {
      differences.push(addDifference(itemSame, key, firstFileToCompare[key]));
    }
  });
  differences.push('}');
  console.log(differences.join('\n'));
  return differences.join('\n');
};

export default findDiff;
