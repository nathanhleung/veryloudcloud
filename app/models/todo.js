var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
	text: String,
	done: Boolean
}, {
	collection: 'todos'
});

var TodoListSchema = new Schema({
	user: String,
	todo: [TodoSchema]
}, {
	collection: 'todos'
});

var TodoList = mongoose.model('TodoList', TodoListSchema);

module.exports = TodoList;