var User = require('../models/user');

module.exports = function(app) {
	app.get('/api/users/me', function(req, res) {
		if (req.user) {
			User.find({
				username : req.user.username
			}, function(err, todos) {
				if (err) {
					res.send(err);
				}
				res.json(todos);
			});
		} else {
			res.status('403');
			res.render('403');
		}
	});
};