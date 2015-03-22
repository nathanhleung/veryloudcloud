angular.module('classService', [])
  .factory('Classes', ['$http', function($http) {
		  return {
				get: function(teacher) {
					return $http.get('/api/classes/teacher/' + teacher);
				},
				getClass: function(classId) {
					return $http.get('/api/classes/' + classId);
				},
				kickStudent: function(user, classId) {
					return $http.delete('/api/classes/' + classId + '/' + user);
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