var Class = require('../models/class');
var Assignment = require('../models/assignment');
// this is inconvenient sometimes because 'class' is a reserved word.

module.exports = function(app) {
	
	app.get('/api/classes/teacher/:teacher', function(req, res) {
		Class.find({
			teacher : { $in: [req.params.teacher] }
		}, function(err, classes) {
			if (err) {
				res.send(err);
			}
			res.json(classes);
		});
	});
	
	// delete a class, then show all
	app.delete('/api/classes/:classId/:user', function(req, res) {
		Class.findById(req.params.classId, function(err, leftClass)  {
			if (err) {
				res.send(err);
			}
			var index = leftClass.students.indexOf(req.params.user);
			leftClass.students.splice(index, 1);
			leftClass.save(function (err) {
				if (err) {
					res.send(err);
				}
			});
		});
		Class.find(function(err, classes) {
			if (err) {
				res.send(err)
			}
			res.json(classes);
		});
	});
	// assignment api
	// get assignments - at the moment it just shows classes
	app.get('/api/classes/:classId/assignments', function(req, res) {
		Assignment.find({
				classId : { $in: [req.params.classId] }
			}, function(err, assignments) {
				if (err) {
					res.send(err);
				}
				res.json(assignments);
			});
	});
	// add assignment
	app.post('/api/classes/:classId/assignments', function(req, res) {
		Assignment.create({
			classId: req.params.classId,
			name: req.body.assignmentName,
			dueDate: req.body.dueDate,
			link: req.body.fileLink,
			description: req.body.description
			/* file: */
		}, function(err, newAssignment) {
			if (err) {
				res.send(err);
			}
			Assignment.find({
				classId : { $in: [req.params.classId] }
			}, function(err, assignments) {
				if (err) {
					res.send(err);
				}
				res.json(assignments);
			});
		});
	});
	
	// delete assignment
	app.delete('/api/classes/:classId/assignments/:assignmentId', function(req, res) {
		Assignment.remove({
			_id : req.params.assignmentId
		}, function(err, removedAssignment) {
			if (err) {
				res.send(err);
			}
			Assignment.find({
				classId : { $in: [req.params.classId] }
			}, function(err, assignments) {
				if (err) {
					res.send(err);
				}
				res.json(assignments);
			});
		});
	});

};