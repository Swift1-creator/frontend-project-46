import parseFile from './parser.js';
import buildDiff from './buildDiff.js';
import stylish from './formatters/stylish.js';

const getFormatter = (format) => {
  switch (format) {
    case 'stylish':
    case undefined:
      return stylish;
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);

  const diffTree = buildDiff(obj1, obj2);
  const formatter = getFormatter(format);

  return formatter(diffTree);
};
export default genDiff;
