var function_name = 'start_session';
$.post('session.php', {function: function_name}, function(data) {
});

var function_name = 'get_username';
$.post('session.php', {function: function_name}, function(data) {
		if (data == 'username - invalid') window.location.href = 'login.html';
});
