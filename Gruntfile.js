/*!
 * Project Name
 * http://projecturl.com
 * @author OwlDesign
 */

'use strict';

module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

      appDir: './app',
      srcDir: './dev',
      sassDir: '<%= srcDir %>/scss',
      cssDir: '<%= appDir %>/css',
      coffeeDir: '<%= srcDir %>/coffee',
      jsLibsDir: '<%= appDir %>/libs',
      jsDir: '<%= appDir %>/js',

      pkg: grunt.file.readJSON("package.json"),

      // watch for changes and trigger compass, jshint, uglify and livereload
      watch: {
          js: {
              files: '<%= jshint.all %>',
              tasks: ['uglify']
          },
          coffee: {
              files: ['<%= coffeeDir %>/*'],
              tasks: ['coffee']
          },
          scss: {
              files: ['<%= sassDir %>/**/*'],
              tasks: ['sass'],
              // options: {
              //     livereload: true
              // }
          }
      },

      sass: {
          dist: {
              options: {
                  // nested, compact, compressed, expanded
                  style: 'compact'
              },
              files: {
                  '<%= cssDir %>/application.css': '<%= sassDir %>/application.scss'
              }
          }
      },

      // javascript linting with jshint
      jshint: {
          all: [
              'Gruntfile.js'
          ]
      },

      // uglify to concat, minify, and make source maps
      uglify: {
          dist: {
              files: {
                  '<%= jsDir %>/plugins.js': [
                      '<%= jsLibsDir %>/*.js'
                  ],
                  '<%= jsDir %>/application.js': [
                      '<%= jsDir %>/application.js'
                  ]
              }
          }
      },

      // uglify to concat, minify, and make source maps
      coffee: {
          compile: {
              files: {
                  '<%= jsDir %>/application.js': [
                      '<%= coffeeDir %>/*',
                  ]
              }
          }
      },

      // image optimization
      imagemin: {
          dist: {
              options: {
                  optimizationLevel: 7,
                  progressive: true
              },
              files: [{
                  expand: true,
                  cwd: '<%= appDir %>/images/',
                  src: '**/*',
                  dest: '<%= appDir %>/images/'
              }]
          }
      },

      // deploy via rsync
      deploy: {
          options: {
              args: ["--verbose"],
              exclude: ['.git*', '.sass-cache*', "*.scss", 'node_modules', 'Gruntfile.js', 'package.json', '.DS_Store', 'README.md'],
              recursive: true
          },
          production: {
              options: {
                  src: "./",
                  dest: "~/public_html/",
                  host: "figursky@somehost.com",
                  syncDestIgnoreExcl: true
              }
          }
      },
  });

  // register task
  grunt.registerTask('default', ['coffee', 'sass', 'watch']);
};