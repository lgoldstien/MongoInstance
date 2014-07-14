/**
 * MongoInstance
 * https://github.com/lgoldstien/MongoInstance
 *
 * Copyright (c) 2014 Lawrence Goldstien
 * Licensed under the MIT license.
 */

'use strict';

var STRINGS = require('./strings');

/**
 * MongoConnectionString
 * A Constructor for mongodb connection strings
 *
 * @param {string} - The mongodb connection string
 */
var MongoConnectionString = function(url) {
    this.set(url);
};

/**
 * get
 * Returns the connection string
 *
 * @return {string}
 */
MongoConnectionString.prototype.get = function() {
    return this.url;
};

/**
 * set
 * Sets a new connection string after running validation
 *
 * @param {string} - The connection string to set
 * @return {this}
 */
MongoConnectionString.prototype.set = function(url) {
    if (!this.isValid(url)) {
        throw new Error(STRINGS.ERROR_URL_INVALID);
    }

    this.url = url;

    return this;
};

/**
 * isValid
 * Returns true if the connection string is valid
 *
 * @return {boolean}
 */
MongoConnectionString.prototype.isValid = function(url) {
    var regex = /^(mongodb:\/\/)([a-z0-9]+:[a-z0-9]+@)?([a-z0-9-_]+)(:[0-9]+)?(\/[a-z_-]+)?$/g;
    var match = regex.exec(url || this.url);

    return (match) ? true : false;
};


module.exports = MongoConnectionString;
