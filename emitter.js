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
 * Remove a specific `callback`, or `event`, or the entire registry
 *
 * If no arguments are supplied, then the entire registry is deleted. If just
 * an event is supplied, then the event is deleted. If an event and callback
 * are supplied, then the callback is unregistered from the event.
 *
 * @param {String} [event]
 * @param {Function} [callback]
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off = function (event, callback) {
    var argsLen = arguments.length;
    var callbacks;
    var index;

    // if there are no arguments, delete the registry
    if (argsLen === 0) {
        removeEvent.call(this);
        return this;
    }

    // if there is one argument, delete the event
    if (argsLen === 1) {
        removeEvent.call(this, event);
        return this;
    }

    if (typeof callback !== 'function') {
        throw new TypeError('Emitter.off(): the callback must be a function.')
    }
    else {
        callbacks = this.getListeners(event);
        index = callbacks.indexOf(callback);
        if (index === -1) {
           index = callbacks.indexOf(callback._wrapper);
        }
        // if the callback is registered or wrapped, remove it
        if (index !== -1) {
            callbacks.splice(index, 1);
            // if there are no callbacks left, delete the event
            if (callbacks.length === 0) {
                removeEvent.call(this, event);
            }
        }
    }

    return this;

    // remove an event
    // if an event is not specified, delete the entire registry
    function removeEvent(event) {
        // don't bother if there's no registry yet
        if (this._registry) {
            if (event) {
                // delete the event from the registry
                delete this._registry[event];
            }
            else {
                // delete the registry
                delete this._registry;
            }
        }
    }
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
