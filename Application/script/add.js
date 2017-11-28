//validate empty textbox
function validateTextBox(val1,val2,val3,val4,val5,val6) {
  if (val1== "" || val2=="" || val3=="" || val4=="" || val5=="" || val6==""){
    alert("Incomplete Information!");
    return false;
  }
  return true;
}

$(document).ready(function(){
	$(function() {
		//autocomplete textboxes
		$("#school_external").autocomplete({
			source:'searchschool.php',
			minLength: 1
		});
		$("#dep_external").autocomplete({
			source:'searchdep.php',
			minLength: 1
		});
		$("#dep_internal").autocomplete({
		  source:'searchdep.php',
		  minLength: 1
		});
	});

  	//onclick button function
	$('#add_button').click(function() {
		var function_name = 'add_entry';
		var dep_internal = $('input#dep_internal').val();
		var num_internal = $('input#num_internal').val();
		var school_external = $('input#school_external').val();
		var dep_external = $('input#dep_external').val();
		var num_external = $('input#num_external').val();
		var equiv = $('select[id="equivalency"] option:selected').text();
		var reason = $('input#reason').val();

    //validate empty textboxes
		var valid = validateTextBox(dep_internal,num_internal,school_external,dep_external,num_external,reason);
		if (valid == true){
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
  		}
	});
});
