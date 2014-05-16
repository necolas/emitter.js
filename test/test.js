'use strict';

var expect = require('chai').expect;
var Emitter = require('../emitter.js');

describe('Emitter(obj)', function () {
  it('can work as a mixin', function () {
    var obj = {};
    var foo = function foo() {};
    Emitter(obj);
    obj.on('foo', foo);
    expect(obj._registry).to.eql({'foo': [foo]});
  });
});

describe('Emitter', function () {
  var emitter;

  beforeEach(function () {
    emitter = new Emitter();
  });

  describe('.getListeners(event)', function () {
    describe('when there is no event registry', function () {
      it('creates the event registry', function () {
        expect(emitter._registry).to.equal(undefined);
        emitter.getListeners('foo');
        expect(emitter._registry).to.eql({'foo': []});
      });
    });

    describe('when the event has callbacks', function () {
      it('returns an array of callbacks', function () {
        var foo = function foo() {};
        var bar = function bar() {};
        emitter._registry = {'foo': [foo, bar]};
        expect(emitter.getListeners('foo')).to.eql([foo, bar]);
      });
    });

    describe('when the event has no callbacks (i.e., it doesn\'t exist in the registry)', function () {
      it('returns an empty array', function () {
        expect(emitter.getListeners('foo')).to.eql([]);
      });
    });
  });

  describe('.hasListeners(event)', function () {
    describe('when the event has callbacks', function () {
      it('returns true', function () {
        var foo = function foo() {};
        emitter._registry = {'foo': [foo]};
        expect(emitter.hasListeners('foo')).to.equal(true);
      });
    });

    describe('when the event has no callbacks (i.e., it doesn\'t exist in the registry)', function () {
      it('returns false', function () {
        expect(emitter.hasListeners('foo')).to.equal(false);
      });
    });
  });

  describe('.on(event, callback)', function () {
    describe('when the callback is a function', function () {
      it('adds the callback', function () {
        var foo = function foo() {};
        emitter.on('foo', foo);
        expect(emitter._registry['foo']).to.eql([foo]);
      });

      it('does not add the callback if it\'s already registered', function () {
        var foo = function foo() {};
        emitter.on('foo', foo);
        emitter.on('foo', foo);
        expect(emitter._registry['foo']).to.eql([foo]);
      });
    });

    describe('when the callback is not a function', function () {
      var cb = 'String';
      var foo = function () {
        emitter.on('foo', cb);
      };

      it('throws a TypeError', function () {
        expect(foo).to.Throw(TypeError);
      });
    });
  });

  describe('.once(event, callback)', function () {
    it('adds a one-off callback', function () {
      var calls = [];
      var foo = function foo() { calls.push('foo'); };
      var bar = function bar() {};
      emitter.once('foo', foo);
      emitter.on('foo', bar);
      emitter.trigger('foo');

      expect(emitter._registry['foo']).to.eql([bar]);
      expect(calls).to.eql(['foo']);
    });

    it('can be removed with `off()`', function () {
      var foo = function foo() {};
      var bar = function bar() {};
      emitter.once('foo', foo);
      emitter.on('foo', bar);
      emitter.off('foo', foo);

      expect(emitter._registry['foo']).to.eql([bar]);
    });
  });

  describe('.off(event, callback)', function () {
    describe('when the callback is a function', function () {
      it('removes the callback', function () {
        var foo = function foo() {};
        var bar = function bar() {};
        emitter._registry = {'foo': [foo, bar]};
        emitter.off('foo', foo);

        expect(emitter._registry['foo']).to.eql([bar]);
      });
    });

    describe('when the callback is not a function', function () {
      var cb = 'String';
      var foo = function () {
        emitter.on('foo', cb);
      };

      it('throws a TypeError', function () {
        expect(foo).to.Throw(TypeError);
      });
    });
  });

  describe('.off(event)', function () {
    it('deletes the event (and its callbacks)', function () {
      var foo = function foo() {};
      var bar = function bar() {};
      emitter._registry = {'foo': [foo, bar]};
      emitter.off('foo');

      expect(emitter._registry['foo']).to.equal(undefined);
    });
  });

  describe('.off()', function () {
    it('deletes the registry', function () {
      var foo = function foo() {};
      var bar = function bar() {};
      emitter._registry = {'foo': [foo, bar]};
      emitter.off();

      expect(emitter._registry).to.equal(undefined);
    });
  });

  describe('.trigger(event, args)', function () {
    describe('when the event exists', function () {
      it('fires an event\'s callback', function () {
        var calls = [];
        var foo = function foo() { calls.push('foo'); };

        emitter.on('foo', foo);
        emitter.trigger('foo');

        expect(calls).to.eql(['foo']);
      });

      it('fires an event\'s callback with arguments', function () {
        var calls = [];
        var foo = function foo(arg1, arg2) { calls.push(arg1, arg2); };

        emitter.on('foo', foo);
        emitter.trigger('foo', 1, 2);
        emitter.trigger('foo', 3, 4);

        expect(calls).to.eql([
          1, 2,
          3, 4
        ]);
      });

      it('fires all callbacks for an event, in order', function () {
        var calls = [];
        var foo = function foo() { calls.push('foo'); };
        var bar = function foo() { calls.push('bar'); };

        emitter.on('foo', foo);
        emitter.on('foo', bar);
        emitter.trigger('foo');

        expect(calls).to.eql(['foo', 'bar']);
      });
    });
  });
});
