angular.module('classesPage', ['classController', 'classService', 'assignmentController', 'assignmentService', 'calendarController'])
	.run(function($rootScope, $location) {
    $rootScope.location = $location;
});