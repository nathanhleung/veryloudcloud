angular.module('classController', ['classService', 'userService'])
  .controller('classController', ['$scope', '$http', '$location', 'Classes', 'Users', function($scope, $http, $location, Classes, Users) {
		
		$scope.init = function() {
			Users.getUsername()
				.success(function (data) {
					$scope.username = data[0].username;
					$scope.getJoinedClasses($scope.username);
				});
			$scope.getClasses();
		};
		
		$scope.getClass = function(classId) {
			Classes.getClass(classId)
				.success(function (data) {
					$scope.class = data;
				});
		};
		
		$scope.currentPath = location.pathname;
		if (~$scope.currentPath.indexOf('/classes/5')) { // not sure if this is the best way to validate...
			$scope.classId = $scope.currentPath.substring(9); // there are 9 characters in /classes/
			$scope.getClass($scope.classId);
		}
		
		$scope.getClasses = function() {
			Classes.get()
				.success(function (data) {
					$scope.classes = data;
					$scope.getDepartments($scope.classes);
				});
		};
		
		$scope.getJoinedClasses = function(user) {
			Classes.getJoinedClasses(user)
				.success(function (data) {
					$scope.joinedClasses = data;
				  $scope.joinedClassIds = $scope.joinedClasses.map(function(classObj) {
						return classObj._id;
					});
				});
		};
		
		// initial pageload
		$scope.init();
		
		
		$scope.joinClass = function(classId) {
			// Optimistic update
			let classObj = $scope.classes.filter((classObj) => {
				return classObj._id == classId;
			})[0];
			$scope.joinedClasses.push(classObj);
			$scope.joinedClassIds.push(classObj._id);
			Classes.enroll($scope.username, classId)
				.success(function(data) {
					$scope.classes = data;
					$scope.getJoinedClasses($scope.username);
				});
		};
		
		$scope.leaveClass = function(classId) {
			// Another optimistic update
			let classObj = $scope.classes.filter((classObj) => {
				return classObj._id == classId;
			})[0];
			$scope.joinedClasses.splice($scope.joinedClasses.indexOf(classObj), 1);
			$scope.joinedClassIds.splice($scope.joinedClassIds.indexOf(classObj._id), 1);
			Classes.leave($scope.username, classId)
			  .success(function(data) {
					$scope.classes = data;
					$scope.getClasses(); // for some reason if I don't put this here students.length remains 1 after leaving.
					$scope.getJoinedClasses($scope.username);
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
	}]);
	
angular.module('assignmentController', ['assignmentService'])
  .controller('assignmentController', ['$scope', '$http', 'Assignments', function($scope, $http, Assignments) {

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
			$scope.classId = $scope.currentPath.substring(9); // there are 9 characters in /classes/
			$scope.getAssignments($scope.classId);
		}
}]);

angular.module('calendarController', ['assignmentService', 'classService', 'userService'])
  .controller('calendarController', ['$scope', '$http', 'Users', 'Classes', 'Assignments', function($scope, $http, Users, Classes, Assignments) {
		
		$scope.init = function() {
			Users.getUsername()
				.success(function (data) {
					$scope.username = data[0].username;
					$scope.getJoinedClasses($scope.username);
				});
		};
		
		$scope.getClass = function(classId) {
			Classes.getClass(classId)
				.success(function (data) {
					$scope.class = data;
				});
		};
		
		$scope.assignments = [];
		
		$scope.allAssignments = [];
		
		$scope.getAllAssignments = function(joinedClassIds) {
			for (var classId in joinedClassIds) {
				Assignments.get(joinedClassIds[classId])
					.success(function(allAssignments) {
						for (assignment in allAssignments) {
							$scope.allAssignments.push(allAssignments[assignment]);
						}
					});
			}
		};
		
		$scope.joinedClassIds = [];
		
		$scope.getJoinedClasses = function(user) {
			Classes.getJoinedClasses(user)
				.success(function (data) {
					$scope.joinedClasses = data;
				  $scope.joinedClassIds = $scope.joinedClasses.map(function(classObj) {
						return classObj._id;
					});
					$scope.getAllAssignments($scope.joinedClassIds);
				});
		};
		
		$scope.init();
		
		$scope.formatDate = function(date) {
			var dateObj = new Date(date);
			var formattedDate = (dateObj.getMonth()+1) + "/" + dateObj.getDate() + "/" + dateObj.getFullYear();
			return formattedDate;
		}
		
		$scope.isInCal = function(index, date) {
			var now = new Date();
			var due = new Date(date);
						// check if any match
			if (index === "upcoming") {
				for (var i = 0; i <= 6; i++) {
					if (now.getDate() + i === due.getDate()) {
						return false;
					} else if (now.getTime() > due.getTime()) {
						return false;
					}
				}
				return true;
			} else if (index === "prior") {
				for (var i = 0; i <= 6; i++) {
					if (now.getDate() + i === due.getDate()) {
						return false;
					} else if (now.getTime() < due.getTime()) {
						return false;
					}
				}
				return true;
			}
			if (now.getDate() + index === due.getDate()) {
				return true;
			}
			return false;
		};

}]);