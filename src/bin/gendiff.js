#!/usr/bin/env node

import program from 'commander';
import jsonDiff from '../index.js';
import stylish from '../formatters/stylish.js';

program.description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --vers', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    if (program.format === 'stylish') {
      console.log(stylish(jsonDiff(filepath1, filepath2)));
    } else {
      console.log(program.format);
    }
  })
  .parse(process.argv);
