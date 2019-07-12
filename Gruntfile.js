module.exports = function(grunt) {

  const sass = require('node-sass');

  grunt.initConfig({

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        esversion: 6,
        globals: {
          jQuery: true
        }
      }
    },

    copy: {
      pages: {
        expand: true,
        cwd: 'src/pages',
        src: '**/*.html',
        dest: 'public/'
      },
      mockApi: {
        expand: true,
        cwd: 'src/api',
        src: '**/*.json',
        dest: 'public/'
      }
    },

    sass: {
        options: {
          implementation: sass,
          sourceMap: true
        },
        dist: {
          files: {
              'public/styles/app.css': 'src/styles/app.scss'
          }
        }
    },

    uglify: {
      scripts: {
        options: {
          sourceMap: true
        },
        files: {
          'public/scripts/app.js': 'src/scripts/app.js'
        }
      },
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['dev']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  grunt.registerTask('build', ['jshint', 'sass', 'uglify', 'copy']);
  grunt.registerTask('dev', ['build', 'watch']);
  grunt.registerTask('default', ['build']);

};