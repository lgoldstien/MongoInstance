/*
 * MongoInstance
 * https://github.com/lgoldstien/MongoInstance
 *
 * Copyright (c) 2014 Lawrence Goldstien
 * Licensed under the MIT license.
 */

'use strict';

// var STRINGS = require('./strings');
// var EVENTS = require('./events');

var MongoConnectionString = require('./MongoConnectionString');

/**
 * MongoInstance
 *
 * Validates and gets a mongodb connection set up, supplying an event driven
 * interface for interacting with a mongo database
 *
 * @param {string} - The mongodb connection string
 * @param {boolean} -
 */
var MongoInstance = function(options) {
    if (typeof options === "string") {
        options = { url: options };
    }

    // Set the options
    this.url = new MongoConnectionString(options.url || options || "");
    this.autoSetup = options.autoSetup || true;
    this.autoConnect = options.autoSetup || true;

    // If autoSetup is set then we set up the events and other options
    if (this.autoSetup) {
        this.setup();
    }

    // If autoConnect is set then we make a connection to the database
    if (this.autoConnect) {
        this.connect();
    }
};

MongoInstance.prototype.setup = function() {
    this.client = require('mongodb').MongoClient;
};

MongoInstance.prototype.connect = function() {
    this.client.connect(this.url.get(), function(err, db) {
        if (err) {
            throw new Error(err);
        }
        console.log("connected", db);
    });
};

module.exports = MongoInstance;
