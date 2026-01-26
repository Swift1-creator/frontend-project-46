import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

const expectedStylish = readFile('expected-stylish.txt').trimEnd()
const expectedPlain = readFile('expected-plain.txt').trimEnd()
const expectedJson = readFile('expected-json.txt').trimEnd()

test('gendiff nested json stylish', () => {
  const filepath1 = getFixturePath('file1-nested.json')
  const filepath2 = getFixturePath('file2-nested.json')

  expect(genDiff(filepath1, filepath2, 'stylish').trimEnd()).toBe(expectedStylish)
})

test('gendiff nested yaml stylish', () => {
  const filepath1 = getFixturePath('file1-nested.yml')
  const filepath2 = getFixturePath('file2-nested.yml')

  expect(genDiff(filepath1, filepath2, 'stylish').trimEnd()).toBe(expectedStylish)
})

test('gendiff nested json plain', () => {
  const filepath1 = getFixturePath('file1-nested.json')
  const filepath2 = getFixturePath('file2-nested.json')

  expect(genDiff(filepath1, filepath2, 'plain').trimEnd()).toBe(expectedPlain)
})

test('gendiff nested yaml plain', () => {
  const filepath1 = getFixturePath('file1-nested.yml')
  const filepath2 = getFixturePath('file2-nested.yml')

  expect(genDiff(filepath1, filepath2, 'plain').trimEnd()).toBe(expectedPlain)
})

test('gendiff nested json json format', () => {
  const filepath1 = getFixturePath('file1-nested.json')
  const filepath2 = getFixturePath('file2-nested.json')

  expect(genDiff(filepath1, filepath2, 'json').trimEnd()).toBe(expectedJson)
})

test('gendiff nested yaml json format', () => {
  const filepath1 = getFixturePath('file1-nested.yml')
  const filepath2 = getFixturePath('file2-nested.yml')

  expect(genDiff(filepath1, filepath2, 'json').trimEnd()).toBe(expectedJson)
})
