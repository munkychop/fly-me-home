function Gruntfile (grunt)
{
    "use strict";

    var alias = require("grunt-browserify-alias");

    var srcDir = "src/";
    var distDir = "dist/";

    var jsSrcDir = srcDir + "js/app/";
    var jsDistDir = distDir + "js/";
    var jsLibsDir = srcDir + "js/libs/";
    var jsSrcFile = "app.js";
    var jsDistFile = "app.js";

    var scssSrcDir = srcDir + "scss/";
    var scssSrcFile = "app.scss";

    var cssDistDir = distDir + "css/";
    var cssDistFile = "app.css";

    var imgSrcDir = srcDir + "img/";
    var imgDistDir = distDir + "img/";

    var fontSrcDir = srcDir + "fonts/";
    var fontDistDir = distDir + "fonts/";

    var markupSrcDir = srcDir + "markup/";
    var markupDistDir = distDir;

    // a variable to alias all js files in the directories specified.
    // This allows them to be require'd without any complicated relative filepaths.
    var aliasMap = alias.map(grunt, [
        {    
            cwd: jsSrcDir, // alias for app files
            src: ["**/*.js"],
            dest: ""
        },
        {
            cwd: jsLibsDir, // alias for lib files
            src: ["**/*.js"],
            dest: ""
        }
    ]);

    grunt.initConfig({

        browserify: {
            dev: {
                options : {
                    alias: aliasMap,
                    
                    browserifyOptions: {
                        debug: true,
                    },
                },

                src: jsSrcDir + jsSrcFile,
                dest: jsDistDir + jsDistFile,
            },

            dist: {
                options : {
                    alias: aliasMap
                },

                src: jsSrcDir + jsSrcFile,
                dest: jsDistDir + jsDistFile
            }
        },

        uglify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: jsDistDir,
                    src: jsDistFile,
                    dest: jsDistDir
                }]
            }
        },

        sass: {
            dev: {
                options: {
                    unixNewlines: true,
                    style: "expanded",
                    lineNumbers: false,
                    debugInfo: false,
                    precision: 8,
                    loadPath: scssSrcDir
                },

                src: scssSrcDir + scssSrcFile,
                dest: cssDistDir + cssDistFile
            },

            dist: {
                options: {
                    style: "compressed",
                    precision: 8,
                    loadPath: scssSrcDir
                },
                
                src: scssSrcDir + scssSrcFile,
                dest: cssDistDir + cssDistFile
            }
        },

        autoprefixer: {
            dist : {
                options: {
                    // support the last 2 browsers, any browsers with >5% market share,
                    // and ensuring we support IE9 and Anroid 4 stock browsers with prefixes
                    browsers: ["> 5%", "last 2 versions", "ie >= 9", "Android 4"],
                    map: true
                },

                src: cssDistDir + cssDistFile,
                dest: cssDistDir + cssDistFile
            }
        },

        csso: {
            dist: {
                options: {
                    restructure: false
                },

                src: cssDistDir + cssDistFile,
                dest: cssDistDir + cssDistFile
            }
        },

        clean: {
            img: [imgDistDir + "**/*.*"],
            fonts: [fontDistDir + "*.*"],
            markup: [markupDistDir + "*.html"]
        },

        copy: {
            img: {
                files: [
                    {
                        expand: true,
                        cwd: imgSrcDir,
                        src: ["./**/*.*"],
                        dest: imgDistDir
                    }
                ]
            },

            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: fontSrcDir,
                        src: ["./*.*"],
                        dest: fontDistDir
                    }
                ]
            },

            markup: {
                files: [
                    {
                        expand: true,
                        cwd: markupSrcDir,
                        src: ["./*.html"],
                        dest: markupDistDir
                    }
                ]
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    // target compiled CSS and JS.
                    src : [cssDistDir + cssDistFile, jsDistDir + jsDistFile]
                },
                options: {
                    watchTask: true, // set true when also using a seperate watch task, e.g. grunt-contrib-watch

                    server: {
                        baseDir: distDir
                    },

                    watchOptions: {
                        debounceDelay: 1000 // delay for events called in succession for the same file/event
                    },

                    minify: false
                }
            }
        },

        watch: {
            js: {
                files: [jsSrcDir + "**/*.js"],
                tasks: ["browserify:dev"]
            },

            scss: {
                files: [scssSrcDir + "**/*.scss"],
                tasks: ["sass:dev", "autoprefixer:dist"]
            },

            img: {
                files: [imgSrcDir + "**/*.*"],
                tasks: ["clean:img", "copy:img"]
            },

            fonts: {
                files: [fontSrcDir + "*.*"],
                tasks: ["clean:fonts", "copy:fonts"]
            },
            
            livereload: {
                options: {
                    livereload: true
                },
                
                files: [
                    cssDistDir + cssDistFile,
                    fontDistDir + "*.*"
                ]
            }
        }
    });


    // Load all the grunt tasks and include a pattern to account for modules with
    // and without file names starting 'grunt-', if necessary.
    require("load-grunt-tasks")(grunt, {pattern: ["grunt-*"]});

    // =============
    // === Tasks ===
    // =============

    // Default development build, start a server, and watch for changes.
    grunt.registerTask("default", ["clean", "copy", "sass:dev", "autoprefixer:dist", "browserify:dev", "browserSync", "watch"]);

    // A task for creating a development build.
    grunt.registerTask("dev", ["clean", "copy", "sass:dev", "autoprefixer:dist", "browserify:dev"]);

    // A task for creating a production build.
    grunt.registerTask("dist", ["clean", "copy", "sass:dist", "autoprefixer:dist", "csso:dist", "browserify:dist", "uglify:dist"]);
}

module.exports = Gruntfile;