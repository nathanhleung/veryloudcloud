var isAuthenticatedHome = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.render('auth/unauth-home.jade');
}

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

module.exports = function(app, passport, ConnectRoles) {
	app.get('/', isAuthenticatedHome, function(req, res) {
		res.render('index', { user: req.user });
	});
	
	app.get('/account', isAuthenticated, function(req, res) {
		res.render('account', { user: req.user });
	});
	
	require('../../config/roles')(app, ConnectRoles);
	require('./auth')(app, passport);
	require('./todoAPI')(app);
	require('./userAPI')(app);
	require('./adminAPI')(app);
	require('./teacherAPI')(app);
	require('./studentAPI')(app);
};