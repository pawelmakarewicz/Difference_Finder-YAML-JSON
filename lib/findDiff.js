import _ from 'lodash';
import parse from '../src/parsers.js';
import format from '../formatters/index.js';

const findDiff = (filePath1, filePath2, typeofFormat = 'stylish') => {
  const firstItem = parse(filePath1);
  const secondeItem = parse(filePath2);
  const makeComparisonOfTwoFiles = (firstItemToCompare, secondeItemToCompare) => {
    const keys1 = Object.keys(firstItemToCompare);
    const keys2 = Object.keys(secondeItemToCompare);
    const itemAdded = 'added';
    const itemRemoved = 'removed';
    const itemChanged = 'updated';
    const keys = _.union(keys1, keys2);
    const keysAlphabeticOrder = _.sortBy(keys);
    const keysCompared = keysAlphabeticOrder.map((key) => {
      if (!Object.hasOwn(firstItemToCompare, key)) {
        return [key, [itemAdded, secondeItemToCompare[key]]];
      } if ((!Object.hasOwn(secondeItemToCompare, key))) {
        return [key, [itemRemoved, firstItemToCompare[key]]];
      } if (typeof firstItemToCompare[key] !== typeof secondeItemToCompare[key]) {
        return [key, [itemChanged, firstItemToCompare[key], secondeItemToCompare[key]]];
      } if (firstItemToCompare[key] !== secondeItemToCompare[key] && typeof firstItemToCompare[key] !== 'object') {
        return [key, [itemChanged, firstItemToCompare[key], secondeItemToCompare[key]]];
      } if (typeof firstItemToCompare[key] !== 'object' || firstItemToCompare[key] === null) {
        return [key, secondeItemToCompare[key]];
      }
      return [key, makeComparisonOfTwoFiles(firstItemToCompare[key], secondeItemToCompare[key])];
    });
    return Object.fromEntries(keysCompared);
  };
  const formattedResult = format(makeComparisonOfTwoFiles(firstItem, secondeItem), typeofFormat);
  return formattedResult;
};

export default findDiff;
