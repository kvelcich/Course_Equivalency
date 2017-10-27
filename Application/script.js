$(document).ready(function(){
    $('#name-submit').click(function(){
		var name = $('input#name').val();
		var funct = 'first';
		$.post('ajax.php', {function: funct, name: name}, function(data) {
			$('div#name-data').append(data);
		});
    });
});
