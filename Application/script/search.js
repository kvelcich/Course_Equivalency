function listSchools(schools){
  var select = document.getElementById('school_select');

  for (var i = 0; i<schools.length; i++){
	var obj = schools[i];

	var option = document.createElement("option");
	option.text = obj.school;
	option.value = i;

	select.appendChild(option);
  }
}

function listDepartments(departments){
  var select = document.getElementById('department_select');

  for (var i = 0; i<departments.length; i++){
	var obj = departments[i];
	var option = document.createElement("option");

	option.text = obj.department;
	option.value = i;

	select.appendChild(option);
  }
}

$(document).ready(function(){

	// Load universities at load
	$.post('ajax.php', {function: 'get_schools', department: ''}, function(data) {
		listSchools(JSON.parse(data));
	});

	// Load departments at load
	$.post('ajax.php', {function: 'get_departments', school: ''}, function(data) {
		listDepartments(JSON.parse(data));
	});

/*	$('select[id="school_select"]').change(function() {
		var function_name = 'get_departments';
		var school_name = $('select[id="school_select"] option:selected').text();

		$.post('ajax.php', {function: function_name, school: school_name}, function(data) {
			listDepartments(JSON.parse(data));
		});
	}); */

/*	$('select[id="department_select"]').change(function() {
		var function_name = 'get_schools';
		var department_name = $('select[id="department_select"] option:selected').text();

		$.post('ajax.php', {function: function_name, department: department_name}, function(data) {
			listSchools(JSON.parse(data));
		});
	}); */

	$('#search').click(function() {
		var function_name = 'search';
		var school_name = $('select[id="school_select"] option:selected').text();
		var department_name = $('select[id="department_select"] option:selected').text();
		var course_number = $('input#number_select').val();

		$.post('ajax.php', {function: function_name, school: school_name, department: department_name, number: course_number}, function(data) {
			console.log(data);
		});
	});
});
