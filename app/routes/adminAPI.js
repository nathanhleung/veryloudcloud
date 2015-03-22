module.exports = function(app) {
	var userRoutes = require('./admin/users.js')(app);
	var classRoutes = require('./admin/classes.js')(app);
};