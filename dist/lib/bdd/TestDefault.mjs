import { TestConstants } from './contracts.mjs';

class TestDefault {
    constructor(file, parent, title, fn, skip) {
        this.type = 'test';
        this._timeout = 2000;
        this.parent = void 0;
        this.file = void 0;
        this.err = void 0; // added by reporters
        this.duration = void 0;
        this.pending = false;
        this.state = void 0;
        this.timedOut = false;
        this.title = title;
        this.fn = fn;
        this.body = (fn || '').toString();
        this.async = !!(fn && fn.length);
        this.sync = !this.async;
        this.skip = skip;
        this.parent = parent;
        this.file = file;
    }
    timeout(ms) {
        if (!arguments.length) {
            return this._timeout;
        }
        this._timeout = ms;
        return this;
    }
    isPending() {
        return this.pending || (this.parent && this.parent.isPending());
    }
    isFailed() {
        return !this.isPending() && this.state === TestConstants.STATE_FAILED;
    }
    isPassed() {
        return !this.isPending() && this.state === TestConstants.STATE_PASSED;
    }
    fullTitle(separator) {
        return this.titlePath().join(separator || ' ');
    }
    titlePath() {
        return this.parent.titlePath().concat([this.title]);
    }
    slow() {
        return 75;
    }
    reset() {
        this.timedOut = false;
        this.pending = false;
        this.state = void 0;
        this.err = void 0;
        this._timeout = 2000;
    }
}

export { TestDefault };
