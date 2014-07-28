module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: grunt.file.readJSON('./grunt/config.json'),
    watch: {
      js: {
        files: [
          'public/app/{,*//}*.js',
          'public/app/*/*/*.js',
          'server.js'
        ],
        tasks: ['default']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', function() {
    grunt.log.writeln('Grunt grunt');
    grunt.log.writeln('Grunt Author: ' + grunt.config.get('config.author').firstName);
  });
};