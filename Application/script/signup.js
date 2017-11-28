function admin(){
  var admin = prompt("Admin Pin:","");
  if (admin == "admin"){
    var function_name = 'start_session';
    $.post('session.php', {function: function_name}, function(data) {
    });
  }
  else{
    alert("Invalid Admin Pin!");
    window.location.href = "login.html";
  }
}
admin();
$(document).ready(function(){
    $('#signup_button').click(function(){
        var function_name = 'add_user';
        var email = $('input#email_input').val();
        var pass = $('input#pass_input').val();

        $.post('ajax.php', {function: function_name, email: email, password: pass}, function(success) {
          console.log(success);
            if (success == 1 && email != 'username - invalid') {
               console.log('signup successful');
               window.location.href = "login.html";
            } else if (success== 0) {
               console.log('Invalid signup');
               alert('Invalid signup!');
           }
        });
    });
});
