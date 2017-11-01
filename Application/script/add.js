$(document).ready(function(){
	$(function() {
		//autocomplete filled out textboxes
		$("#school_external").autocomplete({
			source:'searchschool.php',
			minLength:1
		});
		$("#dep_external").autocomplete({
			source:'searchdep.php',
			minLength:1
		});
	});

	$('#add_button').click(function() {
		// Check if all entries filled out
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
			if (data < 0) alert('Error adding entry');
			else if (data == 1) window.location.href = 'search.html';
		});
	});
});
