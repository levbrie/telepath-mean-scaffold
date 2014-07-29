'use strict';

module.exports = function(grunt) {
  var justInTimeStaticMappings = { // for plugins that can't be resolved in auto mapping
    protractor: 'grunt-protractor-runner',
    express: 'grunt-express-server'
  };
  require('jit-grunt')(grunt, justInTimeStaticMappings);    // just-in-time plugin loader (no more loadNpmTasks)
  require('time-grunt')(grunt);
  var config = {
    pkg:      require('./package.json'),
    env:      process.env,
    files:    grunt.file.readJSON('./grunt/files.json'),
    config:   grunt.file.readJSON('./grunt/config.json'),
    express      :   require('./grunt/expressTask'),
    open         :   require('./grunt/openTask')('<%= express.options.port %>'),
    compass      :   require('./grunt/compassTask'),
    watch: {
      js         :   require('./grunt/watch/jsWatch'),
      css        :   require('./grunt/watch/cssWatch'),
      jsTest     :   require('./grunt/watch/jsTest'),
      livereload :   require('./grunt/watch/livereload'),
      express    :   require('./grunt/watch/express'),
      gruntfile  :   { files: ['Gruntfile.js'], tasks: ['default'] }
    },
    jshint       : require('./grunt/jshintTask'),
    uglify       : require('./grunt/uglifyTask')("<%= files.js.public %>"),
    karma        : require('./grunt/karmaTask'),
    protractor   : require('./grunt/protractorTask'),
  };
  grunt.initConfig(config);
  grunt.registerTask('wait', function() {
    grunt.log.ok('Waiting for server reload...');
    var done = this.async();
    setTimeout(function() {
      grunt.log.writeln('Done waiting.');
      done();
    }, 500);
  });
  grunt.registerTask('server', function (target) {
    grunt.task.run(['express:dev', 'open', 'watch']);
  });
  grunt.registerTask('test', ['karma']);
  grunt.registerTask('default', function() {
    grunt.log.writeln('Grunt grunt');
    grunt.log.writeln('Grunt Author: ' + grunt.config.get('pkg.author'));
    grunt.task.run(['jshint', 'test', 'server']);
  });
};