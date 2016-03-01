// setup server
var express = require('express');
var http = require('http');
var app = express();
// Express config can be done later
// var app = require('./config/express');
var server = http.createServer(app);

var port = process.env.PORT || 8080;

// setup db
var mongoose = require('mongoose');
var database = require('./config/database');

// setup auth and sessions
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('connect-flash');
var ConnectRoles = require('connect-roles');

// setup express
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// setup templating
app.set('view engine', 'jade');
var jade = require('jade');

// config
var db = mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));

// config auth
var passportConfig = require('./config/passport')(passport);
app.use(expressSession({
	secret: 'secretKey',
	saveUninitialized: true,
	resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routing
require('./app/routes/index')(app, passport, ConnectRoles);

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

// sockets
require('./app/sockets')(server); // this has to be server var (unlike routes) because routes are express (so var app), but io doesn't support that.

// listen (start node server)
server.listen(port);
console.log("Check out port " + port + "!");
