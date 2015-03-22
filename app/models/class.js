var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var classSchema = new Schema({
//	id: String,
	className: String,
	teacher: String,
	students: Array,
	assignments: Array,
	department: String
}, {
	collection: 'classes'
});

module.exports = mongoose.model('Class', classSchema);