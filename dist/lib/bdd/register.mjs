import { SuiteDefault } from './SuiteDefault.mjs';
import { TestDefault } from './TestDefault.mjs';
import _assert from 'assert';
import './contracts.mjs';
import './runFunc.mjs';
import '@flemist/async-utils';

global.assert = _assert;
const rootSuite = new SuiteDefault(null, null, '', false, true);
global.parentSuite = rootSuite;
function __describe(title, func, skip) {
    const parentSuite = global.parentSuite;
    try {
        const suite = new SuiteDefault(null, parentSuite, title, skip);
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
    const test = new TestDefault(null, parentSuite, title, func, skip);
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

export { rootSuite };
