module.exports = function(grunt) {
  var justInTimeStaticMappings = { // for plugins that can't be resolved in auto mapping
    // protractor: 'grunt-protractor-runner'
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
      gruntfile  :   { files: ['Gruntfile.js'] }
    },
    uglify       : require('./grunt/uglifyTask')("<%= files.js.public %>")
  };
  grunt.initConfig(config);
  grunt.registerTask('serve', function (target) {
    grunt.task.run(['express:dev', 'open', 'watch']);
  });
  grunt.registerTask('default', function() {
    grunt.log.writeln('Grunt grunt');
    grunt.log.writeln('Grunt Author: ' + grunt.config.get('pkg.author'));
  });
};