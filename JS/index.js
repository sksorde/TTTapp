var socket = io();
$('#send-message-btn').click(function(){
	var msg = $('#message-box').val();
	socket.emit('chat', msg);
	$('#messages').append($('<p>').text(msg));
	$('#message-box').val('');
	return fase;
});
socket.on('chat', function(msg){
	$('#messages').append($('<p>.text(msg)'));
});
