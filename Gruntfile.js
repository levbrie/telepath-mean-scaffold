module.exports = function(grunt) {
  grunt.initConfig(grunt.file.readJSON('./grunt/config.json'));
  grunt.registerTask('default', function() {
    grunt.log.writeln('Grunt grunt');
    grunt.log.writeln('Grunt Author: ' + grunt.config.get('author').firstName);
  });
};