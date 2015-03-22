angular.module('userController', ['userService'])
  .controller('userController', ['$scope', '$http', 'Users', function($scope, $http, Users) {
		$scope.userData = {};
		
		$scope.getUsers = function() {
			Users.get()
				.success(function (data) {
					$scope.users = data;
				});
		};
		
		$scope.createUser = function() {
			if ($scope.userData.username !== "") {
				Users.create($scope.userData)
				  .success(function(data) {
						$scope.userData = {};
						$scope.userData.text = "";
						$scope.users = data;
					});
			}
		};
		
		$scope.deleteUser = function(id) {
			Users.delete(id)
			  .success(function(data) {
					$scope.users = data;
				});
		};
		
		$scope.getUsers(); // initial pageload
		
	}]);
	

angular.module('classController', ['classService', 'userService'])
  .controller('classController', ['$scope', '$http', 'Classes', 'Users', function($scope, $http, Classes, Users) {
		
		$scope.init = function() {
			Users.getUsername()
				.success(function (data) {
					$scope.user = data[0];
					$scope.classData.teacher = $scope.user.username;
					$scope.getClasses($scope.user.username);
				});
		};
		
		$scope.classData = {};
		$scope.init();
		
		$scope.getClasses = function(teacher) {
			Classes.get(teacher)
				.success(function (data) {
					$scope.classes = data;
					$scope.getDepartments($scope.classes);
				});
		};

		$scope.createClass = function() {
			if ($scope.classData.className !== "") {
				Classes.create($scope.classData)
				  .success(function(data) {
						$scope.classData = {};
						$scope.init();
						$scope.classes = data;
						$scope.getDepartments($scope.classes);
					});
			}
		};
		
		$scope.getClass = function(classId) {
			Classes.getClass(classId)
				.success(function (data) {
					$scope.class = data;
				});
		};
		
		$scope.kickStudent = function(studentId, classId) {
			Classes.kickStudent(studentId, classId)
			  .success(function(data) {
					$scope.classes = data;
					$scope.getClass(classId) // refresh student list
				});
		};
		
		$scope.currentPath = location.pathname;
		if (~$scope.currentPath.indexOf('/classes/5')) { // not sure if this is the best way to validate...
			if (~$scope.currentPath.indexOf('/students')) {
				$scope.classId = $scope.currentPath.substring(17, 41); // there are 9 characters in /teacher/classes/ and the 41st character is /students
			} else {
				$scope.classId = $scope.currentPath.substring(17); // there are 9 characters in /teacher/classes/
			}
			$scope.getClass($scope.classId);
		}
		
		$scope.deleteClass = function(id) {
			Classes.delete(id)
			  .success(function(data) {
					$scope.classes = data;
					$scope.getDepartments($scope.classes);
				});
		};
		
		$scope.getDepartments = function(classes) {
			$scope.departments = [];
			angular.forEach(classes, function(value, department) {
				if ($scope.departments.indexOf(value.department) === -1) {
					this.push(value.department);
				}
			}, $scope.departments);
		}
		/*
		$scope.addAssignment = function(id) {
			Classes.delete(id)
			  .success(function(data) {
					$scope.classes = data;
					$scope.getDepartments($scope.classes);
				});
		};*/
}]);

angular.module('assignmentController', ['assignmentService'])
  .controller('assignmentController', ['$scope', '$http', 'Assignments', function($scope, $http, Assignments) {
		
		$scope.assignmentData = {};
		
		$scope.getAssignments = function(classId) {
			Assignments.get(classId)
				.success(function (data) {
					$scope.assignments = data;
				});
		};
		
		$scope.formatDate = function(date) {
			var dateObj = new Date(date);
			var formattedDate = (dateObj.getMonth()+1) + "/" + dateObj.getDate() + "/" + dateObj.getFullYear();
			return formattedDate;
		}
		
		$scope.currentPath = location.pathname;
		if (~$scope.currentPath.indexOf('/classes/5')) { // not sure if this is the best way to validate...
			if (~$scope.currentPath.indexOf('/students')) {
				$scope.classId = $scope.currentPath.substring(17, 41); // there are 9 characters in /teacher/classes/ and the 41st character is /students
			} else {
				$scope.classId = $scope.currentPath.substring(17); // there are 9 characters in /teacher/classes/
			}
			$scope.getAssignments($scope.classId);
		}
		
		$scope.createAssignment = function(assignmentData, classId) {
			if ($scope.assignmentData.assignmentName !== "") {
				Assignments.create($scope.assignmentData, classId)
				  .success(function(data) {
						$scope.assignmentData = {};
						$scope.assignments = data;
					});
			}
		};
		
		$scope.deleteAssignment = function(classId, assignmentId) {
			Assignments.delete(classId, assignmentId)
			  .success(function(data) {
					$scope.assignments = data;
				});
		};
}]);