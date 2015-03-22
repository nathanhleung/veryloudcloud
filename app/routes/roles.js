module.exports = function(app, user) {
	app.get('/todos', user.can(/*'see classes'*/'not see todos because it is under maintenance'), function (req, res) {
		res.render('todos');
	});
	app.get('/calendar', user.can('see classes'), function (req, res) {
		res.render('calendar');
	});
	app.get('/classes', user.can('see classes'), function (req, res) {
		res.render('student/classes');
	});
	app.get('/classes/enrolled', user.can('see classes'), function (req, res) {
		res.render('student/enrolled');
	});
	app.get('/classes/:classId', user.can('see classes'), function (req, res) {
		res.render('student/class');
	});
	app.get('/teacher', user.can('edit classes'), function (req, res) {
		res.render('teacher/teacher');
	});
	app.get('/teacher/classes', user.can('edit classes'), function (req, res) {
		res.render('teacher/classes');
	});
	app.get('/teacher/classes/:classId', user.can('edit classes'), function (req, res) {
		res.render('teacher/class');
	});
	app.get('/teacher/classes/:classId/students', user.can('edit classes'), function (req, res) {
		res.render('teacher/student-list');
	});
	app.get('/teacher/students', user.can('edit classes'), function (req, res) {
		res.render('teacher/students');
	});
	app.get('/admin', user.can('access admin page'), function (req, res) {
		res.render('admin/admin');
	});
	app.get('/admin/users', user.can('access admin page'), function (req, res) {
		res.render('admin/users');
	});
	app.get('/admin/classes', user.can('access admin page'), function (req, res) {
		res.render('admin/classes');
	});
}