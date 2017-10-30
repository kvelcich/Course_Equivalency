$(document).ready(function(){
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
});
