angular.module('classService', [])
  .factory('Classes', ['$http', function($http) {
		  return {
				get: function() {
					return $http.get('/api/classes');
				},
				create: function(classData) {
					return $http.post('/api/classes', classData);
				},
				/*
				update: function(classData) {
					return $http.put('/api/classes/' + id);
				}, */
				delete: function(id) {
					return $http.delete('/api/classes/' + id);
				}
			}
	}]);