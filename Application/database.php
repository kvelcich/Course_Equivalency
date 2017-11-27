<?php
		function connect() {
				$string = file_get_contents("assets/config.json");
				$config_json = json_decode($string, true);

echo $json_a['John'][status];
echo $json_a['Jennifer'][status];
		ini_set('display_errors','On');
		error_reporting(E_ALL);

		$db_host = "dbserver.engr.scu.edu";
		$db_user = "kvelcich";
		$db_pass = "00001106223";
		$db_name = "sdb_kvelcich";

		$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name)
				or die("Error" . mysqli_error($conn));

		return $conn;
	}
?>
