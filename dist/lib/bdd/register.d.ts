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
declare global {
    const assert: typeof _assert;
    const it: typeof _it;
    const describe: typeof _describe;
    const xdescribe: typeof _xdescribe;
    const xit: typeof _xit;
    const beforeAll: typeof _beforeAll;
    const afterAll: typeof _afterAll;
    const beforeEach: typeof _beforeEach;
    const afterEach: typeof _afterEach;
}
export {};
