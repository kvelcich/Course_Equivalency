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
/*
$query = "select distinct school from course";

$result = $conn->query($query);

while($row = mysqli_fetch_assoc($result)) {
		echo $row['school'] . "<br>\n";
}
*/
?>
