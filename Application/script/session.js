$(document).ready(function(){
	$.post('session.php', {}, function(data) {
		console.log(data);
	});
});
