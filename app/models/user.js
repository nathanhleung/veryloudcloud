var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
//	id: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String,
	role: { type: String, default: 'student' }
}, {
	collection: 'users'
});

module.exports = mongoose.model('User', userSchema);