pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.43.1-jammy' 
            reuseNode true
        }
    }

    environment {
        HOME = "${env.WORKSPACE}"
        PATH = "/ms-playwright/node/bin:/usr/local/bin:/usr/bin:/bin"
    }

    stages {
        stage('Install') {
            steps {
                sh '''
                    node --version
                    npm --version
                    cd ./client
                    npm ci
                '''
            }
        }

        stage('Run Vitest Tests') {
            steps {
                sh '''
                    cd ./client
                    mkdir -p artifacts
                    npx vitest run --reporter=junit --outputFile=artifacts/junit.xml || true
                '''
            }
        }
    }

    post {
        always {
            // Optional: confirm the file is there
            sh 'echo "== Located JUnit files =="; find . -name "*.xml" || true'

            // ✅ This path must match the actual file location
            junit 'client/artifacts/junit.xml'

            // Optional: archive all test outputs
            archiveArtifacts artifacts: 'client/artifacts/**', allowEmptyArchive: true
        }
    }
}