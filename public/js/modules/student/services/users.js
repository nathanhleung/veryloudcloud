angular.module('userService', [])
  .factory('Users', ['$http', function($http) {
		  return {
				getUsername: function() {
					return $http.get('/api/users/me');
				},
			}
	}]);