$(document).ready(function(){
	// Load universities at load
	$.post('ajax.php', {function: 'get_schools', department: ''}, function(data) {
		listSchools(JSON.parse(data));
	});

	// Load departments at load
	$.post('ajax.php', {function: 'get_departments', school: ''}, function(data) {
		listDepartments(JSON.parse(data));
	});
});
