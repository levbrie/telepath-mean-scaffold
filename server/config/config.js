// create config setup for development and production

(function() {
  'use strict';
  var path     = require('path'),
      rootPath = path.normalize(__dirname + '/../../');

  module.exports = {
    development: {
      rootPath: rootPath,
      db: 'mongodb://localhost/mean-scaffold',
      port: process.env.PORT || 3000
    },
    production: {
      rootPath: rootPath,
      db: process.env.MONGOLAB_URI,
      port: process.env.PORT || 80
    }
  };
}());
