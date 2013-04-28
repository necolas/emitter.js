var expect = require('chai').expect;
var Emitter = require('../emitter.js');

describe('Emitter(obj)', function () {
    it('should mixin')
});

describe('Emitter', function () {
    var emitter;

    beforeEach(function () {
        emitter = new Emitter();
    });

    describe('.hasListeners(event)', function () {
        describe('when the event has callbacks', function(){
            it('returns true');
        });

        describe('when the event has no callbacks (i.e., it doesn\'t exist in the registry)', function () {
            it('returns false');
        });
    });

    describe('.getListeners(event)', function () {
        describe('when there is no event registry', function () {
            it('creates the event registry', function () {
                expect(emitter._registry).to.equal(undefined);
                emitter.getListeners('foo');
                expect(emitter._registry).to.eql({'foo':[]});
            });
        });

        describe('when the event has callbacks', function () {
            it('returns an array of callbacks', function () {
                var foo = function foo() {};
                var bar = function bar() {};
                emitter._registry = {'foo':[foo, bar]};
                expect(emitter.getListeners('foo')).to.eql([foo, bar]);
            });
        });

        describe('when the event has no callbacks (i.e., it doesn\'t exist in the registry)', function () {
            it('returns an empty array', function () {
                expect(emitter.getListeners('foo')).to.eql([]);
            });
        });
    });

    describe('.on(event, callback)', function () {
        describe('when the callback is a function', function () {
            it('adds the callback');
            it('does not add the callback if it\'s already registered');
        });

        describe('when the callback is not a function', function () {
            it('throws a TypeError');
        });
    });

    describe('.once(event, callback)', function () {
        it('adds a one-off callback');
        it('can be removed with `off()`');
    });

    describe('.off(event, callback)', function () {
        describe('when the callback is a function', function () {
            it('removes the callback');
        });

        describe('when the callback is not a function', function () {
            it('throws a TypeError');
        });
    });

    describe('.off(event)', function () {
        it('deletes the event (and its callbacks)');
    });

    describe('.off()', function () {
        it('deletes the registry');
    });

    describe('.trigger(event, args)', function () {
        it('fires an event\'s callback');
        it('fires an event\'s callback with arguments');
        it('fires all callbacks for an event, in order');
        it('fires all callbacks for an event, after one has been removed');
    });
});
