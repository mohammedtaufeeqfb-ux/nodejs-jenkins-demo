pipeline {

    agent any

    environment {

        DOCKER_USER = "taufeeqdev"
        IMAGE_NAME = "nodejs-jenkins-demo"
        IMAGE_TAG = "${BUILD_NUMBER}"

    }

    stages {

        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }

        stage('Verify Workspace') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                docker build -t ${DOCKER_USER}/${IMAGE_NAME}:${IMAGE_TAG} .
                """
            }
        }

        stage('Verify Docker Image') {
            steps {
                sh "docker images | grep ${IMAGE_NAME}"
            }
        }

        stage('Docker Login') {
            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-cred',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {

                    sh '''
                    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                    '''

                }

            }
        }

        stage('Push Docker Image') {
            steps {

                sh """
                docker push ${DOCKER_USER}/${IMAGE_NAME}:${IMAGE_TAG}
                """

            }
        }

    }

}
