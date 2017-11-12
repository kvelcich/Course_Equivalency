$(document).ready(function(){

	$('#login_button').click(function() {
		var function_name = 'login';
		var email = $('input#email_input').val();
		var pass = $('input#pass_input').val();

		$.post('ajax.php', {function: function_name, email: email, password: pass}, function(data) {
			if (data == 1) {
				console.log('Login successful');
      		window.location.href = 'search.html';
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
