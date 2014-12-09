module.exports = function(grunt){
    "use strict";
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: true,
                    consolidateViaSelectors:    true,
                    consolidateMediaQueries:    true
                },
                files: {
                    'build/grapher.css': [
                        'src/css/general.css',
                        'src/css/whisker.css',
                        'src/css/pie.css'
                    ]
                }
            }
        },

        cssmin: {
            build: {
                src: 'build/grapher.css',
                dest: 'build/grapher.min.css'
            }
        },

        watch: {
          scripts: {
            files: ['src/**/*'],
            tasks: ['buildcss'],
            options: {
              spawn: false,
            },
          },
        }
    });

    grunt.registerTask('default', ['buildcss', 'watch']);
    grunt.registerTask('buildcss', ['cssc', 'cssmin']);
};