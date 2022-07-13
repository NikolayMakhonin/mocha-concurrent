'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./register.cjs');
var globby = require('globby');
var path = require('path');
var bdd_loadModule = require('./loadModule.cjs');
require('./SuiteDefault.cjs');
require('./contracts.cjs');
require('./runFunc.cjs');
require('@flemist/async-utils');
require('./TestDefault.cjs');
require('assert');
require('url');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var globby__default = /*#__PURE__*/_interopDefaultLegacy(globby);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

async function loadFiles(testFilesPatterns) {
    const files = await globby__default["default"](testFilesPatterns.map(o => o.replace(/\\/g, '/')));
    return Promise.all(files.map(filePath => bdd_loadModule.loadModule(path__default["default"].resolve(filePath))));
}

exports.loadFiles = loadFiles;
