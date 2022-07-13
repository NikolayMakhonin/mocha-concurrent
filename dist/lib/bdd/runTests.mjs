import { rootSuite } from './register.mjs';
import { loadFiles } from './loadFiles.mjs';
import { loadModule } from './loadModule.mjs';
import { ReporterConsole } from './ReporterConsole.mjs';
import { RunnerDefault } from './RunnerDefault.mjs';
import { RunnerConstants } from './contracts.mjs';
import './SuiteDefault.mjs';
import './runFunc.mjs';
import '@flemist/async-utils';
import './TestDefault.mjs';
import 'assert';
import 'globby';
import 'path';
import 'url';
import 'kleur';
import 'eventemitter3';

async function runTests({ watch, timeout, reporterPath, filesGlobs, grep, }) {
    try {
        const runner = new RunnerDefault(grep);
        if (reporterPath) {
            const ReporterModule = await loadModule(reporterPath);
            const Reporter = ReporterModule.default || ReporterModule;
            // eslint-disable-next-line no-new
            new Reporter(runner, {
                reporter: reporterPath,
                ui: 'bdd',
            });
        }
        else {
            // eslint-disable-next-line no-new
            new ReporterConsole(runner);
        }
        if (timeout != null) {
            rootSuite.timeout(timeout);
        }
        await loadFiles(filesGlobs);
        runner.suite = rootSuite;
        runner.emit(RunnerConstants.EVENT_RUN_BEGIN, this);
        try {
            await rootSuite.run(runner, false);
        }
        finally {
            runner.emit(RunnerConstants.EVENT_RUN_END, this);
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

export { runTests };
