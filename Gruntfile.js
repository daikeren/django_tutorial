var path = require("path");

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-gitbook');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        'gitbook': {
            development: {
                input: "./",
                github: "daikeren/django_tutorial"
            }
        },
        'gh-pages': {
            travis: {
                options: {
                    repo: 'https://' + process.env.GH_TOKEN + '@github.com/daikeren/django_tutorial.git',
//                    silent: true,
                    base: '_book'
                },
                src: ['**']
            },
            options: {
                base: '_book'
            },
            src: ['**']
        },
        'clean': {
            files: '.grunt'
        }
    });

    grunt.registerTask('publish', [
        'gitbook',
        'gh-pages',
        'clean'
    ]);
    grunt.registerTask('default', 'gitbook');
};
