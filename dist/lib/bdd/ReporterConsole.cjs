'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var bdd_contracts = require('./contracts.cjs');

class ReporterConsole {
    constructor(runner) {
        this._indents = 0;
        const stats = runner.stats;
        runner
            .once(bdd_contracts.RunnerConstants.EVENT_RUN_BEGIN, () => {
            console.log('start');
        })
            .on(bdd_contracts.RunnerConstants.EVENT_SUITE_BEGIN, () => {
            this.increaseIndent();
        })
            .on(bdd_contracts.RunnerConstants.EVENT_TEST_BEGIN, test => {
            // TODO
        })
            .on(bdd_contracts.RunnerConstants.EVENT_TEST_PENDING, test => {
            // TODO
        })
            .on(bdd_contracts.RunnerConstants.EVENT_TEST_PASS, test => {
            // Test#fullTitle() returns the suite name(s)
            // prepended to the test title
            console.log(`${this.indent()}pass: ${test.fullTitle(' > ')}`);
        })
            .on(bdd_contracts.RunnerConstants.EVENT_TEST_FAIL, (test, err) => {
            console.log(`${this.indent()}fail: ${test.fullTitle(' > ')} - error: ${err.message}`);
        })
            .on(bdd_contracts.RunnerConstants.EVENT_SUITE_END, () => {
            this.decreaseIndent();
        })
            .once(bdd_contracts.RunnerConstants.EVENT_RUN_END, () => {
            console.log(`end: ${stats.passes}/${stats.passes + stats.failures} ok`);
        });
    }
    indent() {
        return Array(this._indents).join('  ');
    }
    increaseIndent() {
        this._indents++;
    }
    decreaseIndent() {
        this._indents--;
    }
}

exports.ReporterConsole = ReporterConsole;
