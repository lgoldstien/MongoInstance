/**
 * MongoConnectionString_test
 *
 * Tests for the mongodb connection string validator
 */

'use strict';

var MongoConnectionString = require('../lib/MongoConnectionString.js');

var ValidConnectionString = "mongodb://localhost";

exports.nodeunit = {
    setUp: function(done) {
        done();
    },
    'Connection Strings - Valid Strings': function(test) {
        test.expect(3);
        test.doesNotThrow(function() {
            new MongoConnectionString("mongodb://localhost");
        });
        test.doesNotThrow(function() {
            new MongoConnectionString("mongodb://localhost:3092/db");
        });
        test.doesNotThrow(function() {
            new MongoConnectionString("mongodb://admin:pass@localhost:3092/db");
        });
        test.done();
    },
    'Connection Strings - Invalid Strings': function(test) {
        test.expect(5);
        test.throws(function() {
            new MongoConnectionString("mongodb://");
        }, Error);
        test.throws(function() {
            new MongoConnectionString("mongdb://localhost/db");
        }, Error);
        test.throws(function() {
            new MongoConnectionString("mongodb://b@d:auth@localhost/db");
        }, Error);
        test.throws(function() {
            new MongoConnectionString("mongodb://loca£*$ost/db");
        }, Error);
        test.throws(function() {
            new MongoConnectionString("mongodb://localhost/da7a$b$5%1'");
        }, Error);
        test.done();
    },
    'Get out what you put in': function(test) {
        test.expect(1);
        var ValidInstance = new MongoConnectionString(ValidConnectionString);
        test.equal(
            ValidInstance.get(),
            ValidConnectionString,
            "The connection string given is not the same as the one returned."
        );
        test.done();
    },
};
