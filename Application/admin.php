<?php
    $string = file_get_contents("assets/admin.json");
    $admin_json = json_decode($string, true);
    $value =  $admin_json['admin'];
    echo $value;
?>
