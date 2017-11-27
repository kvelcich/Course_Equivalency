<?php
		function connect() {
				$string = file_get_contents("assets/config.json");
				$config_json = json_decode($string, true);

				ini_set('display_errors','On');
				error_reporting(E_ALL);

				$db_host =  $config_json['database_host'];
				$db_user = $config_json['database_user'];
				$db_pass = $config_json['database_password'];
				$db_name = $config_json['database_name'];

				$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name)
					or die("Error" . mysqli_error($conn));

				return $conn;
		}
?>
