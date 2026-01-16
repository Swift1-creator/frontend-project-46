import fs from 'fs';
import path from 'path';

const getFormat = (filepath) => path.extname(filepath).slice(1); // 'json'

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  return data;
};

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

const parseFile = (filepath) => {
  const format = getFormat(filepath);
  const data = readFile(filepath);
  return parse(data, format);
};

export default parseFile;
