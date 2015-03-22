angular.module('todoService', [])
  .factory('Todos', ['$http', function($http) {
		  return {
				get: function(user) {
					return $http.get('/api/todos/' + user);
				},
				create: function(todoData) {
					return $http.post('/api/todos', todoData);
				},
				delete: function(id) {
					return $http.delete('/api/todos/' + id);
				},
				deleteAll: function(user) {
					return $http.delete('/api/todos/' + user + '/all');
				}
			}
	}]);