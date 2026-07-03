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

        stage('Build Docker Image') {

            steps {

                sh """
                    docker build -t ${DOCKER_USER}/${IMAGE_NAME}:${IMAGE_TAG} .
                """

            }

        }

        stage('Docker Login & Push') {

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

                    docker push ${DOCKER_USER}/${IMAGE_NAME}:${IMAGE_TAG}

                    '''

                }

            }

        }

    }

}
