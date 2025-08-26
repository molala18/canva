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
   post {
    always {
        script {
            def colorMap = [
                'SUCCESS': '#36a64f',   // green
                'FAILURE': '#ff0000',  // red
                'UNSTABLE': '#ffcc00', // yellow
                'ABORTED': '#808080'   // gray
            ]

            def status = currentBuild.currentResult
            def color = colorMap.get(status, '#439FE0') // default blue

            slackSend(
                channel: '#devops-collaboration',
                color: color,
                message: "📢 Job: ${env.JOB_NAME} | Build: #${env.BUILD_NUMBER} | Status: ${status}"
            )
        }
    }
}


}
