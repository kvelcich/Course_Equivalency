$(document).ready(function(){
	$('#login_button').click(function(){
		var function_name = 'login';
		var email = $('input#email_input').val();
		var pass = $('input#pass_input').val();

		$.post('ajax.php', {function: function_name, email: email, password: pass}, function(data) {
			if (data == 1) {
				console.log('Login successful');
			} else if (data == 0) {
				console.log('Invalid login');
			}
		});
    });

	

/* OUTDATED:
	$('#name-submit').click(function(){
		var function_name = 'get_schools';
		var department_name = '';
		$.post('ajax.php', {function: function_name, department: department_name}, function(data) {
			$('div#schools').append(data);
			//console.log(JSON.parse(data).length);
		});
    });

	$('#department').click(function(){
		var function_name = 'get_departments';
		var school_name = 'San Jose State Univeristy';
		$.post('ajax.php', {function: function_name, school: school_name}, function(data) {
			$('div#departments').append(data);
		});
	});

	$('#advisor').click(function() {
		var function_name = 'add_user';
		var email = 'hunter@gmail.com';
		var pass = 'sample';
		$.post('ajax.php', {function: function_name, email: email, password: pass}, function(data) {
				if (data == 1) {
					$('div#advdiv').append('Success');
				} else if (data == 0) {
					$('div#advdiv').append('Error, username already in use');
				}
		});
	});
*/
});
