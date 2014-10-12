'use strict';

module.exports = function(grunt) {
  var justInTimeStaticMappings = { // for plugins that can't be resolved in auto mapping
    protractor: 'grunt-protractor-runner',
    express: 'grunt-express-server'
    // useminPrepare: 'grunt-usemin'
  };
  require('jit-grunt')(grunt, justInTimeStaticMappings);    // just-in-time plugin loader (no more loadNpmTasks)
  require('time-grunt')(grunt);
  var config = {
    directories  : {
      client     :   'public',
      dist       :   'dist'
    },
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
      gruntfile  :   { files: ['Gruntfile.js'], tasks: ['reload'] }
    },
    jshint       : require('./grunt/jshintTask'),
    // uglify       : require('./grunt/uglifyTask')("<%= files.js.public %>"),
    karma        : require('./grunt/karmaTask'),
    protractor   : require('./grunt/protractorTask'),
    wiredep      : require('./grunt/wiredep'),
    injector     : require('./grunt/injector'),
    cssmin: {
      combine: {
        files: {
          '<%= directories.dist %>/public/style.css': [
            '<%= directories.client %>/stylesheets/css/style.css'
          ]
        }
      }
    },
    clean        : {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= directories.dist %>/*',
            '!<%= directories.dist %>/.git*',
            '!<%= directories.dist %>/Procfile'

          ]
        }]
      },
      server: '.tmp'
    },

    // concat: {
    //   options: {
    //     separator: ';',
    //   },
    //   dist: {
    //     src: ['public/app/**/*.js'],
    //     dest: '.tmp/concat/app/app.min.js'
    //   }
    // },
    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare : {
      html: ['<%= directories.client %>/index.html'],
      options : {
        dest: '<%= directories.dist %>/public'
      }
    },
    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= directories.dist %>/public/{,*/}*.html'],
      css: ['<%= directories.dist %>/public/{,*/}*.css'],
      // js: ['<%= directories.dist %>/public/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= directories.dist %>/public',
          '<%= directories.dist %>/public/assets/images'
        ]
        // This is so we update image references in our ng-templates
        // (see angular-fullstack to do this)
      }
    },
    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= directories.client %>',
          dest: '<%= directories.dist %>/public',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'assets/images/{,*/}*.{webp}',
            'assets/fonts/**/*',
            'index.html'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= directories.dist %>/public/assets/images',
          src: ['generated/*']
        }, {
          expand: true,
          dest: '<%= directories.dist %>',
          src: [
            'package.json',
            'server/**/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= directories.client %>',
        dest: '.tmp/',
        src: ['{app,components}/**/*.css']
      }
    }
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
  // grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
  //   this.async();
  // });
  grunt.registerTask('serve', function (target) {
    grunt.task.run(['express:dev', 'open', 'watch']);
  });
  grunt.registerTask('inject', ['wiredep', 'injector']);
  grunt.registerTask('test', ['karma']);
  grunt.registerTask('reload', function() {
    grunt.task.run(['wiredep', 'injector', 'jshint', 'test']);
  });
  grunt.registerTask('build', [
    'clean:dist', 'inject', 'useminPrepare',
    'cssmin', 'concat', 'copy:dist', 'uglify', 'usemin'
  ]);
  grunt.registerTask('default', function() {
    grunt.log.writeln('Grunt Author: ' + grunt.config.get('pkg.author'));
    grunt.task.run(['wiredep', 'injector', 'jshint', 'test', 'serve']);
  });
};
