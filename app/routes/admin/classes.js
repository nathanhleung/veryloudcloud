var Class = require('../../models/class');
// this is inconvenient sometimes because 'class' is a reserved word.

module.exports = function(app) {
	// admin API
	// get all classes
	app.get('/api/classes', function(req, res) {
		Class.find(function(err, classes) {
			if (err) {
				res.send(err);
			}
			res.json(classes);
		});
	});
	app.post('/api/classes', function(req, res) {
		Class.create({
			className : req.body.className,
			teacher : req.body.teacher,
			students : [],
			department : req.body.department,
		}, function(err, newClass) {
			if (err) {
				res.send(err);
			}
			
			Class.find(function(err, classes) {
				if (err) {
					res.send(err)
				}
				res.json(classes);
			});
		});
	});
	
		// create class and send back all
		/* not working yet
	app.put('/api/classs/:class_id', function(req, res) {
		Class.update(
		{className : req.body.className},
			password: req.body.password,
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			role: req.body.role
		}, function(err, class) {
			if (err) {
				res.send(err);
			}
			
			Class.find(function(err, classs) {
				if (err) {
					res.send(err)
				}
				res.json(classs);
			});
		});
	});
	*/
	
	// delete a class, then show all
	app.delete('/api/classes/:class_id', function(req, res) {
		Class.remove({
			_id : req.params.class_id
		}, function(err, delClass) {
			if (err) {
				res.send(err);
			}
			Class.find(function(err,classes) {
				if(err) {
					res.send(err);
				}
				res.json(classes);
			});
		});
	});
};