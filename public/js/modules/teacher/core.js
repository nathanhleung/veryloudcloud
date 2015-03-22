angular.module('teacherPage', ['userController', 'userService', 'classController', 'classService', 'assignmentController', 'assignmentService'])
	.run(function($rootScope, $location) {
    $rootScope.location = $location;
});