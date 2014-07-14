'use strict';

var MongoInstance = require('../lib/MongoInstance.js');
// var EVENTS = require('../lib/Events.js');

var mongodb, connection = { url: "mongodb://localhost", collection: "NODEUNIT_test_collection" };

exports.nodeunit = {
    setUp: function(done) {
        mongodb = new MongoInstance({
            url: connection.url,
            autoConnect: false,
            autoSetup: false,
        });
        done();
    },
    "Setup the Database": function(test) {
        test.expect(1);
        test.doesNotThrow( function () {
            mongodb.setup();
        }, Error, "Could not set up the Database" );
        test.done();
    },
    // "Connect to the Database": function(test) {
    //     test.expect(2);
    //
    //     test.doesNotThrow( function () {
    //         mongodb.setup().connect();
    //     }, Error, "Could not connect to the Database" );
    //
    //     test.doesNotThrow( function () {
    //         mongodb.events.on(EVENTS.CONNECTED, function () {
    //             mongodb.setCollection(connection.collection);
    //             test.done();
    //         });
    //
    //         mongodb.setup().connect();
    //     }, Error, "Could not select the collection: " + connection.collection );
    // },
    // "Write to the Database": function(test) {
    //     test.expect(2);
    //
    //     mongodb.events.on(EVENTS.CLOSED, test.done.bind(this));
    //
    //     test.doesNotThrow( function () {
    //         mongodb.setup().connect();
    //     }, Error, "Could not connect to the Database" );
    //
    //     test.doesNotThrow( function () {
    //         mongodb.events.on(EVENTS.CONNECTED, function () {
    //             mongodb.setCollection(connection.collection);
    //             mongodb.cleanup();
    //         });
    //
    //         mongodb.setup().connect();
    //     }, Error, "Could not select the collection: " + connection.collection );
    // }
};
