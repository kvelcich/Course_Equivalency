<?php
	function connect() {
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
