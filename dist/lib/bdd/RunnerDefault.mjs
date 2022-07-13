import EventEmitter from 'eventemitter3';

class RunnerDefault {
    constructor(grep) {
        this._eventEmitter = new EventEmitter();
        this.stats = {
            suites: 0,
            tests: 0,
            passes: 0,
            pending: 0,
            failures: 0,
            start: void 0,
            end: void 0,
            duration: void 0,
        };
        this.failures = 0;
        this.started = false;
        this.suite = null;
        this.test = null;
        this.total = 0;
        this._grep = grep;
    }
    on(event, listener) {
        this._eventEmitter.on(event, listener);
        return this;
    }
    once(event, listener) {
        this._eventEmitter.once(event, listener);
        return this;
    }
    off(event, listener) {
        this._eventEmitter.off(event, listener);
        return this;
    }
    addListener(event, listener) {
        return this.on(event, listener);
    }
    removeListener(event, listener) {
        return this.off(event, listener);
    }
    emit(name, ...rootSuite) {
        return this._eventEmitter.emit(name, ...rootSuite);
    }
}

export { RunnerDefault };
