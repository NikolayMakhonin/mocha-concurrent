'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var url = require('url');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var url__default = /*#__PURE__*/_interopDefaultLegacy(url);

function loadModule(_path) {
    if (typeof require === 'function') {
        return require(_path);
    }
    return (function (t) { return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(t)); }); })(url__default["default"].pathToFileURL(_path).toString());
}

exports.loadModule = loadModule;
