import './register.mjs';
import globby from 'globby';
import path from 'path';
import { loadModule } from './loadModule.mjs';
import './SuiteDefault.mjs';
import './contracts.mjs';
import './runFunc.mjs';
import '@flemist/async-utils';
import './TestDefault.mjs';
import 'assert';
import 'url';

async function loadFiles(testFilesPatterns) {
    const files = await globby(testFilesPatterns.map(o => o.replace(/\\/g, '/')));
    return Promise.all(files.map(filePath => loadModule(path.resolve(filePath))));
}

export { loadFiles };
