'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var bdd_contracts = require('./contracts.cjs');
var kleur = require('kleur');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var kleur__default = /*#__PURE__*/_interopDefaultLegacy(kleur);

class ReporterConsole {
    constructor(runner) {
        this._indents = 0;
        const stats = runner.stats;
        runner
            .once(bdd_contracts.RunnerConstants.EVENT_RUN_BEGIN, () => {
            // console.log(kleur.cyan('Started: All Tests'))
        })
            .on(bdd_contracts.RunnerConstants.EVENT_SUITE_BEGIN, (suite) => {
            this.increaseIndent();
            // console.log(kleur.cyan(`Started: ${suite.fullTitle(' > ') || 'All Tests'}`))
        })
            .on(bdd_contracts.RunnerConstants.EVENT_TEST_PENDING, test => {
            console.log(kleur__default["default"].gray(`Skipped: ${test.fullTitle(' > ')}`));
        })
            .on(bdd_contracts.RunnerConstants.EVENT_TEST_BEGIN, test => {
            console.log(kleur__default["default"].blue(`Started: ${test.fullTitle(' > ')}`));
        })
            .on(bdd_contracts.RunnerConstants.EVENT_TEST_PASS, test => {
            console.log(kleur__default["default"].green(`Passed: ${test.fullTitle(' > ')}`));
        })
            .on(bdd_contracts.RunnerConstants.EVENT_TEST_FAIL, (test, err) => {
            console.log(kleur__default["default"].red(`Failed: ${test.fullTitle(' > ')}: ${err.message}`));
        })
            .on(bdd_contracts.RunnerConstants.EVENT_SUITE_END, () => {
            this.decreaseIndent();
        })
            .once(bdd_contracts.RunnerConstants.EVENT_RUN_END, () => {
            let message = `End: All Tests (${stats.duration} sec) ${stats.passes}/${stats.passes + stats.failures} ok`;
            if (stats.failures) {
                message = kleur__default["default"].red(message);
            }
            else {
                message = kleur__default["default"].green(message);
            }
            console.log(kleur__default["default"].bold(message));
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
