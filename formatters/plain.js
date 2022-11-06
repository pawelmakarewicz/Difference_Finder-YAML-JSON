const showDifPlain = (data) => {
  const increaseDepth = (item) => !Array.isArray(item) && typeof item === 'object' && item !== null;
  const isChanged = (item) => typeof item[1] === 'object';
  const showValueType = (item) => {
    if (typeof item === 'object' && item !== null) {
      return '[complex value]';
    }
    if (typeof item === 'string') {
      return `'${item}'`;
    }
    return item;
  };
  const getChangesDescription = (item) => {
    if (item[0] === 'added') {
      return `added with value: ${showValueType(item[1])}`;
    }
    if (item[0] === 'removed') {
      return 'removed';
    }
    return `updated. From ${showValueType(item[1])} to ${showValueType(item[2])}`;
  };
  const filterDiff = (item) => {
    const keys = Object.entries(item)
      .map(([key, value]) => (increaseDepth(value) ? [key, filterDiff(value)] : [key, value]));
    const differences = keys.filter((keyValue) => isChanged(keyValue));
    return Object.fromEntries(differences);
  };
  const filteredDiff = filterDiff(data);
  const makePlaneLines = (filteredData, acc) => {
    const keysFiltered = Object.entries(filteredData)
      .map(([key, value]) => {
        if (increaseDepth(value)) {
          return makePlaneLines(value, `${acc}${key}.`);
        }
        return `Property '${acc}${key}' was ${getChangesDescription(value)}`;
      });
    const filteredResult = keysFiltered.flatMap((item) => item);
    return filteredResult;
  };
  return makePlaneLines(filteredDiff, '').join('\n');
};

export default showDifPlain;
