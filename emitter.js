'use strict';

/**
 * Expose `Emitter`
 */

module.exports = Emitter;

/**
 * Emitter manages event registration and triggering
 *
 * @param {Object} [obj]
 * @api public
 */

function Emitter(obj) {
  if (obj) {
    return mixin(obj);
  }
}

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  var key;
  var proto = Emitter.prototype;

  for (key in proto) {
    if (Object.prototype.hasOwnProperty.call(proto, key)) {
      obj[key] = proto[key];
    }
  }

  return obj;
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
    throw new TypeError('Emitter.on(): the 2nd argument must be a function.');
  }

  // avoid pushing callbacks onto the array if they're already registered
  if (indexOf(callbacks, callback) === -1) {
    callbacks.push(callback);
  }

  return this;
};

/**
 * Registers a one-off callback for an `event`.
 * The callback is invoked just once, and then removed from the `event`.
 *
 * @param {String} event
 * @param {Function} callback
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function (event, callback) {
  var self = this;

  // create a callback that will remove itself when run,
  // and pass its arguments on to the original callback
  function wrapper() {
    self.off(event, wrapper);
    callback.apply(this, arguments);
  }

  // store the wrapper function on the original callback
  callback._wrapper = wrapper;
  // register our wrapped callback
  this.on(event, wrapper);

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
    throw new TypeError('Emitter.off(): the 2nd argument must be a function.');
  }
  else {
    callbacks = this.getListeners(event);
    index = indexOf(callbacks, callback);
    // if the callback is not found,
    // check if it's registered as a one-off callback
    if (index === -1) {
      index = indexOf(callbacks, callback._wrapper);
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
 * Trigger a given `event`
 *
 * When an event is triggered, every callback registered for the event will be
 * called. Arguments will be passed on to the callback.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.trigger = function (event) {
  // create an array of the additional arguments
  var args = Array.prototype.slice.call(arguments, 1);
  var callbacks = this.getListeners(event);
  var len = callbacks.length;

  if (len) {
    // copy the array of callbacks
    callbacks = callbacks.slice(0);
    // call the appropriate handler function,
    // passing it event information as an argument
    for (var i = 0; i < len; i += 1) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Alias for `trigger`
 */

Emitter.prototype.emit = Emitter.prototype.trigger;

/**
 * Basic Array.indexOf utility
 *
 * No `fromIndex` support. Just enough for what this component needs.
 *
 * @param {Array} arr Array to search
 * @param {Object} item Item to search for
 * @api Private
 */

function indexOf(arr, item) {
  var i;

  // use native `indexOf` if available
  if (Array.prototype.indexOf) {
    return arr.indexOf(item);
  }

  // IE 8 doesn't support `indexOf`, so...
  if (arr == null) {
    throw new TypeError();
  }

  i = arr.length;
  while (i--) {
    if (arr[i] === item) {
      return i;
    }
  }

  return -1;
}
