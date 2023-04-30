pipeline { 

    agent any

    triggers {
        pollSCM('* * * * *')
    }

    stages {

        stage('Source checkout') {
            steps {
                echo 'Cloning source code is finished.'
            }
        }

        stage('Test') {
            steps {
                echo 'Cloning source test is finished.'
            }
        }

        stage('Docker build') {
            steps {
                echo 'Build dokcer image'
                sh ''' docker image build -t cbfsd-user-webapp-03-12-2022 .'''
            }
        }

        stage('Docker deploy') {
            steps {
                echo '----------------- This is a docker deploment phase ----------'
                sh '''
                 (if  [ $(docker ps -a | grep cbfsd-user-webapp-container-03-12-2022 | cut -d " " -f1) ]; then \
                        echo $(docker rm -f cbfsd-user-webapp-container-03-12-2022); \
                        echo "---------------- successfully removed cbfsd-user-webapp-container-03-12-2022 ----------------"
                     else \
                    echo OK; \
                 fi;);
                docker container run --restart always --name cbfsd-user-webapp-container-03-12-2022 -p 4201:80 -d cbfsd-user-webapp-03-12-2022
            '''
            }
        }
    }
}
