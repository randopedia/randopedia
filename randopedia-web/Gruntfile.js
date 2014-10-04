module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['vendor/handlebars-1.0.0.js',
              'vendor/ember.1.1.2.js',
              'vendor/ember-data-1.0-b2.js',
              'vendor/ember.oauth2.js',
              'src/*.js'],
        dest: 'client/js/<%= pkg.name %>.js'
      }
    },
    jshint: {
      files: ['gruntfile.js', 'src/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        },
        ignores: ['src/fixtures.js', 'vendor/*']
      }
    },
    uglify: {
        my_target: {
          files: {
            'client/js/randopedia.min.js': ['client/js/randopedia.js']
          }
        }
      },
    emberTemplates: {
        compile: {
          options: {
            templateName: function(sourceFile) {
                
                    if(sourceFile.indexOf('-component') != -1) {
                        return sourceFile.replace("templates/", 'components/').replace('-component', '');
                    }
                    return sourceFile.replace("templates/", '');
                }
          },
          files: {
            "client/js/templates.js": "templates/*.hbs",
          }
        }
    },
    bootstrap: {
        dest: "out"
    },
    less: {
        development: {
            files: {
                "client/css/site.css": "client/css/site.less"
            }
        },
//        production: {
//            files: {
//                "client/css/site.css": "client/css/site.less"
//            }
//        }
    },
    qunit: {
        all: ['test/*.html']
    },
    connect: {
        server: {
            options: {
                port: 9001,
                hostname: '192.168.1.103',
                base: ['client'],
                keepalive : true,
                middleware: function (connect, options) {
                    if (!Array.isArray(options.base)) {
                        options.base = [options.base];
                    }

                    // Setup the proxy
                    var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

                    // Serve static files
                    options.base.forEach(function(base) {
                        middlewares.push(connect.static(base));
                    });

                    // Make directory browse-able
                    var directory = options.directory || options.base[options.base.length - 1];
                    middlewares.push(connect.directory(directory));

                    return middlewares;
                }
            },
            proxies: [
                {
                    context: '/randopedia/api',
                    host: '127.0.0.1',
                    port: 8080,
                    https: false,
                    changeOrigin: false,
                    xforward: false,
                    //rewrite: {
                    //    '^/api/$': '/randopedia/api/$1'
                    //}
                },
                {
                    context: '/randopedia/logincallback',
                    host: '127.0.0.1',
                    port: 8080,
                    https: false,
                    changeOrigin: false,
                    xforward: false
                }
            ]
        }
    }    
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-connect-proxy');
  grunt.loadNpmTasks('grunt-contrib-less');
  
  grunt.registerTask('test', ['jshint', 'concat', 'emberTemplates', 'less', 'qunit']);
  grunt.registerTask('localhost', ['jshint', 'concat', 'emberTemplates', 'less', 'qunit']);
  grunt.registerTask('default', ['jshint', 'concat', 'emberTemplates', 'less', 'qunit', 'uglify']);
  grunt.registerTask('server', ['configureProxies:server', 'connect']);
  
};
