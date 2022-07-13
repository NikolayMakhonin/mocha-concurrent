'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var bdd_register = require('./register.cjs');
var bdd_loadFiles = require('./loadFiles.cjs');
var bdd_loadModule = require('./loadModule.cjs');
var bdd_ReporterConsole = require('./ReporterConsole.cjs');
var bdd_RunnerDefault = require('./RunnerDefault.cjs');
var bdd_contracts = require('./contracts.cjs');
require('./SuiteDefault.cjs');
require('./runFunc.cjs');
require('@flemist/async-utils');
require('./TestDefault.cjs');
require('assert');
require('globby');
require('path');
require('url');
require('kleur');
require('eventemitter3');

async function runTests({ watch, timeout, reporterPath, filesGlobs, grep, }) {
    try {
        const runner = new bdd_RunnerDefault.RunnerDefault(grep);
        if (reporterPath) {
            const ReporterModule = await bdd_loadModule.loadModule(reporterPath);
            const Reporter = ReporterModule.default || ReporterModule;
            // eslint-disable-next-line no-new
            new Reporter(runner, {
                reporter: reporterPath,
                ui: 'bdd',
            });
        }
        else {
            // eslint-disable-next-line no-new
            new bdd_ReporterConsole.ReporterConsole(runner);
        }
        if (timeout != null) {
            bdd_register.rootSuite.timeout(timeout);
        }
        await bdd_loadFiles.loadFiles(filesGlobs);
        runner.suite = bdd_register.rootSuite;
        runner.emit(bdd_contracts.RunnerConstants.EVENT_RUN_BEGIN, this);
        try {
            await bdd_register.rootSuite.run(runner, false);
        }
        finally {
            runner.emit(bdd_contracts.RunnerConstants.EVENT_RUN_END, this);
        }
        // eslint-disable-next-line node/no-process-exit
        process.exit(0);
    }
    catch (err) {
        console.error(err);
        // eslint-disable-next-line node/no-process-exit
        process.exit(1);
    }
}

exports.runTests = runTests;
