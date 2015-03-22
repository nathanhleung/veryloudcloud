module.exports = function(app, ConnectRoles) {
	var user = new ConnectRoles({
		failureHandler: function (req, res, action) {
			res.status(403);
			res.render('403')
		}
	});
	app.use(user.middleware());
	
	user.use(function (req) {
		if (!req.user) {
			return false;
		}
	});
	
	user.use('see classes', function (req) {
		if (req.user.role === 'student') {
			return true;
		}
	});
	
	user.use('edit classes', function (req) {
		if (req.user.role === 'teacher') {
			return true;
		}
	});
	
	user.use(function (req) {
		if (req.user.role === 'administrator') {
			return true;
		}
	});
	
	require('../app/routes/roles')(app, user);
};