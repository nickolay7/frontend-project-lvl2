#!/bin/env node

import { program } from 'commander';
import jsonDiff from '../jsonDiff.js';

program.description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --vers', 'output the version number')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action(function (filepath1, filepath2) {
    jsonDiff(filepath1, filepath2);
  })
  .parse(process.argv);