import { readFileSync } from 'node:fs';
import _ from 'lodash';

const findDiff = (filePath1, filePath2) => {
  const addDiffernce = (differenceDescription, key, value) => `${differenceDescription} ${key}: ${value}`;
  const differences = ['{'];
  const firtsFileToCoompare = JSON.parse(readFileSync(filePath1, 'utf8'));
  const secondfFileToCoompare = JSON.parse(readFileSync(filePath2, 'utf8'));
  const keys1 = Object.keys(firtsFileToCoompare);
  const keys2 = Object.keys(secondfFileToCoompare);
  const keysAlphabeticOrder = _.union(keys1, keys2).sort();
  const itemAdded = '+';
  const itemRemoved = '-';
  const itemSame = ' ';
  keysAlphabeticOrder.forEach((key) => {
    if (!Object.hasOwn(firtsFileToCoompare, key)) {
      differences.push(addDiffernce(itemAdded, key, secondfFileToCoompare[key]));
    } else if ((!Object.hasOwn(secondfFileToCoompare, key))) {
      differences.push(addDiffernce(itemRemoved, key, firtsFileToCoompare[key]));
    } else if (firtsFileToCoompare[key] !== secondfFileToCoompare[key]) {
      differences.push(addDiffernce(itemRemoved, key, firtsFileToCoompare[key]));
      differences.push(addDiffernce(itemAdded, key, secondfFileToCoompare[key]));
    } else {
      differences.push(addDiffernce(itemSame, key, firtsFileToCoompare[key]));
    }
  });
  differences.push('}');
  console.log(differences.join('\n'));
  return differences;
};

export default findDiff;
