# codesandbox-ui5-base
Created with CodeSandbox

Open this Repo in CodeSanbox: https://githubbox.com/1DSAG/UI5-Best-Practice-samples/tree/testing

# UI5 Tests
This branch shows an example of simple unit tests and opa tests. Take a look in the `src/test` folder
to get an impression of how to structure your tests


#code coverage stuff

pipeline {
        agent { 
                docker { 
                        image 'markhobson/node-chrome'
                        reuseNode true
                }
        }
        environment {
                HOME = "."
        }
       
        stages {
                stage('git clone') {
                    steps {
                        git 'git@192.168.1.111:/home/git/sittd.git'
                    }
                }
                stage('log version info') {
                        steps {
                                sh 'pwd'
                                sh 'ls -la'
                                sh 'node --version'
                                sh 'npm --version'
                        }
                }
                stage('install dependencies') {
                        steps {
                                sh 'npm install'
                        }
                }
                /*
                stage('lint') {
                        steps {
                                sh 'npm run lint'
                        }
                }                
                stage('build') {
                        steps {
                                sh 'npm run build'
                        }
                }
                */
                stage('test') {
                        steps {
                                sh 'set -a'
                          //      sh 'source .env'
                                sh 'npm run test'
                        }
                }
                stage('publish') {
                    steps {
                        
                        script {
                           REPORT_PATH = sh (
                                script: 'find . -name "cobertura-coverage.xml"',
                                returnStdout: true
                            ).trim()
                            echo "REPORT IS IN ${REPORT_PATH}"
                            sh (
                                
                                script: 'x=$(find . -name "cobertura-coverage.xml") && cp "$x" .'
                            )
                        }
                        publishCoverage adapters: [cobertura(coberturaReportFile: "cobertura-coverage.xml")]
                    }
                }
        }       
}
