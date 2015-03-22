angular.module('userService', [])
  .factory('Users', ['$http', function($http) {
		  return {
				get: function() {
					return $http.get('/api/users');
				},
				create: function(userData) {
					return $http.post('/api/users', userData);
				},
				/*
				update: function(userData) {
					return $http.put('/api/users/' + id);
				}, */
				delete: function(id) {
					return $http.delete('/api/users/' + id);
				}
			}
	}]);