module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    clean: {
        build: ['build/*']
    },
    copy: {
        build: {
            files: [
                {
                    expand: true,
                    cwd: 'src',
                    src: [
                        '**/**.html', '**/*.json', '**/*.css', 
                        'assets/**/*','Scripts/**/*','images/**/*',
                        'model/**/*.ts'
                    ],
                    dest: 'build/'
                }
            ]
        },
        "after-build-for-ng2-gui": {
            files: [
                {
                    expand: true,
                    cwd: 'build/model',
                    src: ['**/*'],
                    dest: 'ng2-gui/src/assets/sudoku-model'
                }
            ]
        }
    },
    ts: {
      build:  {
          tsconfig: 'src/tsconfig.json'
      } 
    },
    "http-server": {
        run: {
            root: 'build/',
            port: 8082,
            host: "localhost",
            showDir: false,
            openBrowser: true
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');  
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-http-server');

  // TASKS
  grunt.registerTask('run', ['http-server']);
  grunt.registerTask('build', ['clean','ts','copy:build','copy:after-build-for-ng2-gui']);
};