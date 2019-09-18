pipeline {
	agent {
		node {
			label ''
			customWorkspace 'workspace/tour-server'
		}
	}

	stages {
		stage('deploy') {
			steps {
				sh 'bash ./publish.sh'
			}
		}
	}
}
