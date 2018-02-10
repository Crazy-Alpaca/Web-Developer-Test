module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
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
      }
    },

    sass: {
        options: {
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