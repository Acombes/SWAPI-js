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
        },
        nugetpack: {
            dist: {
                src: 'swapi-js.nuspec',
                dest: 'nuget/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nuget');

    grunt.registerTask('default', ['jshint','uglify','nugetpack']);
};