var Class = require('../models/class');
// this is inconvenient sometimes because 'class' is a reserved word.

module.exports = function(app) {
	// student
	app.get('/api/classes/all/:user', function(req, res) {
		Class.find({
			students : { $in: [req.params.user] }
		}, function(err, classes) {
			if (err) {
				res.send(err);
			}
			res.json(classes);
		});
	});
	app.get('/api/classes/:classId', function(req, res) {
		Class.find({
			_id : req.params.classId
		}, function(err, classData) {
			if (err) {
				res.send(err);
			}
			res.json(classData);
		});
	});
	// join a class
	app.post('/api/classes/:classId/:user', function(req, res) {
		Class.findById(req.params.classId, function(err, joinedClass)  {
			if (err) res.send(err);
			joinedClass.students.push(req.params.user);
			joinedClass.save(function (err) {
				if (err) res.send(err);
			});
		});
		Class.find(function(err, classes) {
			if (err) {
				res.send(err)
			}
			res.json(classes);
		});
	});
	
	// leave a class
	app.delete('/api/classes/:classId/:user', function(req, res) {
		Class.findById(req.params.classId, function(err, leftClass)  {
			if (err) res.send(err);
			var index = leftClass.students.indexOf(req.params.user);
			leftClass.students.splice(index, 1);
			leftClass.save(function (err) {
				if (err) res.send(err);
			});
		});
		Class.find(function(err, classes) {
			if (err) {
				res.send(err)
			}
			res.json(classes);
		});
	});
};