module.exports = function(grunt) {
  var config = {
    pkg: require('./package.json'),
    env: process.env,
    files: grunt.file.readJSON('./grunt/files.json'),
    config: grunt.file.readJSON('./grunt/config.json'),
    watch: {
      js: require('./grunt/watch/jsWatch')()
    },
    uglify: require('./grunt/uglifyTask')("<%= files.js.public %>")
  };
  grunt.initConfig(config);
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', function() {
    grunt.log.writeln('Grunt grunt');
    grunt.log.writeln('Grunt Author: ' + grunt.config.get('pkg.author'));
  });
};