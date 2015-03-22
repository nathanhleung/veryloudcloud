angular.module('assignmentService', [])
  .factory('Assignments', ['$http', function($http) {
		  return {
				get: function(classId) {
					return $http.get('/api/classes/' + classId + '/assignments');
				},
				create: function(assignmentData, classId) {
					return $http.post('/api/classes/' + classId + '/assignments', assignmentData);
				},
				delete: function(classId, assignmentId) {
					return $http.delete('/api/classes/' + classId + '/assignments/' + assignmentId);
				}
			}
	}]);