$(document).ready(function(){
	$(function() {
		//autocomplete filled out textboxes
		$("#school_external").autocomplete({
			source:'searchschool.php',
			minLength: 1
		});
		$("#dep_external").autocomplete({
			source:'searchdep.php',
			minLength: 1
		});
	});
	$('#add_button').click(function() {
		/*$('#dep_internal').prop('required',true);
		$('#num_internal').prop('required',true);
		$('#school_external').prop('required',true);
		$('#dep_external').prop('required',true);
		$('#num_external').prop('required',true);
		$('#reason').prop('required',true);
		// Check if all entries filled out
		var function_name = 'add_entry';
		var dep_internal = $('input#dep_internal').val();
		var num_internal = $('input#num_internal').val();
		var school_external = $('input#school_external').val();
		var dep_external = $('input#dep_external').val();
		var num_external = $('input#num_external').val();
		var equiv = $('select[id="equivalency"] option:selected').text();
		var reason = $('input#reason').val();
*/
		var function_name = 'add_entry';
		var dep_internal = document.getElementById("dep_internal");
		var num_internal = document.getElementById("num_internal");
		var school_external = document.getElementById("school_external");
		var dep_external = document.getElementById("dep_external");
		var num_external = document.getElementById("num_external");
		var equiv = $('select[id="equivalency"] option:selected').text();
		var reason = document.getElementById("reason");
		$.post('session.php', {function: 'get_username'}, function(username) {
				$.post('ajax.php', {
						function: function_name,
						school_external: school_external,
						department_external: dep_external,
						number_external: num_external,
						department_internal: dep_internal,
						number_internal: num_internal,
						equivalent: equiv,
						reason: reason,
						username: username
				}, function(data) {
						if (data < 0) alert('Error Adding Equivalency!\nPlease check equivalency does not already exist');
						else if (data == 1) window.location.href = 'search.html';
				});
		});
	});
});
