'use strict';

var MongoInstance = require('../lib/MongoInstance.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.nodeunit = {
    setUp: function(done) {
        done();
    },
    'Connection Strings - Valid Strings': function(test) {
        test.expect(3);
        test.doesNotThrow(function() {
            new MongoInstance("mongodb://localhost", true);
        });
        test.doesNotThrow(function() {
            new MongoInstance("mongodb://localhost:3092/db", true);
        });
        test.doesNotThrow(function() {
            new MongoInstance("mongodb://admin:pass@localhost:3092/db", true);
        });
        test.done();
    },
    'Connection Strings - Invalid Strings': function(test) {
        test.expect(5);
        test.throws(function() {
            new MongoInstance("mongodb://", true);
        }, Error);
        test.throws(function() {
            new MongoInstance("mongdb://localhost/db", true);
        }, Error);
        test.throws(function() {
            new MongoInstance("mongodb://b@d:auth@localhost/db", true);
        }, Error);
        test.throws(function() {
            new MongoInstance("mongodb://loca£*$ost/db", true);
        }, Error);
        test.throws(function() {
            new MongoInstance("mongodb://localhost/da7a$b$5%1'", true);
        }, Error);
        test.done();
    },
};
