#!groovy
@Library('art-shared@master') _



pipeline {
    agent {
//         node {
//             label 'php 7.3'
//         }

        docker {
//            image 'node:10-stretch'
           image 'node:latest'
           label 'master'
        }

    }
    environment {
        HOME = '.'
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm install '
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build '
            }
        }

        stage('Artifacts') {
            steps {
                sh 'tar -czf dist.tar.gz ./dist'
                stash 'dist.tar.gz'
                archiveArtifacts artifacts: 'dist.tar.gz'
          }
        }
    }
}
