#!/usr/bin/env node
import { Command } from 'commander';
import findDiff from '../lib/findDiff.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'arg')
  .action(findDiff);
program.parse();
