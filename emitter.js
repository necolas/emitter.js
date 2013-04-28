/*! emitter.js v0.0.0 - Nicolas Gallagher - MIT license */

;(function (global) {

'use strict';

function Emitter() {
}

/**
 * Returns an array of callbacks for the specified event.
 * The event registry will be initialized if required.
 *
 * @param {String} event
 * @return {Function[]} callbacks
 * @api public
 */

Emitter.prototype.getListeners = function (event) {
    // get the registry; create it if missing
    var registry = this._registry || (this._registry = {});
    // get the array of callbacks for an event; create it if missing
    var callbacks = registry[event] || (registry[event] = []);

    return callbacks;
};

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
