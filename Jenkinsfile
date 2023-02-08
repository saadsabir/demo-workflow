pipeline {
    agent any
    environment {
        CI = 'true'
        COMPOSE_PROJECT_NAME = "${JOB_NAME}-${BUILD_ID}"
    }
    stages {
        stage('Build') {
            steps {
                sh 'docker-compose down -v'
                sh 'docker-compose up -d --build'
            }
        }
        stage('Test') {
            steps {
                echo "Test: ${BUILD_NUMBER}"
                sh 'docker build -t demo-test -f docker/Dockerfile.test --no-cache .'
                sh 'docker run --rm demo-test'
                sh 'mkdir build'
                sh 'echo "Test # ${BUILD_NUMBER} finished" > build/results_test.txt'
                sh 'docker rmi demo-test'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'build/results_test.txt', fingerprint: true
                }
            }
        }
        stage('Deploy for production') {
            when {
                branch 'master'  
            }
            steps {
                echo 'From master'
                input message: 'Finished using the web site?'
                sh 'docker container stop demo-react'
                sh 'docker container rm demo-react'
            }
        }
        stage('Deliver for development') {
            when {
                branch 'develop' 
            }
            steps {
                echo 'Build from develop'
                input message: 'Finished using the web site?'
                sh 'docker container stop demo-react'
                sh 'docker container rm demo-react'
            }
        }   
    }

    post {
         always {
            junit 'report.xml'
            deleteDir()
        }
        success {
            echo 'Build Succeed ! 🥳'
        }
        unstable {
            echo 'Build unstable :/'
        }
        failure {
            echo 'Build failed 🤐'
        }
        changed {
            echo 'Things were different before...'
        }
    }
}