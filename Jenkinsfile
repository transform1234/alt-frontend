pipeline {
  agent any

  stages {
    // stage('Clean workspace') {
    //   steps {
    //     script {
    //        Use 'dir' to change the workspace directory
    //        dir('/var/lib/jenkins/workspace/prod-frontend') {
    //         sh 'rm -rf *'
    //       }
    //     }
    //   }
    // }

    stage('Checkout') {
      steps {
        cleanWs()
        git branch: 'altv1', url: 'https://github.com/transform1234/alt-frontend.git'
      }
    }

    stage('Building Code') {
      steps {
        dir('/var/lib/jenkins/workspace/prod-frontend') {
          sh 'rm -rf node_modules'
          sh 'rm -f package-lock.json' // Corrected to remove the file
          sh 'ls'
          sh 'yarn install'
          sh 'yarn workspace @shiksha/common-lib build'
          sh 'yarn install'
          sh 'yarn build'
        }
      }
    }

    stage('Copy Package') {
      steps {
        sh './scripts/pack-prod-build.sh'
        // sh "rsync shiksha-ui.tar:/var/www/alt.uniteframework.io/shiksha-ui.tar"
      }
    }

    stage('Deploy') {
      steps {
        script {
          dir('/var/lib/jenkins/build') {
            sh 'rm -rf *'
            sh 'cp /var/lib/jenkins/workspace/prod-frontend/shiksha-ui.tar .'
            sh 'tar -xvf shiksha-ui.tar'
          }
        }
      }
    }
    stage('deployment on s3') {
    steps {
        dir('/var/lib/jenkins/build') {
            script {
                withAWS(region: 'ap-south-1', credentials: 'prasad-aws-id') {
                    s3Delete(bucket: 'altprodfrontend', path: '**/*')
                    s3Upload(bucket: 'altprodfrontend', workingDir: '.', includePathPattern: '**/*', excludePathPattern: '.git/*, **/node_modules/**')
                }
            }
        }
    }
}
  
    
    // stage('Deployment') {
    //   steps {
    //     dir('/var/lib/jenkins/build') {
    //       sh 'aws s3 ls'
    //       sh "aws s3 cp . s3://altprodfrontend/ --recursive"
    //       // script {
    //       //   def awsCliCmd = 'aws'
    //       //   //def bucketName = 'altfrontend'
    //       //    sh "aws s3 cp . s3://altprodfrontend/ --recursive"
    //       // }
    //     }
    //   }
    // }
        // New stage for executing ccs.sh script
    stage('Execute Invalidation Script') {
      steps {
        dir('/var/lib/jenkins/workspace') {
          sh 'sh frontend.sh'
        }
      }
    }
    }
  }

