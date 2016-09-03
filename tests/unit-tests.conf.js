// Karma configuration
// Generated on Wed Aug 17 2016 15:26:28 GMT-0300 (BRT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      '../www/lib/ionic/js/ionic.bundle.js',
      '../www/lib/angular-mocks/angular-mocks.js',
      '../www/js/*.js',
      '../www/utils/*.js',
      '../www/conexao/*.js',
      '../www/controller/*.js',
      '../www/diretivas/*.js',
      '../www/filtros/*.js',
      '../www/model/*.js',
      'unit-tests/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {

      '../www/conexao/_module.js': ['coverage'],
      '../www/conexao/auth.js': ['coverage'],
      '../www/conexao/conexao.js': ['coverage'],

      // '../www/controller/*.js': ['coverage'],
      // '../www/js/*.js': ['coverage'],

      '../www/diretivas/_module.js': ['coverage'],
      '../www/diretivas/compile.js': ['coverage'],
      '../www/diretivas/enter.js': ['coverage'],
      '../www/diretivas/lazy.js': ['coverage'],
      '../www/diretivas/lazyBack.js': ['coverage'],

      '../www/filtros/*.js': ['coverage'],


      '../www/model/*.js': ['coverage'],

      '../www/utils/_module.js': ['coverage'],
      '../www/utils/constantes.js': ['coverage'],
      '../www/utils/localstorage.js': ['coverage'],
      '../www/utils/modais.js': ['coverage'],
      '../www/utils/popups.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/',
      subdir: 'report'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
