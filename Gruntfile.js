module.exports = function(grunt) {
  var config = {
    pkg: require('./package.json'),
    env: process.env,
    files: grunt.file.readJSON('./grunt/files.json'),
    config: grunt.file.readJSON('./grunt/config.json'),
    compass   :   require('./grunt/compassTask'),
    watch: {
      js      :   require('./grunt/watch/jsWatch'),
      css     :   require('./grunt/watch/cssWatch'),
      gruntfile: { files: ['Gruntfile.js'] }
    },
    uglify: require('./grunt/uglifyTask')("<%= files.js.public %>")
  };
  grunt.initConfig(config);
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.registerTask('default', function() {
    grunt.log.writeln('Grunt grunt');
    grunt.log.writeln('Grunt Author: ' + grunt.config.get('pkg.author'));
  });
};