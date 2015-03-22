var Todo = require('../models/todo');

module.exports = function(app) {
	// todo api
	// todo ui
	app.get('/todos', function(req, res) {
		res.render('todos');
	});
	
	/*
	// get all todos
	app.get('/api/todos', function(req, res) {
		Todo.find(function(err, todos) {
			if (err) {
				res.send(err);
			}
			res.json(todos);
		});
	});
	*/
	
	// get all todos by a user
	app.get('/api/todos/:user', function(req, res) {
		Todo.find({
			user : req.params.user
		},function(err, todos) {
			if (err) {
				res.send(err);
			}
			res.json(todos);
		});
	});

	// create todo and send back all
	app.post('/api/todos', function(req, res) {
		console.log(req.body);
		Todo.create({
			user : req.body.username,
			todo : [{
				text: req.body.text,
				done: false
				}]
		}, function(err, todo) {
			if (err) {
				res.send(err);
			}
			
			Todo.find(function(err, todos) {
				if (err) {
					res.send(err)
				}
				res.json(todos);
			});
		});
	});
	
	// delete all todos by user, then show all
	app.delete('/api/todos/:user/all', function(req, res) {
		Todo.remove({
			user : req.params.user
		}, function(err, todo) {
			if (err) {
				res.send(err);
			}
			Todo.find(function(err,todos) {
				if(err) {
					res.send(err);
				}
				res.json(todos);
			});
		});
	});
	// delete a todo, then show all
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err) {
				res.send(err);
			}
			Todo.find(function(err,todos) {
				if(err) {
					res.send(err);
				}
				res.json(todos);
			});
		});
	});
}