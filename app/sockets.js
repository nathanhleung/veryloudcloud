var socketio = require('socket.io');

module.exports = function(app) {
	var io = socketio(app);
	io.on('connection', function(socket) {
		
		var connectionCount = io.sockets.sockets.length;
		io.emit('connection count', connectionCount);
		
		socket.on('connect message', function(msg) {
			io.emit('connect message', msg);
		});
		
		socket.on('nick register', function(nick) {
			io.emit('nick register', nick + ' joined');
		});		
		
		socket.on('disconnect', function() {
			var connectionCount = io.sockets.sockets.length;
			io.emit('connection count', connectionCount);
			io.emit('connect message', 'a user disconnected');
		});
		
		socket.on('chat message', function(/*user, */msg) {
			io.emit('chat message', /*user*/ 'user' + ": " + msg);
		});
		
	});
}