var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignmentSchema = new Schema({
	classId: String,
	name: String,
	dueDate: String,
	link: String,
	/* file: */
	description: String
}, {
	collection: 'assignments'
});

module.exports = mongoose.model('Assignment', assignmentSchema);