# emitter.js

[![Build Status](https://secure.travis-ci.org/necolas/emitter.js.png?branch=master)](http://travis-ci.org/necolas/emitter.js)

JavaScript event-emitter. Requires [ES5
Shim](https://github.com/kriskowal/es5-shim) for IE 8 support.

## Installation

Install with [Bower](http://bower.io):

```
bower install --save-dev emitter.js
```

## API

### Emitter(obj)

The `Emitter` function can be used as a Constructor or as a mixin.

As an Emitter instance:

```js
var Emitter = require('emitter');
var emitter = new Emitter;
emitter.trigger('foo');
```

As a mixin:

```js
var Emitter = require('emitter');
var foo = {};
Emitter(foo);

foo.trigger('bar');
```

As a prototype mixin:

```
var Emitter = require('emitter');
var Foo = function () {};
Emitter(Foo.prototype);
```

### Emitter#on(event, callback)

Register an `event` handler `callback`. Protects against duplicate handlers
being registered.

```js
var handler = function () {
    console.log('The function `handler` has been registered for the event `foo`.');
};

Emitter.on('foo', handler);
```

### Emitter#once(event, callback)

Register a one-off `event` handler `callback`, removed immediately after it is
invoked the first time.

```js
var handler = function () {
    console.log('The function `handler` has been registered as a one-off callback for the event `foo`.');
};

Emitter.once('foo', handler);
```

### Emitter#off([event], [callback])

Remove the event handler `callback`. If no `callback` is specified, it will
remove all callbacks for the `event`. If no `event` is specified, the entire
event registry will be deleted.

```js
var handler = function () {
    console.log('Registered for the event `foo`.');
};

Emitter.off('foo', handler);
Emitter.off('foo');
Emitter.off();
```

### Emitter#trigger(event, [...])

Trigger an `event` with optional arguments. Alias: `emit`.

```js
var data = { name: 'nicolas' };
Emitter.trigger('foo', data);
```

### Emitter#getListeners(event)

Return an array of callbacks registered for the `event`, or an empty array.
Initializes the registry if necessary.

```js
Emitter.getListeners('foo');
```

### Emitter#hasListeners(event)

Check if any callbacks are registered for the `event`.

```js
Emitter.hasListeners('foo');
```

## Browser support

* Google Chrome (latest)
* Opera (latest)
* Firefox 4+
* Safari 5+
* Internet Explorer 8+ (require ES5 Shim)
