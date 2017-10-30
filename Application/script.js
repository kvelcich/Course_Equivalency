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

	$('select[id="school_select"]').change(function() {
		var function_name = 'get_departments';
		var school_name = $('select[id="schoolSelect"] option:selected').text();

		$.post('ajax.php', {function: function_name, school: school_name}, function(data) {
			listDepartments(JSON.parse(data));
		});
	});

	$('select[id="department_select"]').change(function() {
		var function_name = 'get_schools';
		var department_name = $('select[id="departmentSelect"] option:selected').text();

		$.post('ajax.php', {function: function_name, school: school_name}, function(data) {
			listSchools(JSON.parse(data));
		});
	});
});
