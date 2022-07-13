'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var yargs = require('./yargs.cjs');
var bdd_runTests = require('./runTests.cjs');
var dotenv = require('dotenv');
require('./register.cjs');
require('./SuiteDefault.cjs');
require('./contracts.cjs');
require('./runFunc.cjs');
require('@flemist/async-utils');
require('./TestDefault.cjs');
require('assert');
require('./loadFiles.cjs');
require('globby');
require('path');
require('./loadModule.cjs');
require('url');
require('./ReporterConsole.cjs');
require('kleur');
require('./RunnerDefault.cjs');
require('eventemitter3');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var yargs__default = /*#__PURE__*/_interopDefaultLegacy(yargs);
var dotenv__default = /*#__PURE__*/_interopDefaultLegacy(dotenv);

dotenv__default["default"].config();
async function run() {
    const argv = await yargs__default["default"](process.argv)
        .option('watch', {
        alias: 'w',
        type: 'boolean',
        description: 'Watch files in the current working directory for changes',
        'default': false,
    })
        .option('timeout', {
        alias: 't',
        type: 'number',
        description: 'Specify test timeout threshold (in milliseconds)',
        'default': 2000,
    })
        .option('reporter', {
        alias: 'R',
        type: 'string',
        description: 'Specify reporter to use',
    })
        .option('grep', {
        alias: 'g',
        type: 'string',
        description: 'Only run tests matching this string or regexp',
        'default': null,
    })
        .argv;
    const { watch, timeout, reporter: reporterPath, grep, _: [, , ...filesGlobs], } = argv;
    bdd_runTests.runTests({
        watch,
        timeout,
        reporterPath,
        filesGlobs: filesGlobs,
        grep: grep && new RegExp(grep),
    });
}
void run();

exports.run = run;
