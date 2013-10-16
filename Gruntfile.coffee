module.exports = (grunt) ->

  # build config
  grunt.initConfig(
    clean:
      lib:
        src: 'lib/**'

    coffee:
      all:
        expand: true
        cwd: 'src/'
        src: '**/*.coffee'
        dest: 'lib'
        ext: '.js'

    browserify:
      all:
        src: [ 'lib/pnwscala.js' ]
        dest: 'build/pnwscala.js'
        options:
          debug: false
          ignoreMissing: true
          filter: (file) -> !(file in [ 'zepto-node', 'domino' ])

    jade:
      page:
        src: 'src/pnwscala.jade'
        dest: 'build/pnwscala.html'
        options:
          output: 'html'

      views:
        expand: true
        cwd: 'src/'
        src: '**/*.jade'
        dest: 'lib'
        ext: '.html.js'
        options:
          output: 'js'

    sass:
      page:
        src: 'src/pnwscala.sass'
        dest: 'build/pnwscala.css'
        options:
          style: 'compressed'
  )

  # load plugins
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-browserify')

  # load local tasks
  require('./tasks/jade')(grunt)

  # tasks
  grunt.registerTask('default', [ 'clean:lib', 'coffee:all', 'browserify:all', 'jade:page', 'jade:views', 'sass:page' ])

