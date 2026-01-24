// __tests__/gendiff.test.js

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('expected-stylish.txt').trimEnd(); // ← добавили trimEnd

test('gendiff nested json stylish', () => {
  const filepath1 = getFixturePath('file1-nested.json');
  const filepath2 = getFixturePath('file2-nested.json');

  expect(genDiff(filepath1, filepath2, 'stylish').trimEnd()).toBe(expectedStylish);
  //                                ^^^^^^^^^^
});

test('gendiff nested yaml stylish', () => {
  const filepath1 = getFixturePath('file1-nested.yml');
  const filepath2 = getFixturePath('file2-nested.yml');

  expect(genDiff(filepath1, filepath2, 'stylish').trimEnd()).toBe(expectedStylish);
});
