// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function(grunt) {
  var justInTimeStaticMappings = { // for plugins that can't be resolved in auto mapping
    protractor    : 'grunt-protractor-runner',
    express       : 'grunt-express-server',
    useminPrepare : 'grunt-usemin',
    ngtemplates   : 'grunt-angular-templates'
  };
  require('jit-grunt')(grunt, justInTimeStaticMappings);    // just-in-time plugin loader (no more loadNpmTasks)
  require('time-grunt')(grunt);
  var config = {
    directories  : {
      client     :   'public',
      dist       :   'dist'
    },
    pkg          :   grunt.file.readJSON('package.json'),
    env          :   process.env,
    files        :   grunt.file.readJSON('./grunt/files.json'),
    config       :   grunt.file.readJSON('./grunt/config.json'),
    express      :   require('./grunt/expressTask'),
    open         :   require('./grunt/openTask')('<%%= express.options.port %>'),
    compass      :   require('./grunt/compassTask'),
    watch: {
      js         :   require('./grunt/watch/jsWatch'),
      css        :   require('./grunt/watch/cssWatch'),
      jsTest     :   require('./grunt/watch/jsTest'),
      livereload :   require('./grunt/watch/livereload'),
      express    :   require('./grunt/watch/express'),
      gruntfile  :   { files: ['Gruntfile.js'], tasks: ['reload'] }
    },
    jshint       : require('./grunt/jshintTask'),

    /* TESTING */
    karma        : require('./grunt/karmaTask'),
    protractor   : require('./grunt/protractorTask'),

    /* INJECT REFS INTO index.html */
    wiredep      : require('./grunt/wiredep'),
    injector     : require('./grunt/injector'),

    /* BUILD STEPS */
    cssmin       : require('./grunt/build/cssmin'),
    clean        : require('./grunt/build/clean'),
    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: require('./grunt/build/useminPrepare'),
    // Performs rewrites based on rev and the useminPrepare configuration
    usemin       : require('./grunt/build/usemin'),
    // Copies remaining files to places other tasks can use
    copy         : require('./grunt/build/copy'),
    ngAnnotate   : require('./grunt/build/ngAnnotate'),
    ngtemplates  : require('./grunt/build/ngtemplates')

  };
  grunt.initConfig(config);
  grunt.registerTask('wait', function() {
    grunt.log.ok('Waiting for server reload...');
    var done = this.async();
    setTimeout(function() {
      grunt.log.writeln('Done waiting.');
      done();
    }, 1500);
  });
  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });
  grunt.registerTask('serve', function (target) {
    if (target === 'prod') {
      return grunt.task.run([
        'build', 'express:prod', 'open', 'express-keepalive'
      ]);
    }
    grunt.task.run(['express:dev', 'open', 'watch']);
  });
  grunt.registerTask('inject', ['wiredep', 'injector']);
  grunt.registerTask('test', ['karma']);
  grunt.registerTask('reload', function() {
    grunt.task.run(['wiredep', 'injector', 'jshint', 'test']);
  });
  grunt.registerTask('build', [
    'clean:dist',
    'inject',
    'useminPrepare',
    'ngtemplates',
    'cssmin',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'uglify',
    'usemin'
  ]);
  grunt.registerTask('default', function() {
    grunt.log.writeln('Grunt Author: ' + grunt.config.get('pkg.author'));
    grunt.task.run(['wiredep', 'injector', 'jshint', 'test', 'serve']);
  });
};
