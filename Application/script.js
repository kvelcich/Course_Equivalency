$(document).ready(function(){
    $('#name-submit').click(function(){
		var function_name = 'get_schools';
		$.post('ajax.php', {function: function_name}, function(data) {
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

	$('#number').click(function(){
		var function_name = 'get_course_numbers';
		var school_name = 'San Jose State Univeristy';
		var department_name = 'CSE';
		$.post('ajax.php', {function: function_name, school: school_name, department: department_name}, function(data) {
			$('div#numbers').append(data);
		});
	});
});
