'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var bdd_SuiteDefault = require('./SuiteDefault.cjs');
var bdd_TestDefault = require('./TestDefault.cjs');
var _assert = require('assert');
require('./contracts.cjs');
require('./runFunc.cjs');
require('@flemist/async-utils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _assert__default = /*#__PURE__*/_interopDefaultLegacy(_assert);

global.assert = _assert__default["default"];
const rootSuite = new bdd_SuiteDefault.SuiteDefault(null, null, '', false, true);
global.parentSuite = rootSuite;
function __describe(title, func, skip) {
    const parentSuite = global.parentSuite;
    try {
        const suite = new bdd_SuiteDefault.SuiteDefault(null, parentSuite, title, skip);
        parentSuite.addSuite(suite);
        global.parentSuite = suite;
        func.call(suite);
    }
    finally {
        global.parentSuite = parentSuite;
    }
}
function __it(title, func, skip) {
    const parentSuite = global.parentSuite;
    const test = new bdd_TestDefault.TestDefault(null, parentSuite, title, func, skip);
    parentSuite.tests.push(test);
}
function _describe(title, func) {
    __describe(title, func, false);
}
function _it(title, func) {
    __it(title, func, false);
}
function _xdescribe(title, func) {
    __describe(title, func, true);
}
function _xit(title, func) {
    __it(title, func, true);
}
function _beforeAll(func) {
    const parentSuite = global.parentSuite;
    parentSuite.beforeAll(func);
}
function _afterAll(func) {
    const parentSuite = global.parentSuite;
    parentSuite.afterAll(func);
}
function _beforeEach(func) {
    const parentSuite = global.parentSuite;
    parentSuite.beforeEach(func);
}
function _afterEach(func) {
    const parentSuite = global.parentSuite;
    parentSuite.afterEach(func);
}
global.it = _it;
global.describe = _describe;
global.xdescribe = _xdescribe;
global.xit = _xit;
global.beforeAll = _beforeAll;
global.afterAll = _afterAll;
global.beforeEach = _beforeEach;
global.afterEach = _afterEach;

exports.rootSuite = rootSuite;
