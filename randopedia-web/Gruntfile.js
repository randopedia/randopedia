module.exports = function(grunt) {
    var rewriteModule = require('http-rewrite-middleware');

    grunt.initConfig({
        
        pkg: grunt.file.readJSON("package.json"),
        
        concat: {
            options: {
                separator: ";;"
            },
            libs: {
                src: ["client/js/libs/jquery-1.9.1.min.js", "client/js/libs/handlebars-v2.0.0.js", "client/js/libs/*.js"],
                dest: "client/js/libs.js"
            },
            site: {
                src: ["src/*.js"],
                dest: "client/js/<%= pkg.name %>.js"
            }
        },
        
        jshint: {
            files: ["gruntfile.js", "src/**/*.js"],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                },
                ignores: ["src/fixtures.js", "vendor/*"]
            }
        },
        
        uglify: {
            prod: {
                files: {
                    'client/js/<%= pkg.name %>.js': ["client/js/<%= pkg.name %>.js"]
                }
            }
        },
        
        cssmin: {
            combine: {
                files: {
                    'client/css/site.min.css': ["client/css/normalize.css", "client/css/site.css", "select2.min.css"]
                }
            }
            
        },

        emberTemplates: {
            compile: {
                options: {
                    templateNamespace: 'Handlebars',
                    templateName: function (sourceFile) {
                        
                        if (sourceFile.indexOf("-component") !== -1) {
                            return sourceFile.replace("templates/", "components/").replace("-component", "");
                        }
                        return sourceFile.replace("templates/", "");
                        
                    }
                },
                files: {
                    "client/js/templates.js": "templates/*.hbs"
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
            }
        },
        
        qunit: {
            all: ["test/*.html"]
        },
        
        watch: {
            scripts: {
                files: ["**/*.js", "**/*.hbs", "**/*.less", "**/*.html"],
                tasks: ["jshint", "concat", "emberTemplates", "less", "cssmin"],
                options: {
                    spawn: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    debug : true,
                    port: 9001,
                    hostname: "localhost",
                    base: ["client"],
                    keepalive : true,
                    middleware: function (connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                            
                        }
                        // Setup the proxy
                        var middlewares = [require("grunt-connect-proxy/lib/utils").proxyRequest];                        

                        middlewares.push(rewriteModule.getMiddleware([
                            {from: '^/about', to: '/'},
                            {from: '^/tags', to: '/'},
                            {from: '^/stats', to: '/'},
                            {from: '^/dashboard', to: '/'},
                            {from: '^/tours/nibbi', to: '/'},
                            {from: '^/tours/(.*)$', to: '/'},
                            
                        ]));
                        
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
                        context: "/randopedia/api",
                        host: "127.0.0.1",
                        port: 8080,
                        https: false,
                        changeOrigin: false,
                        xforward: false
                    },
                    {
                        context: "/auth/facebook/callback",
                        host: "127.0.0.1",
                        port: 8080,
                        https: false,
                        changeOrigin: false,
                        xforward: false
                    },
                    {
                        context: "/auth/google/callback",
                        host: "127.0.0.1",
                        port: 8080,
                        https: false,
                        changeOrigin: false,
                        xforward: false
                    }                
                ]
            }
        }    
    });
    
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-ember-templates");
    grunt.loadNpmTasks("grunt-contrib-qunit");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-connect-proxy");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");

    /* "default" build. Not uglifying, not running tests */
    grunt.registerTask("default", ["jshint", "concat", "emberTemplates", "less", "cssmin"]);
    
    /* "dev"" build. Not uglifying, Runs tests */
    grunt.registerTask("dev", ["jshint", "concat", "emberTemplates", "less", "qunit", "cssmin"]);
    
    /* "prod"" build. Uglifying, Runs tests */
    grunt.registerTask("prod", ["jshint", "concat", "emberTemplates", "less", "qunit", "uglify", "cssmin"]);
    
    /* grunt connect server */
    grunt.registerTask("server", ["configureProxies:server", "connect"]);
    
};

