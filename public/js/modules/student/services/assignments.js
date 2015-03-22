angular.module('assignmentService', [])
  .factory('Assignments', ['$http', function($http) {
		  return {
				get: function(classId) {
					return $http.get('/api/classes/' + classId + '/assignments');
				},
			}
	}]);