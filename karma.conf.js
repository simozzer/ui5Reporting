module.exports = function (config) {
    "use strict";

    config.set({
        frameworks: ["ui5"],
        plugins: [
            'karma-ui5',
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-junit-reporter'
        ],
        ui5: {
            url: "https://sapui5.netweaver.ondemand.com/",
            type: "application",
            paths: {
                webapp: "src"
            }
        },
        browserConsoleLogOptions: {
            level: "error"
        },
        reporters: ["progress","coverage"],
        browsers: ["ChromeHeadless"],
        singleRun: true,
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'src/**/*.js': ['coverage']
          },
      
        
          // changes type to `cobertura`
            coverageReporter : {
                type : 'cobertura',
                dir  : 'target/coverage-reports/'
            },
            // saves report at `target/surefire-reports/TEST-*.xml` because Jenkins
            // looks for this location and file prefix by default.
            junitReporter    : {
                outputDir : 'target/surefire-reports/'
            }
    });
};
