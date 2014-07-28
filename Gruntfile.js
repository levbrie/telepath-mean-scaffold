module.exports = function(grunt) {
  var config = {
    pkg: require('./package.json'),
    env: process.env,
    files: grunt.file.readJSON('./grunt/files.json'),
    config: grunt.file.readJSON('./grunt/config.json'),
    watch: {
      js: {
        files: ["<%= files.js.public %>", "<%= files.js.server %>"],
        tasks: ['default', 'uglify']
      }
    },
    uglify: {
      dist:{
        files:{
          "dist/app.min.js":["<%= files.js.public %>"]
        }
      }
    }
  };
  grunt.initConfig(config);
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', function() {
    grunt.log.writeln('Grunt grunt');
    grunt.log.writeln('Grunt Author: ' + grunt.config.get('pkg.author'));
  });
};