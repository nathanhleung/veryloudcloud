$(document).ready(function() {
	NProgress.start();
});
$(window).load(function() {
	NProgress.done();
});
// chatbox
var chatbox = $('#chatbox');
$('#chat-header').click(function() {
	if (chatbox.hasClass('open')) {
		chatbox.removeClass('open');
	} else {
		chatbox.addClass('open');
		$('#chats-container').scrollTop(1E10);
	}
	socket.emit('connect message', 'a user has joined');
});
// socket.io
var socket = io();
socket.on('connection count', function(count) {
	$('#online-count').html(count);
});
$('#chat-box-form').submit(function() {
	if ($('#chat-input').val()) {
		socket.emit('chat message', /* user, */ $('#chat-input').val());
		$('#chat-input').val('');
	}
	return false;
});
socket.on('chat message', function(msg) {
	$('#chats').append($('<li>').text(msg));
	// scroll to bottom after message is added
	$('#chats-container').scrollTop(1E10);
});
socket.on('connect message', function(msg) {
	$('#chats').append($('<li class="connect-msg">').text(msg));
	// scroll to bottom after message is added
	$('#chats-container').scrollTop(1E10);
});

var getSomeDays = function(start, numOfDays) {
	var thisWeek = [];
	var months = ['Jan', 'Feb', 'Mar', 'Apr',
							'May', 'Jun', 'Jul', 'Aug',
							'Sep', 'Oct', 'Nov', 'Dec']
	var days = ['Sun', 'Mon', 'Tue', 'Wed',
							'Thu', 'Fri', 'Sat']
	for (var i = start; i < (start + 1000 * 60 * 60 * 24 * numOfDays); i+=(1000 * 60 * 60 * 24)) {
		var iTime = new Date(i);
		var month = months[iTime.getMonth()];
		var dayOfWeek = days[iTime.getDay()];
		var day = iTime.getDate();
		var year = iTime.getFullYear();

		var dateString = dayOfWeek + ', ' + month + ' ' + day + ', ' + year;
		thisWeek.push(dateString);
	}
	return thisWeek;
}

var d = new Date;
var currentTime = d.getTime();

var dateHeaders4 = getSomeDays(currentTime, 4).map(function(item) {
	return "<th>" + item + "</th>";
});

$('#dateHeaders4').prepend('<tr>' + dateHeaders4 + '</tr>');

var dateHeaders = getSomeDays(currentTime, 7).map(function(item) {
	return "<th>" + item + "</th>";
});

dateHeaders.push('<th>Upcoming Assignments</th>');

$('#dateHeaders').prepend('<tr>' + dateHeaders + '</tr>');

$('#refresh').click(function() {
	$('.fa-refresh').addClass('fa-spin');
	setTimeout(function() {
		$('.fa-refresh').removeClass('fa-spin');
	}, 1000);
});

