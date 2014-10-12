(function() {
  'use strict';

  module.exports = {
    // one subtask for each module ?
    app: {
      options: {
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        usemin: 'app/app.min.js'
      },
      cwd: '<%= directories.client %>',
      src: ['{app,components}/**/*.html'],
      dest: '.tmp/templates.js'
    }
  };
})();
