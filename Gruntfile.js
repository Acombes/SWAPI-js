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
            ignore_warning: {
                options: {
                    loopfunc: true //Ignore functions in loops error.
                },
                src: ['src/*.js', '!src/*.min.js'] //Ignore minified files
            }
        },
        nugetpack: {
            dist: {
                src: 'swapi-js.nuspec',
                dest: 'nuget/'
            }
        },
        watch: {
            autoUglify: {
                files: ['src/*.js', '!src/*.min.js'],
                tasks: ['uglify'],
                options: {
                    atBegin: true,
                    event: ['added', 'changed']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nuget');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['jshint','uglify','nugetpack']);
};