var int_id;
var ext_id;
function populateInputs(equivalencyData){
    var obj = equivalencyData;
    var is_equivalent = 'No';
    var other_option = 'Yes';
    if (obj.is_equivalent == 1) {
        is_equivalent = 'Yes';
        other_option = 'No';
    }

    document.getElementById('school_external').value = obj.school_external;
    document.getElementById('department_external').value = obj.department_external;
    document.getElementById('number_external').value = obj.number_external;
    document.getElementById('department_internal').value = obj.department_internal;
    document.getElementById('number_internal').value = obj.number_internal;

    var select = document.getElementById('isEquivalentSelect');
    var option = document.createElement("option");
    option.text = is_equivalent;
    option.setAttribute('selected', 'selected');
    select.appendChild(option);

    var option2 = document.createElement('option');
    option2.text = other_option;
    select.appendChild(option2);
}

$(document).ready(function(){
	$.post('session.php', {function: 'get_equivalent_internal'}, function(data1) {
		int_id = data1;
		$.post('session.php', {function: 'get_equivalent_external'}, function(data2) {
			ext_id = data2;
			$.post('ajax.php', {function: 'get_edit_entry', internal_id: int_id, external_id: ext_id}, function(data_final) {
				populateInputs(JSON.parse(data_final));
			});
		});
	});

	$('#edit_button').click(function() {
		//Check all entries entered
		var function_name = 'edit_entry';
		var school_external = $('input#school_external').val();
		var dep_external = $('input#department_external').val();
		var num_external = $('input#number_external').val();
		var dep_internal = $('input#department_internal').val();
		var num_internal = $('input#number_internal').val();
		var equiv = $('select[id="isEquivalentSelect"] option:selected').text();

		$.post('ajax.php', {
			function: function_name,
			internal_id: int_id,
			external_id: ext_id,
			school_external: school_external,
			department_external: dep_external,
			number_external: num_external,
			department_internal: dep_internal,
			number_internal: num_internal,
			equivalent: equiv
		}, function(data) {
			console.log(data);
		});
	});
});
