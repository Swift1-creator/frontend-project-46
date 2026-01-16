#!/usr/bin/env node

import { Command } from 'commander';
import { createRequire } from 'module';
import parseFile from '../src/parser.js';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version(version)
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2, options) => {
    // чтение и парсинг файлов
    const data1 = parseFile(filepath1);
    const data2 = parseFile(filepath2);

    // пока просто проверим, что чтение и парсинг работают
    console.log('first file:', data1);
    console.log('second file:', data2);
    // позже здесь будет логика сравнения + формат вывода (options.format)
  });

program.parse();
