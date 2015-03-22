module.exports = function(app, passport) {
	// login handlers
	app.get('/login', function(req, res) {
		res.render('auth/login', { message: req.flash('message') });
	});
	
	app.post('/login',
		passport.authenticate('login', {
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash : true
		})
	);
	
	app.get('/register', function(req, res) {
		res.render('auth/register', {message: req.flash('message')});
	});
	app.post('/register', passport.authenticate('signup', {
		successRedirect: '/register-confirm',
		failureRedirect: '/register',
		failureFlash: true
	}));
	app.get('/register-confirm', function(req, res) {
		res.render('auth/register-confirm');
	});
	app.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
}