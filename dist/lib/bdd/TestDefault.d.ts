import type { ISuite, ITest } from './contracts';
import { TestFunc } from './contracts';
export declare class TestDefault implements ITest {
    constructor(file: string, parent: ISuite, title: string, fn: TestFunc, skip: boolean);
    readonly type = "test";
    readonly title: string;
    readonly fn: TestFunc;
    readonly body: string;
    readonly async: boolean;
    readonly sync: boolean;
    readonly skip: boolean;
    private _timeout;
    readonly parent: ISuite | undefined;
    readonly file: string | undefined;
    err: Error | undefined;
    duration: number | undefined;
    pending: boolean;
    state: 'failed' | 'passed' | 'pending' | undefined;
    timedOut: boolean;
    timeout(): number;
    timeout(ms: number): this;
    isPending(): boolean;
    isFailed(): boolean;
    isPassed(): boolean;
    fullTitle(separator?: string): string;
    titlePath(): string[];
    slow(): number;
    reset(): void;
}
