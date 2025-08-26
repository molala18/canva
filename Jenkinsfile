pipeline {
    agent any

    tools {
        nodejs 'NODE_HOME'
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || echo "No tests configured"'
            }
        }

        stage('Deploy (dummy)') {
            steps {
                echo 'Here you would deploy your Next.js build'
            }
        }
    }
}
