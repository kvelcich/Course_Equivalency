$(document).ready(function(){
    $('div.logout').click(function(){
        var function_name = 'logout';

        $.post('session.php', {function: function_name}, function(data) {
            window.location.href = 'login.html';
        });
    });
});
