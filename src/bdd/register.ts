import type {
  ISuite,
  ITest,
  TDescribeFunc, TestFunc,
} from './contracts'
import {SuiteDefault} from './SuiteDefault'
import {TestDefault} from './TestDefault'
import _assert from 'assert'

;(global as any).assert = _assert

export const rootSuite = new SuiteDefault(null, null, '', false, true)
global.parentSuite = rootSuite

function __describe(title: string, func: TDescribeFunc, skip: boolean) {
  const parentSuite: ISuite = global.parentSuite
  try {
    const suite = new SuiteDefault(null, parentSuite, title, skip)
    parentSuite.addSuite(suite)
    global.parentSuite = suite
    func.call(suite)
  }
  finally {
    global.parentSuite = parentSuite
  }
}

function __it(title: string, func: TestFunc, skip: boolean) {
  const parentSuite: ISuite = global.parentSuite
  const test: ITest = new TestDefault(null, parentSuite, title, func, skip)
  parentSuite.tests.push(test)
}

function _describe(title: string, func: TDescribeFunc) {
  __describe(title, func, false)
}

function _it(title: string, func: TestFunc) {
  __it(title, func, false)
}

function _xdescribe(title: string, func: () => Promise<void>|void) {
  __describe(title, func, true)
}

function _xit(title: string, func: TestFunc) {
  __it(title, func, true)
}

function _beforeAll(func: TestFunc) {
  const parentSuite: ISuite = global.parentSuite
  parentSuite.beforeAll(func)
}

function _afterAll(func: TestFunc) {
  const parentSuite: ISuite = global.parentSuite
  parentSuite.afterAll(func)
}

function _beforeEach(func: TestFunc) {
  const parentSuite: ISuite = global.parentSuite
  parentSuite.beforeEach(func)
}

function _afterEach(func: TestFunc) {
  const parentSuite: ISuite = global.parentSuite
  parentSuite.afterEach(func)
}

(global as any).it = _it
;(global as any).describe = _describe
;(global as any).xdescribe = _xdescribe
;(global as any).xit = _xit
;(global as any).beforeAll = _beforeAll
;(global as any).afterAll = _afterAll
;(global as any).beforeEach = _beforeEach
;(global as any).afterEach = _afterEach

export type Globals = {
  assert: typeof _assert
  it: typeof _it
  describe: typeof _describe
  xdescribe: typeof _xdescribe
  xit: typeof _xit
  beforeAll: typeof _beforeAll
  afterAll: typeof _afterAll
  beforeEach: typeof _beforeEach
  afterEach: typeof _afterEach
}
