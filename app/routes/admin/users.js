var User = require('../../models/user');
var bCrypt = require('bcrypt-nodejs');

var createHash = function(password) {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

var isUsernameAvailable = function(username) {
	User.findOne({username: username}, function (err, user) {
		if (err) {
			console.log('Error during registration: ' + err);
			return false;
		}
		if (user) {
			console.log('User already exists');
			return false;
		}
	});
	return true;
};

module.exports = function(app) {
	// admin API
	// get all users
	app.get('/api/users', function(req, res) {
		User.find(function(err, users) {
			if (err) {
				res.send(err);
			}
			res.json(users);
		});
	});
	app.post('/api/users', function(req, res) {
		if (isUsernameAvailable(req.body.username)) {
			User.create({
				username : req.body.username,
				password : createHash(req.body.password),
				email : req.body.email,
				firstName : req.body.firstName,
				lastName : req.body.lastName,
				role : req.body.role
			}, function(err, user) {
				if (err) {
					res.send(err);
				}
				
				User.find(function(err, users) {
					if (err) {
						res.send(err)
					}
					res.json(users);
				});
			});
		}
	});
	
		// create user and send back all
		/* not working yet
	app.put('/api/users/:user_id', function(req, res) {
		User.update(
		{username : req.body.username},
			password: req.body.password,
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			role: req.body.role
		}, function(err, user) {
			if (err) {
				res.send(err);
			}
			
			User.find(function(err, users) {
				if (err) {
					res.send(err)
				}
				res.json(users);
			});
		});
	});
	*/
	
	// delete a user, then show all
	app.delete('/api/users/:user_id', function(req, res) {
		User.remove({
			_id : req.params.user_id
		}, function(err, user) {
			if (err) {
				res.send(err);
			}
			User.find(function(err,users) {
				if(err) {
					res.send(err);
				}
				res.json(users);
			});
		});
	});
};