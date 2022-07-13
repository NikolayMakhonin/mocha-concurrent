/// <reference types="node" />
import type { TDescribeFunc, TestFunc } from './contracts';
import { SuiteDefault } from './SuiteDefault';
import _assert from 'assert';
export declare const rootSuite: SuiteDefault;
declare function _describe(title: string, func: TDescribeFunc): void;
declare function _it(title: string, func: TestFunc): void;
declare function _xdescribe(title: string, func: () => Promise<void> | void): void;
declare function _xit(title: string, func: TestFunc): void;
declare function _beforeAll(func: TestFunc): void;
declare function _afterAll(func: TestFunc): void;
declare function _beforeEach(func: TestFunc): void;
declare function _afterEach(func: TestFunc): void;
export declare type Globals = {
    assert: typeof _assert;
    it: typeof _it;
    describe: typeof _describe;
    xdescribe: typeof _xdescribe;
    xit: typeof _xit;
    beforeAll: typeof _beforeAll;
    afterAll: typeof _afterAll;
    beforeEach: typeof _beforeEach;
    afterEach: typeof _afterEach;
};
export {};
