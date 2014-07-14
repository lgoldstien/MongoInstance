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
var events = require('events');

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
    // Set the options
    this.url = new MongoConnectionString((options.url) ? options.url : options);
    this.autoSetup = options.autoSetup;
    this.autoConnect = options.autoSetup;

    // If autoSetup is set then we set up the events and other options
    if (this.autoSetup) {
        this.setup();
    }

    // If autoConnect is set then we make a connection to the database
    if (this.autoConnect) {
        this.connect();
    }
};

/**
 * setup
 * Setup the mongodb instance and bind events
 *
 * @return {MongoInstance}
 */
MongoInstance.prototype.setup = function() {
    this.client = require('mongodb').MongoClient;
    this.events = new events.EventEmitter();

    

    return this;
};

/**
 * connect
 * Connect to the mongodb connection
 *
 * @return {MongoInstance}
 */
MongoInstance.prototype.connect = function() {
    this.client.connect(this.url.get(), function(err, db) {
        if (err) {
            throw new Error(err);
        }
        console.log("connected", db);
    });

    return this;
};

module.exports = MongoInstance;
