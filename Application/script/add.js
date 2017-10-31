$(document).ready(function(){
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
