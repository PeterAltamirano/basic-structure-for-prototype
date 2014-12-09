module.exports = function(grunt){
    grunt.initConfig({

        coffee: {
            compile: {
                options: {
                    expand: true,
                    flatten: true,
                    join: true
                },
                files: {
                    '../website/js/app.js': ['src/utils/*.coffee','src/view/*.coffee','src/**/*.coffee']
                }
            }
        },

        compass: {
            compile: {
                options: {
                    sassDir: 'sass',
                    cssDir: '../website/css',
                    environment: 'production'
                },
                files: {
                    'style.css': 'style.sass'
                }
            }
        },

        notify: {
            watch: {
                options: {
                    title: "Grunt Watcher",
                    message: "Compilation finished"
                }
            },
            compass: {
                options: {
                    title: "Grunt Compass",
                    message: "Compilation finished"
                }
            },
            js: {
                options: {
                    title: "Grunt JavaScript",
                    message: "Compilation finished"
                }
            }
        },
        watch: {
            coffee: {
                files: ["src/**/*.coffee"],
                tasks: ["js-compile"]
            },
            compass: {
                files: ["sass/**/*.sass"],
                tasks: ["compass-compile"]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-notify');

    // Default task(s).
    grunt.registerTask('js-compile', ['coffee','notify:js']);
    grunt.registerTask('compass-compile', ['compass',"notify:compass"]);

    grunt.registerTask('watcher', ['watch']);

};
