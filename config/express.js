// not working yet
/*
var express = require('express');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var jade = require('jade');
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('connect-flash');

module.exports = function() {
	var app = express();
	var server = http.createServer(app);

	var port = process.env.PORT || 8080;

	app.use(express.static(__dirname + '/public'));
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({'extended':'true'}));
	app.use(bodyParser.json());
	app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
	app.use(methodOverride('X-HTTP-Method-Override'));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());

	require('../app/routes')(app, passport);
	
	// setup templating
	app.set('view engine', 'jade');
	var jade = require('jade');

	// Set views dir
	app.set('views', __dirname + '/app/views');
	// during development, we want jade to output pretty html
	if (app.get('env') === 'development') {
		app.locals.pretty = true;
	}
	// 404 error
	app.use(function(req, res, next) {
		res.status(404);
		res.render('404.jade');
	});
}
*/