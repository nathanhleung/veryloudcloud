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
	
angular.module('classController', ['classService'])
  .controller('classController', ['$scope', '$http', 'Classes', function($scope, $http, Classes) {
		$scope.classData = {};
		
		$scope.getClasses = function() {
			Classes.get()
				.success(function (data) {
					$scope.classes = data;
					$scope.getDepartments($scope.classes);
				});
		};
		
		// initial pageload
		$scope.getClasses();
		
		$scope.createClass = function() {
			if ($scope.classData.className !== "") {
				Classes.create($scope.classData)
				  .success(function(data) {
						$scope.classData = {};
						$scope.classes = data;
						$scope.getDepartments($scope.classes);
					});
			}
		};
		
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
}]);