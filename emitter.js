/*! emitter.js v0.0.0 - Nicolas Gallagher - MIT license */

;(function (global) {

'use strict';

function Emitter() {
}

/**
 * Expose `Emitter`
 */

// node export
if (typeof exports === 'object') {
    module.exports = Emitter;
}
// amd export
else if (typeof define === 'function' && define.amd) {
    define(function () {
        return Emitter;
    });
}
// browser global
else {
    global.Emitter = Emitter;
}

}(this));
