import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const getFormat = filepath => path.extname(filepath).slice(1) // 'json', 'yml', 'yaml'

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  return fs.readFileSync(absolutePath, 'utf-8')
}

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data)
    case 'yml':
    case 'yaml':
      return yaml.load(data)
    default:
      throw new Error(`Unknown format: ${format}`)
  }
}

const parseFile = (filepath) => {
  const format = getFormat(filepath)
  const data = readFile(filepath)
  return parse(data, format)
}

export default parseFile
