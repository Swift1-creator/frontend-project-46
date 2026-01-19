// src/index.js
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

// читает и парсит json-файл
const readJson = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(data);
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = readJson(filepath1);
  const obj2 = readJson(filepath2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.sortBy(_.uniq([...keys1, ...keys2]));

  const lines = allKeys.flatMap((key) => {
    const has1 = Object.hasOwn(obj1, key);
    const has2 = Object.hasOwn(obj2, key);

    const val1 = obj1[key];
    const val2 = obj2[key];

    // ключ только в первом файле
    if (has1 && !has2) {
      return [`  - ${key}: ${val1}`];
    }

    // ключ только во втором файле
    if (!has1 && has2) {
      return [`  + ${key}: ${val2}`];
    }

    // ключ в обоих
    if (val1 === val2) {
      // значения равны
      return [`    ${key}: ${val1}`];
    }

    // значения разные
    return [
      `  - ${key}: ${val1}`,
      `  + ${key}: ${val2}`,
    ];
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default genDiff;

