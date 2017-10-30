<?php

    include('../ajax.php')
    session_start();

    // define username and password, might not need this
    $username=$_POST['username'];
    $password=$_POST['password'];

    // connect to db

    // if valid connection (?)
    if (login() == 1) {
        $_SESSION['login_user']=$username;

        header("location: search.html"); // redirect to home page
    }
    else {
        $error = "Username or Password is invalid";
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <Title>Login</title>
    </head>
    <body>
        <h1>SCU Course Equivalency</h1>

        <div class = "login">
            <h3>Log in<h3>

            <form method = "post">
                <input type="text" name="email" placeholder="email" required>
                <br></br>
                <input type="password" name="password" placeholder="password" required>
                <br></br>
                <input type="submit" name="submit" value="Login" href=""></input>

                <!-- error message displays here if credentials are invalid -->
                <div class="error-message"><?php if(isset($error)) { echo $error; } ?></div>
            </form>
        </div>
    </body>
</html>
