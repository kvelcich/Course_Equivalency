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
				console.log('Invalid login');
        alert('Invalid Login Info!');
			}
		});
  });

/*
	$('select[id="school_select"]').change(function() {
		var function_name = 'get_departments';
		var school_name = $('select[id="school_select"] option:selected').text();

		$.post('ajax.php', {function: function_name, school: school_name}, function(data) {
			listDepartments(JSON.parse(data));
		});
	});
*/
/*
	$('select[id="department_select"]').change(function() {
		var function_name = 'get_schools';
		var department_name = $('select[id="department_select"] option:selected').text();

		$.post('ajax.php', {function: function_name, department: department_name}, function(data) {
			listSchools(JSON.parse(data));
		});
	});
*/

	$('#search').click(function() {
		var function_name = 'search';
		var school_name = $('select[id="school_select"] option:selected').text();
		var department_name = $('select[id="department_select"] option:selected').text();
		var course_number = $('input#number_select').val();

		$.post('ajax.php', {function: function_name, school: school_name, department: department_name, number: course_number}, function(data) {
			$('div#advdiv').append(data);
		});
	});

	$('#add_button').click(function() {
		// Check if all entries filled out
		console.log("ENTERING ADD");
		var function_name = 'add_entry';
		var dep_internal = $('input#dep_internal').val();
		var num_internal = $('input#num_internal').val();
		var school_external = $('input#school_external').val();
		var dep_external = $('input#dep_external').val();
		var num_external = $('input#num_external').val();
		var equiv = $('select[id="equivalency"] option:selected').text();

		$.post('ajax.php', {
			function: function_name,
			school_external: school_external,
			department_external: dep_external,
			number_external: num_external,
			department_internal: dep_internal,
			number_internal: num_internal,
			equivalent: equiv
		}, function(data) {
			console.log("ADDED");
			$('div#nice').append(data);
			if (data < 0) console.log("Error adding: " + data);
			else if (data == 1) console.log("Added entry successfully");
		});
	});
});
