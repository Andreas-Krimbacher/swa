'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').concat(['gruntacular']).forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    try {
        yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
    } catch (e) {}

    grunt.initConfig({
        yeoman: yeomanConfig,
        livereload: {
            port: 35729
        },
        watch: {
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/views/**/*.html',
                    '{.tmp,<%= yeoman.app %>}/scripts/**/**/*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg}'
                ],
                tasks: ['livereload']
            }
        },
        express: {
            livereload: {
                options: {
                    port: 9000,
                    // Change this to '0.0.0.0' to access the server from outside.
                    hostname: 'localhost',
                    bases: [yeomanConfig.app,'.tmp','<%= yeoman.app %>/components/angular-ui-bootstrap'],
                    //server: path.resolve('app/server/server.js'),
                    watchChanges: true
                    //debug:true
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= express.livereload.options.port %>'
            }
        },
        clean: {
            build: {
                src: ["dist/"]
            }
        },
        testacular: {
            unit: {
                configFile: 'testacular.conf.js',
                singleRun: true
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%= yeoman.app %>/styles/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/components',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true
            },
            globals: {
                jQuery: true
            }
        },
        'useminPrepare': {
            html: 'index.html'
        },
        usemin: {
            html: ['<%= yeoman.dist %>/*.html'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        cssmin: {
            combine: {
                files: {
                    '<%= yeoman.dist %>/styles/main.min.css': ['<%= yeoman.app %>/styles/OpenLayers/style.css', '.tmp/styles/main.css']
                }
            }
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    '<%= yeoman.dist %>/index.html': '<%= yeoman.app %>/index.html'     // 'destination': 'source'
                }
            }
        },
        concat: {
            '.tmp/js/app.js': ['<%= yeoman.app %>/scripts/**/**/**.js']
        },
        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/js.min.js': ['.tmp/js/app.js']
                }
            }
        },
        copy: {
            build:{
                files: [
                    {expand: true, cwd: '<%= yeoman.app %>/', src: ['*'], dest: '<%= yeoman.dist %>/'},
                    {expand: true,  cwd: '<%= yeoman.app %>/', src: ['components/**'], dest: '<%= yeoman.dist %>/'},
                    {expand: true,  cwd: '<%= yeoman.app %>/', src: ['views/**'], dest: '<%= yeoman.dist %>/'},
                    {expand: true,  cwd: '<%= yeoman.app %>/', src: ['styles/images/**'], dest: '<%= yeoman.dist %>/'},
                    {expand: true,  cwd: '<%= yeoman.app %>/styles/OpenLayers/', src: ['img/**'], dest: '<%= yeoman.dist %>/styles/'}
                    ]
            }
        }
    });

    grunt.renameTask('regarde', 'watch');
    // remove when mincss task is renamed
    grunt.renameTask('mincss', 'cssmin');

    grunt.registerTask('server', [
        'compass:server',
        'configureProxies',
        'livereload-start',
        'express:livereload',
        'open',
        'watch'
    ]);

    grunt.registerTask('test', [
        'clean:server',
        'compass',
        'express:test',
        'testacular'
    ]);

  grunt.registerTask('build', [
 //   'clean',
    'jshint',
//    'test',
    'compass:dist',
//    'useminPrepare',
//    'imagemin',
      'cssmin',
    'concat',
//    'copy',
//    'cdnify',
//    'usemin',
      'htmlmin'
    //'uglify'
  ]);

    grunt.registerTask('default', ['server']);
};
