module.exports = function(grunt) {
  var config = {
    pkg: require('./package.json'),
    env: process.env,
    files: grunt.file.readJSON('./grunt/files.json'),
    config: grunt.file.readJSON('./grunt/config.json'),
    watch: {
      js: {
        files: ["<%= files.js.public %>", "<%= files.js.server %>"],
        tasks: ['default']
      }
    }
  };
  grunt.initConfig(config);
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', function() {
    grunt.log.writeln('Grunt grunt');
    grunt.log.writeln('Grunt Author <%= pkg.engines.node %>: ' + grunt.config.get('config.author').firstName);
  });
};