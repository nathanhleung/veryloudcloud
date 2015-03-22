angular.module('classService', [])
  .factory('Classes', ['$http', function($http) {
		  return {
				get: function() {
					return $http.get('/api/classes');
				},
				getClass: function(classId) {
					return $http.get('/api/classes/' + classId);
				},
				getJoinedClasses: function(user) {
					return $http.get('/api/classes/all/' + user);
				},
				enroll: function(user, classId) {
					return $http.post('/api/classes/' + classId + '/' + user);
				},
				/*
				update: function(classData) {
					return $http.put('/api/classes/' + id);
				}, */
				leave: function(user, classId) {
					return $http.delete('/api/classes/' + classId + '/' + user);
				}
			}
	}]);