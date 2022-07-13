import url from 'url';

function loadModule(_path) {
    if (typeof require === 'function') {
        return require(_path);
    }
    return import(url.pathToFileURL(_path).toString());
}

export { loadModule };
