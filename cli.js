#!/usr/bin/env node

const {Command} = require('commander')
const pkg = require('./package.json')
const {fetchTemplate} = require("./index");

const program = new Command()

program
  .version(pkg.version)


program.command('init')
  .description('init project')
  .action(() => {
    const [name] = process.argv.slice(3)
    fetchTemplate(name)
  });

program.parse(process.argv);

