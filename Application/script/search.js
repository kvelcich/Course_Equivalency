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

function listEquivalencies(){
  var list = document.getElementById('results');

    // for every object in jsonArray, create list element with details
  for (var i = 0; i<equivalencies.length; i++){
    var obj = equivalencies[i];

    // creat list <li> element
    var listItem = document.createElement('LI');

    // set external attributes attributes
    var externalSchool = document.createTextNode(obj.school_external);
    var externalDept = document.createTextNode(obj.department_external);
    var externalCourseNum = document.createTextNode(obj.number_external);

    var internalSchool = document.createTextNode(obj.school_internal);
    var internalDept = document.createTextNode(obj.department_internal);
    var internalCourseNum = document.createTextNode(obj.number_internal);

    var externalId = obj.id_external;
    var internalId = obj.id_internal;

    // list the course equivalencies including:
    // school name, department, and course number
    listItem.appendChild(externalSchool);
    listItem.appendChild(document.createTextNode(' '));
    listItem.appendChild(externalDept);
    listItem.appendChild(document.createTextNode(' - '));
    listItem.appendChild(externalCourseNum);
    listItem.appendChild(document.createTextNode(' | '));

    // if equivalent coourse, print "Equivalent"
    if (obj.is_equivalent == 1){
        console.log('course equivalent');
        listItem.appendChild(document.createTextNode('Equivalent'));
    }
    // else print "Not Equivalent"
    else{
        console.log('course not equivalent');
        listItem.appendChild(document.createTextNode('Not Equivalent'));
    }

    listItem.appendChild(document.createTextNode(' | '));

    listItem.appendChild(internalSchool);
    listItem.appendChild(document.createTextNode(' '));
    listItem.appendChild(internalDept);
    listItem.appendChild(document.createTextNode(' - '));
    listItem.appendChild(internalCourseNum);
    listItem.appendChild(document.createTextNode(' | '));

    // create edit link with proper attributes
    var editLink = document.createElement('a');
    var editLinkText = document.createTextNode('Edit');
    editLink.setAttribute('href', 'edit.html');
    editLink.setAttribute('type', 'submit');
    editLink.setAttribute('id', 'edit_equivalency_btn');
    editLink.setAttribute('onclick', `setCourseIds(${externalId}, ${internalId})`);
    editLink.appendChild(editLinkText);

    // append Edit link to list item
    listItem.appendChild(editLink);
    // separator betweeen edit and remove options
    listItem.appendChild(document.createTextNode(' | '));

    // create remove link with proper attributes
    var removeLink = document.createElement('a');
    var removeLinkText = document.createTextNode('Remove');
    removeLink.setAttribute('href', 'remove.html');
    removeLink.setAttribute('type', 'submit');
    removeLink.setAttribute('id', 'remove_equivalency_btn');
    removeLink.setAttribute('onclick', `setCourseIds(${externalId}, ${internalId})`);
    removeLink.appendChild(removeLinkText);

    // append Remove link to list item
    listItem.appendChild(removeLink);

    // append list item
    list.appendChild(listItem);
  }
}

// get ids of list item to be edited or removed
function setCourseIds(ext_id, int_id){

  console.log(ext_id);
  console.log(int_id);

    // set to session global vars
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
