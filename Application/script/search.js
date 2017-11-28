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

function infoAlert(email, reason){
    var message = "";
    message += "Approved by: " + email;
    message += "\n";
    message += "Reason: " + reason;
    alert(message);
}

function lockedAlert(email){
    var message = "";
    message += "This equivalency was established by another adviser!";
    message += "\n";
    message += "Please contact " + email + " to make changes";
    alert(message);
}

function createTable(equivalencies){
  var function_name = 'get_username';
  $.post('session.php', {function: function_name}, function(username) {
      var currentUser = username;
      var table = document.getElementById('tbodyID');
      // delete all existing rows before adding again
      while(table.rows.length > 0)
        table.deleteRow(0);

      // for every object in jsonArray, create row
      for (var i = 0; i<equivalencies.length; i++){
        var obj = equivalencies[i];

        var externalId = obj.id_external;
        var internalId = obj.id_internal;

        var row = table.insertRow(i);

        var externalSchool = row.insertCell(0);
        externalSchool.innerHTML = obj.school_external;

        var externalDept = row.insertCell(1);
        externalDept.innerHTML = obj.department_external;

        var externalCourseNum = row.insertCell(2);
        externalCourseNum.innerHTML = obj.number_external;

        // var internalSchool = row.insertCell(4);
        // internalSchool.innerHTML = obj.school_internal;
        var equivalency = row.insertCell(3);
        var icon_true = document.createElement('span');
        icon_true.setAttribute('class', 'glyphicon glyphicon-ok');
        var icon_false = document.createElement('span');
        icon_false.setAttribute('class', 'glyphicon glyphicon-remove');

        // add check if equivalent else X
        if (obj.is_equivalent == 1)
            equivalency.appendChild(icon_true);
        else
            equivalency.appendChild(icon_false);

        var internalDept = row.insertCell(4);
        internalDept.innerHTML = obj.department_internal;

        var internalCourseNum = row.insertCell(5);
        internalCourseNum.innerHTML = obj.number_internal;

        var advisorEmail = obj.email;

        if(advisorEmail.toUpperCase() == currentUser.toUpperCase()){
            var edit_option = row.insertCell(6);
            var editLink = document.createElement('a');
            var editLinkText = document.createTextNode('Edit');
            editLink.setAttribute('href', '#');
            editLink.setAttribute('type', 'submit');
            editLink.setAttribute('id', 'edit_equivalency_btn');
            editLink.setAttribute('onclick', `editEntry(${externalId}, ${internalId})`);
            editLink.appendChild(editLinkText);
            edit_option.appendChild(editLink);

            var remove_option = row.insertCell(7);
            var removeLink = document.createElement('a');
            var removeLinkText = document.createTextNode('Remove');
            removeLink.setAttribute('href', '#');
            removeLink.setAttribute('type', 'submit');
            removeLink.setAttribute('id', 'remove_equivalency_btn');
            removeLink.setAttribute('onclick', `removeEntry(${externalId}, ${internalId})`);
            removeLink.appendChild(removeLinkText);
            remove_option.appendChild(removeLink);
        }
        else{
            var edit_option = row.insertCell(6);
            var editLink = document.createElement('a');
            var editLinkText = document.createTextNode('Edit');
            editLink.setAttribute('onclick', `lockedAlert('${advisorEmail}')`);
            editLink.appendChild(editLinkText);
            edit_option.appendChild(editLink);

            var remove_option = row.insertCell(7);
            var removeLink = document.createElement('a');
            var removeLinkText = document.createTextNode('Remove');
            removeLink.setAttribute('onclick', `lockedAlert('${advisorEmail}')`);
            removeLink.appendChild(removeLinkText);
            remove_option.appendChild(removeLink);
        }

        var advisorReason = obj.reason;
        // console.log(obj.email);
        // console.log(obj.reason);

        var info_option = row.insertCell(8);
        var infoLink = document.createElement('a');
        var infoLinkText = document.createTextNode('Info');
        infoLink.setAttribute('onclick', `infoAlert('${advisorEmail}', '${advisorReason}')`);
        infoLink.appendChild(infoLinkText);
        info_option.appendChild(infoLink);
      }
    });
}

function editEntry(ext_id, int_id) {
	$.post('session.php', {function: 'set_equivalent', internal_id: int_id, external_id: ext_id}, function(data) {
		window.location.href = 'edit.html';
	});
}

function removeEntry(ext_id, int_id) {
	$.post('ajax.php', {function: 'remove_entry', internal_id: int_id, external_id: ext_id}, function(data) {
		if (data == 1) window.location.href = 'search.html';
		else if (data == 0) alert('Error deleting entry');
	});
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
			createTable(JSON.parse(data));
		});
	});
});
