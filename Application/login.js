$(document).ready(function(){
    $('#login_button').click(function(){
        var function_name = 'login';
        var email = $('input#email_input').val();
        var pass = $('input#pass_input').val();
        $.post('ajax.php', {function: function_name, email: email, password: pass}, function(data) {
            if (data == 1) {
            console.log('Login successful');
            window.location.href = 'search.html';
            } else if (data == 0) {
                console.log('Invalid login');
                alert('Invalid login info!');
            }
        });
    });
}