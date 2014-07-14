# MongoInstance

[![Build Status](https://secure.travis-ci.org/lgoldstien/MongoInstance.png?branch=master)](http://travis-ci.org/lgoldstien/MongoInstance)
[![Build Status](https://secure.travis-ci.org/lgoldstien/MongoInstance.png?branch=development)](http://travis-ci.org/lgoldstien/MongoInstance)

An abstraction layer for mongodb providing events and utility methods.

## Getting Started
Install the module:
```
npm install MongoInstance
```

Require the module:
```javascript
var MongoInstance = require('MongoInstance');
```

Instantiate the module with a mongodb connection string and optionally autoSetup and autoConfigure
```javascript
var mongo = new MongoInstance({
    url: "mongodb://[user:pass@]hostname:port/db?options",
    noAutoSetup: false,
    noAutoConnect: false,
});
```

## Documentation

### Concepts

The module effectively provides a platform with events and generic methods for interacting with a mongo database.

Events are published using node's event emitter.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License
Copyright (c) 2014 Lawrence Goldstien
Licensed under the MIT license.
