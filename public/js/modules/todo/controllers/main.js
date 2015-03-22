angular.module('todoController', ['todoService'])
  .controller('mainController', ['$scope', '$http', 'Todos', function($scope, $http, Todos) {
		$http.get('/api/users/me').
			success(function(user) {
				$scope.username = user[0].username;
			});
			
		$scope.formData = {};
		
		$scope.formData.username = $scope.username;
			
		$scope.getTodos = function(user) {
			Todos.get(user).
				success(function (data) {
					$scope.todos = data;
				});
		};
			
		$scope.createTodo = function() {
			if ($scope.formData.text !== "") {
				$scope.formData.username = $scope.username
				Todos.create($scope.formData)
				  .success(function(data) {
						$scope.formData = {};
						$scope.formData.text = "";
						$scope.todos = data;
					});
			}
		};
		
		$scope.deleteTodo = function(id) {
			Todos.delete(id)
			  .success(function(data) {
					$scope.todos = data;
				});
		};
		
		$scope.deleteAllTodos = function(user) {
			Todos.deleteAll(user)
			  .success(function(data) {
					$scope.todos = data;
				});
		};
		
		$scope.getTodos($scope.username); // initial pageload
		
	}]);