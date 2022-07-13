import type { Stats } from 'mocha';
import type { IRunner, ISuite, ITest, RunnerEventNames, RunnerListener } from './contracts';
export declare class RunnerDefault implements IRunner {
    constructor(grep: RegExp | null);
    private readonly _eventEmitter;
    readonly _grep: RegExp;
    readonly stats: Stats;
    failures: number;
    started: boolean;
    suite: ISuite;
    test: ITest;
    total: number;
    on(event: RunnerEventNames, listener: RunnerListener): this;
    once(event: RunnerEventNames, listener: RunnerListener): this;
    off(event: RunnerEventNames, listener: RunnerListener): this;
    addListener(event: RunnerEventNames, listener: RunnerListener): this;
    removeListener(event: RunnerEventNames, listener: RunnerListener): this;
    emit(name: RunnerEventNames, ...rootSuite: (any)[]): boolean;
}
