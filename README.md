# emitter.js

[![Build Status](https://secure.travis-ci.org/necolas/emitter.js.png?branch=master)](http://travis-ci.org/necolas/emitter.js)

JavaScript event-emitter.

## Installation

Install with [Bower](http://bower.io):

```
bower install --save emitter.js
```

The component can be used as a Node.js module, an AMD module, or a global.

## API

### Emitter(obj)

The `Emitter` function can be used as a Constructor or as a mixin.

As an Emitter instance:

```js
var Emitter = require('emitter');
var foo = new Emitter;
foo.trigger('foo');
```

As a mixin:

```js
var Emitter = require('emitter');
var foo = {};
Emitter(foo);

foo.trigger('bar');
```

As a prototype mixin:

```js
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

foo.on('foo', handler);
```

### Emitter#once(event, callback)

Register a one-off `event` handler `callback`, removed immediately after it is
invoked the first time.

```js
var handler = function () {
    console.log('The function `handler` has been registered as a one-off callback for the event `foo`.');
};

foo.once('foo', handler);
```

### Emitter#off([event], [callback])

Remove the event handler `callback`. If no `callback` is specified, it will
remove all callbacks for the `event`. If no `event` is specified, the entire
event registry will be deleted.

```js
var handler = function () {
    console.log('Registered for the event `foo`.');
};

foo.off('foo', handler);
foo.off('foo');
foo.off();
```

### Emitter#trigger(event, [...])

Trigger an `event` with optional arguments. Alias: `emit`.

```js
var data = { name: 'nicolas' };
foo.trigger('foo', data);
```

### Emitter#getListeners(event)

Return an array of callbacks registered for the `event`, or an empty array.
Initializes the registry if necessary.

```js
foo.getListeners('foo');
```

### Emitter#hasListeners(event)

Check if any callbacks are registered for the `event`.

```js
foo.hasListeners('foo');
```

## Testing

Install and run the test suite:

```
make
```

Re-run the test suite:

```
make test
```

## Browser support

* Google Chrome (latest)
* Opera (latest)
* Firefox 4+
* Safari 5+
* Internet Explorer 8+
