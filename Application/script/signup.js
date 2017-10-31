$(document).ready(function(){
    $('#signup_button').click(function(){
        var function_name = 'add_user';
        var email = $('input#email_input').val();
        var pass = $('input#pass_input').val();

        $.post('ajax.php', {function: function_name, email: email, password: pass}, function(success) {
            if (success == 1) {
               console.log('signup successful');
               window.location.href = "login.html";
            } else if (success== 0) {
               console.log('Invalid signup');
               alert('Invalid signup!');
           }
        });
    });
});
