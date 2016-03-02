var socketio = require('socket.io');

module.exports = function(app) {
	var io = socketio(app);
	var connectCounter = 0;
	io.on('connection', function(socket) {
		connectCounter++;
		
		// don't do this, see https://stackoverflow.com/questions/10275667/socket-io-connected-user-count
		// var connectionCount = io.sockets.sockets.length;
		io.emit('connection count', connectCounter);
		
		socket.on('connect message', function(msg) {
			io.emit('connect message', msg);
		});
		
		socket.on('nick register', function(nick) {
			io.emit('nick register', nick + ' joined');
		});		
		
		socket.on('disconnect', function() {
			connectCounter--;
			io.emit('connection count', connectCounter);
			io.emit('connect message', 'a user disconnected');
		});
		
		socket.on('chat message', function(/*user, */msg) {
			io.emit('chat message', /*user*/ 'user' + ": " + msg);
		});
		
	});
}