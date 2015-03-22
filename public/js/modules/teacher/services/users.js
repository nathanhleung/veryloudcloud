angular.module('userService', [])
  .factory('Users', ['$http', function($http) {
		  return {
				get: function() {
					return $http.get('/api/users');
				},
				getUsername: function() {
					return $http.get('/api/users/me');
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