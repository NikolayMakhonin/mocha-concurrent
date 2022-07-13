import yargs from './yargs.cjs';
import { runTests } from './runTests.mjs';
import dotenv from 'dotenv';
import './register.mjs';
import './SuiteDefault.mjs';
import './contracts.mjs';
import './runFunc.mjs';
import '@flemist/async-utils';
import './TestDefault.mjs';
import 'assert';
import './loadFiles.mjs';
import 'globby';
import 'path';
import './loadModule.mjs';
import 'url';
import './ReporterConsole.mjs';
import 'kleur';
import './RunnerDefault.mjs';
import 'eventemitter3';

dotenv.config();
async function run() {
    const argv = await yargs(process.argv)
        .option('watch', {
        alias: 'w',
        type: 'boolean',
        description: 'Watch files in the current working directory for changes',
        'default': false,
    })
        .option('timeout', {
        alias: 't',
        type: 'number',
        description: 'Specify test timeout threshold (in milliseconds)',
        'default': 2000,
    })
        .option('reporter', {
        alias: 'R',
        type: 'string',
        description: 'Specify reporter to use',
    })
        .option('grep', {
        alias: 'g',
        type: 'string',
        description: 'Only run tests matching this string or regexp',
        'default': null,
    })
        .argv;
    const { watch, timeout, reporter: reporterPath, grep, _: [, , ...filesGlobs], } = argv;
    runTests({
        watch,
        timeout,
        reporterPath,
        filesGlobs: filesGlobs,
        grep: grep && new RegExp(grep),
    });
}
void run();

export { run };
