<?php
	require'database.php';

	if (isset($_POST['function'])) {
		if ($_POST['function'] == 'get_schools') {
			return getSchools();
		} else if ($_POST['function'] == 'get_departments') {
			return getDepartments();
		} else if ($_POST['function'] == 'get_course_numbers') {
			return getCourseNumbers();
		}else {
			echo "Error: Invalid function name '{$_POST['function']}'";
		}
	}

	function getSchools() {
		$conn = connect();

		$query = "SELECT DISTINCT school FROM course WHERE school != 'Santa Clara University'";
		$result = $conn->query($query);

		$rows = array();
		while($row = mysqli_fetch_assoc($result)) {
				$rows[] = $row;
		}

		print json_encode($rows);
	}

	function getDepartments() {
		$conn = connect();
		$query = "SELECT DISTINCT department FROM course WHERE school = '{$_POST['school']}'";
		$result = $conn->query($query);

		$rows = array();
		while($row = mysqli_fetch_assoc($result)) {
				$rows[] = $row;
		}

		print json_encode($rows);
	}

	function getCourseNumbers() {
		$conn = connect();
		$query = "SELECT DISTINCT course_number FROM course WHERE school = '{$_POST['school']}' AND department = '{$_POST['department']}'";
		$result = $conn->query($query);

		$rows = array();
		while($row = mysqli_fetch_assoc($result)) {
				$rows[] = $row;
		}

		print json_encode($rows);
	}
?>
