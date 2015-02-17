module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: 'src/swapi-js.js',
                dest: 'src/swapi-js.min.js'
            }
        },
        jshint: {
            all: ['src/swapi-js.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint','uglify']);

};/**
 * Created by ancom on 17/02/15.
 */
