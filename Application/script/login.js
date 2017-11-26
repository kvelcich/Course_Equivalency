var function_name = 'start_session';
$.post('session.php', {function: function_name}, function(data) {
});
var function_name = 'get_username';
$.post('session.php', {function: function_name}, function(username) {
		if (username != 'username - invalid') window.location.href = 'search.html';
});

$(document).ready(function(){
		$('#login_button').click(function() {
				var function_name = 'login';
				var email = $('input#email_input').val();
				var pass = $('input#pass_input').val();

				$.post('ajax.php', {function: function_name, email: email, password: pass}, function(data) {
						if (data == 1) {
								console.log('Login successful');
								signin(data);
						} else if (data == 0) {
        				var el = $('.invalid-div');
        				var newel = el.clone(true);
        				el.before(newel);
        				$(".invalid-div:last").remove();
        				$('#invalid-credentials').html('<i class="fa fa-exclamation-circle" aria-hidden="true"></i> Invalid Credentials!');
						}
				});
		});

		$('#signup_button').click(function() {
				$('.second').addClass("animated fadeOut");
				setTimeout(function(){
						window.location.href = 'signup.html';
				}, 200);
		});
});


function signin(data){
		var user = $('input#email_input').val();
		$.post('session.php', {function: 'set_username', username: user}, function(data) {
				window.location.href = 'search.html';
		});
}
