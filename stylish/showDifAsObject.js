const showDifAsObject = (data) => {
  const item = '  ';
  const itemTheSame = '  ';
  const itemRemoved = '- ';
  const itemAdded = '+ ';
  const repeat = 2;
  const showDif = (changesDescription) => {
    if (changesDescription === 'added') {
      return itemAdded;
    } if (changesDescription === 'removed') {
      return itemRemoved;
    }
    return itemTheSame;
  };
  const isDiff = (valueofItem) => Array.isArray(valueofItem);
  const getChangesDescription = (valueofItem) => valueofItem[0];
  const isItemUpdated = (valueofItem) => valueofItem[0] !== 'updated';
  const getItemfromFirstFile = (valueofItem) => valueofItem[1];
  const getItemfromSecondFile = (valueofItem) => valueofItem[2];
  const makeString = (accData, accDeth) => {
    if (typeof accData !== 'object' || accData === null) {
      return `${accData}`;
    }
    const repeatNumber = accDeth;
    const lineIndent = `${item.repeat(repeatNumber)}`;
    const keys = Object.entries(accData);
    const lines = keys.map(([key, value]) => {
      if (isDiff(value)) {
        if (isItemUpdated(value)) {
          return `${lineIndent}${showDif(getChangesDescription(value))}${key}: ${makeString(getItemfromFirstFile(value), accDeth + 2)}`;
        }
        return [`${lineIndent}${itemRemoved}${key}: ${makeString(getItemfromFirstFile(value), accDeth + 2)}`,
          `${lineIndent}${itemAdded}${key}: ${makeString(getItemfromSecondFile(value), accDeth + 2)}`];
      }
      return `${lineIndent}${itemTheSame}${key}: ${makeString(value, accDeth + 2)}`;
    });
    const numberForBack = 1;
    const numberBack = repeatNumber + numberForBack - repeat;
    const closers = `${item.repeat(numberBack)}}`;
    const flatLines = lines.flatMap((line) => line);
    const accArr = ['{',
      ...flatLines,
      closers,
    ].join('\n');
    return accArr;
  };
  return makeString(data, 1);
};

export default showDifAsObject;
// console.log(showDifAsObject(findDiff('./__fixtures__/test3.yml', './__fixtures__/test4.yml')));
// console.log(superWay.flatMap((item) => item));
