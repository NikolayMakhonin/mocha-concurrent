import { RunnerConstants } from './contracts.mjs';
import { runFunc } from './runFunc.mjs';
import '@flemist/async-utils';

class SuiteDefault {
    constructor(file, parent, title, skip, isRoot) {
        this.type = 'suite';
        this.suites = [];
        this.tests = [];
        this._afterAll = [];
        this._afterEach = [];
        this._beforeAll = [];
        this._beforeEach = [];
        this._onlySuites = [];
        this._onlyTests = [];
        this.parent = void 0;
        this.file = void 0;
        this._timeout = 2000;
        this.pending = false;
        this.title = title;
        this.skip = skip;
        this.root = isRoot || false;
        this.parent = parent;
        this.file = file;
    }
    addSuite(suite) {
        this.suites.push(suite);
        return this;
    }
    addTest(test) {
        this.tests.push(test);
        return this;
    }
    afterAll(fn) {
        this._afterAll.push(fn);
        return this;
    }
    afterEach(fn) {
        this._afterEach.push(fn);
        return this;
    }
    beforeAll(fn) {
        this._beforeAll.push(fn);
        return this;
    }
    beforeEach(fn) {
        this._beforeEach.push(fn);
        return this;
    }
    fullTitle(separator) {
        return this.titlePath().join(separator || ' ');
    }
    isPending() {
        return this.pending || (this.parent && this.parent.isPending());
    }
    timeout(ms) {
        if (!arguments.length) {
            return this._timeout;
        }
        this._timeout = ms;
        return this;
    }
    titlePath() {
        let result = [];
        if (this.parent) {
            result = result.concat(this.parent.titlePath());
        }
        if (!this.root) {
            result.push(this.title);
        }
        return result;
    }
    total() {
        return (this.suites.reduce((sum, suite) => {
            return sum + suite.total();
        }, 0) + this.tests.length);
    }
    async runTest(runner, skip, test) {
        if (runner._grep && !runner._grep.test(test.fullTitle())) {
            return;
        }
        if (!skip) {
            skip = test.skip;
        }
        if (skip) {
            test.pending = true;
            runner.emit(RunnerConstants.EVENT_TEST_PENDING, test);
            return;
        }
        runner.emit(RunnerConstants.EVENT_TEST_BEGIN, test);
        const startTime = Date.now();
        try {
            for (let i = 0, len = this._beforeEach.length; i < len; i++) {
                runner.emit(RunnerConstants.EVENT_HOOK_BEGIN, test);
                await runFunc(runner, this, this._beforeEach[i]);
                runner.emit(RunnerConstants.EVENT_HOOK_END, test);
            }
        }
        catch (err) {
            console.error('Error beforeEach: ' + this.fullTitle(' > '));
            runner.emit(RunnerConstants.EVENT_HOOK_END, test);
            throw err;
        }
        try {
            await runFunc(runner, test, test.fn);
            test.duration = Date.now() - startTime;
        }
        catch (err) {
            test.duration = Date.now() - startTime;
            console.error('Error test: ' + test.fullTitle(' > '));
            test.err = err;
            runner.emit(RunnerConstants.EVENT_TEST_FAIL, test, err);
            runner.emit(RunnerConstants.EVENT_TEST_END, test);
            throw err;
        }
        try {
            for (let i = 0, len = this._afterEach.length; i < len; i++) {
                runner.emit(RunnerConstants.EVENT_HOOK_BEGIN, test);
                await runFunc(runner, this, this._afterEach[i]);
                runner.emit(RunnerConstants.EVENT_HOOK_END, test);
            }
        }
        catch (err) {
            console.error('Error afterEach: ' + this.fullTitle(' > '));
            runner.emit(RunnerConstants.EVENT_HOOK_END, test);
            throw err;
        }
        // console.log(`End (${((Date.now() - startTime) / 1000).toFixed(3)} sec): ${test.fullTitle(' > ')}`)
        runner.emit(RunnerConstants.EVENT_TEST_PASS, test);
        runner.emit(RunnerConstants.EVENT_TEST_END, test);
    }
    async run(runner, skip) {
        if (!skip) {
            skip = this.skip;
        }
        runner.emit(RunnerConstants.EVENT_SUITE_BEGIN, this);
        const startTime = Date.now();
        try {
            this.pending = skip;
            try {
                for (let i = 0, len = this._beforeAll.length; i < len; i++) {
                    runner.emit(RunnerConstants.EVENT_HOOK_BEGIN, this);
                    await runFunc(runner, this, this._beforeAll[i]);
                    runner.emit(RunnerConstants.EVENT_HOOK_END, this);
                }
            }
            catch (err) {
                console.error('Error beforeAll: ' + this.fullTitle(' > '));
                runner.emit(RunnerConstants.EVENT_HOOK_END, this);
                throw err;
            }
            await Promise.all([
                ...this.tests.map(async (test) => this.runTest(runner, skip, test)),
                ...this.suites.map(suite => suite.run(runner, skip)),
            ]);
            try {
                for (let i = 0, len = this._afterAll.length; i < len; i++) {
                    runner.emit(RunnerConstants.EVENT_HOOK_BEGIN, this);
                    await runFunc(runner, this, this._afterAll[i]);
                    runner.emit(RunnerConstants.EVENT_HOOK_END, this);
                }
            }
            catch (err) {
                console.error('Error afterAll: ' + this.fullTitle(' > '));
                runner.emit(RunnerConstants.EVENT_HOOK_END, this);
                throw err;
            }
        }
        finally {
            console.debug(`${this.fullTitle(' > ') || 'All Tests'}: ${((Date.now() - startTime) / 1000).toFixed(3)} sec`);
            runner.emit(RunnerConstants.EVENT_SUITE_END, this);
        }
    }
}

export { SuiteDefault };