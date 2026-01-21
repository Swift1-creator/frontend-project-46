import _ from 'lodash';
import parseFile from './parser.js';

const genDiff = (filepath1, filepath2) => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.sortBy(_.uniq([...keys1, ...keys2]));

  const lines = allKeys.flatMap((key) => {
    const has1 = Object.hasOwn(obj1, key);
    const has2 = Object.hasOwn(obj2, key);

    const val1 = obj1[key];
    const val2 = obj2[key];

    if (has1 && !has2) {
      return [`  - ${key}: ${val1}`];
    }

    if (!has1 && has2) {
      return [`  + ${key}: ${val2}`];
    }

    if (val1 === val2) {
      return [`    ${key}: ${val1}`];
    }

    return [
      `  - ${key}: ${val1}`,
      `  + ${key}: ${val2}`,
    ];
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default genDiff;
