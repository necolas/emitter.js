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
 * Check if this emitter has callbacks for a given `event`
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function (event) {
    if (this.getListeners(event).length) {
        return true;
    }
    return false;
};

/**
 * Register a `callback` for a given `event`.
 *
 * @param {String} event
 * @param {Function} callback
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on = function (event, callback) {
    var callbacks = this.getListeners(event);

    if (typeof callback !== 'function') {
      throw new TypeError ('Emitter.on(): the 2nd argument must be a function.');
    }

    // avoid pushing callbacks onto the array if they're already registered
    if (callbacks.indexOf(callback) === -1) {
        callbacks.push(callback);
    }

    return this;
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
