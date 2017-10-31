$(document).ready(function(){
	var function_name = 'start_session';
	$.post('session.php', {function: function_name}, function(data) {
	});
});
