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
		$conn->close()
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
		$conn->close()
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
		$conn->close()
	}

	function search() {
		$conn = connect();

		$school = $_POST['school'];
		$department = $_POST['department'];
		$number = $_POST['number'];

		$query = "SELECT * FROM course C1, course C2, equivalent E WHERE C1.course_id = E.internal_id AND C2.course_id = E.external_id";
		if ($school != "") $query.append(" AND C2.school = '{$school}'");
		if ($deparment != "") $query.append(" AND C2.department = '{$department}'");
		if ($number != "") $query.append(" AND C2.school = '{$number}'");

		$result = $conn->query($query);

		$rows = array();
		while($row = mysqli_fetch_assoc($result)) {
				$rows[] = $row;
		}

		print json_encode($rows);
		$conn->close()
	}

	function addUser() {
		$conn = connect();

		//check that user does not already exist
		$query = "INSERT INTO advisor (email, password) VALUES ('{$_POST['email']}', '{$_POST['password']}')";
		if ($conn->query($query))
			echo "Success";
		else
			echo "Error";
		$conn->close();
	}

	function addCourse() {
		$conn = connect();

		//check if internal exists
		//if not add it
		//check if external exists
		//if not add it
		//add internal
		//send success if all conditions met
		//otherwise send error

	}

	function login() {

	}
?>
