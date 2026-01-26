import parseFile from './parser.js'
import buildDiff from './buildDiff.js'
import getFormatter from './formatters/index.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = parseFile(filepath1)
  const obj2 = parseFile(filepath2)

  const diffTree = buildDiff(obj1, obj2)
  const formatter = getFormatter(format)

  return formatter(diffTree)
}

export default genDiff
