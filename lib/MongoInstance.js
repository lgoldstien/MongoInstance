/*
 * MongoInstance
 * https://github.com/lgoldstien/MongoInstance
 *
 * Copyright (c) 2014 Lawrence Goldstien
 * Licensed under the MIT license.
 */

'use strict';

// The strings and events used throughout MongoInstance
var STRINGS = require('./strings');
var EVENTS = require('./events');

// Grab the connection string library
var MongoConnectionString = require('./MongoConnectionString');

// Get mongodb and events
var mongodb = require('mongodb');
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
    this.autoSetup = (options.autoSetup) ? true : false;
    this.autoConnect = (options.autoConnect) ? true : false;
    this.debug = (options.debug) ? true : false;

    // Set up events
    this.events = new events.EventEmitter();

    // Set the default internal variables
    this.db = false;

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
    // Get the mongodb client
    this.client = mongodb.MongoClient;

    // Get the mongodb types set up
    this.types = {
        ObjectID: mongodb.ObjectID,
        Long: mongodb.Long,
        Timestamp: mongodb.Timestamp,
        DBRef: mongodb.DBRef,
        Binary: mongodb.Binary,
        Code: mongodb.Code,
        Symbol: mongodb.Symbol,
        MinKey: mongodb.MinKey,
        MaxKey: mongodb.MaxKey,
        Double: mongodb.Double,
    };

    return this;
};

/**
 * connect
 * Connect to the mongodb connection
 *
 * @return {MongoInstance}
 */
MongoInstance.prototype.connect = function() {
    var scope = this;
    this.client.connect(this.url.get(), function(err, db) {
        if (err) {
            scope.events.emit(EVENTS.ERROR_DB, db);
            throw new Error(err);
        }
        scope.db = db;
        scope.events.emit(EVENTS.CONNECTED, db);
    });

    return this;
};

/**
 * collection
 * Wrapper for the collection method
 */
MongoInstance.prototype.setCollection = function(collection) {
    if (!this.db) {
        throw new Error(STRINGS.ERROR_DB_NO_CONNECTION);
    }

    this.collection = this.db.collection(collection);

    this.events.emit(EVENTS.COLLECTION_SELECTED, this.collection);

    return this.collection;
};

MongoInstance.prototype.cleanup = function () {
    this.db.close();

    this.events.emit(EVENTS.CLOSED);
    return this;
};

module.exports = MongoInstance;
