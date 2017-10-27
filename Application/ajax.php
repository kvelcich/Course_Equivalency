<?php
	if (isset($_POST['function'])) {
		if ($_POST['function'] == 'first') {
			return selectSchools();
		} else {
			echo 'error';
		}
	}

	function selectSchools() {
		require'database.php';

		$conn = connect();

		$query = "select distinct school from course";

		$result = $conn->query($query);

		while($row = mysqli_fetch_assoc($result)) {
				echo $row['school'] . "<br>\n";
		}
	}
?>
