<?php
	require'database.php';
	if (isset($_POST['function'])) {
		if ($_POST['function'] == 'get_schools') {
			return getSchools();
		} else if ($_POST['function'] == 'get_departments') {
			return getDepartments();
		} else if ($_POST['function'] == 'add_user') {
			return addUser();
		} else if ($_POST['function'] == 'login') {
			return login();
		} else if ($_POST['function'] == 'search') {
			return search();
		}

		else {
			echo "Error: Invalid function name '{$_POST['function']}'";
		}
	}

	function getSchools() {
		$conn = connect();
		$department = $_POST['department'];
		$query = "SELECT DISTINCT school FROM course WHERE school != 'Santa Clara University'";
		if ($department != '') $query .= "AND department = '{$department}'";
		$result = $conn->query($query);
		$rows = array();
		while($row = mysqli_fetch_assoc($result)) {
				$rows[] = $row;
		}
		print json_encode($rows);
		$conn->close();
	}

	function getDepartments() {
		$conn = connect();
		$school = $_POST['school'];
		$query = "SELECT DISTINCT department FROM course";
	 	if ($school != '') $query .= " WHERE school = '{$school}'";
		$result = $conn->query($query);
		$rows = array();
		while($row = mysqli_fetch_assoc($result)) {
				$rows[] = $row;
		}
		print json_encode($rows);
		$conn->close();
	}

	function search() {
		$conn = connect();
		$school = $_POST['school'];
		$department = $_POST['department'];
		$number = $_POST['number'];

		$query = "SELECT * FROM course C1, course C2, equivalent E WHERE C1.course_id = E.internal_id AND C2.course_id = E.external_id";
		if ($school != "") $query .= " AND C2.school = '{$school}'";
		if ($department != "") $query .= " AND C2.department = '{$department}'";
		if ($number != "") $query .= " AND C2.course_number = '{$number}'";
		$result = $conn->query($query);
		$rows = array();
		while($row = mysqli_fetch_assoc($result)) {
				$rows[] = $row;
		}
		print json_encode($rows);
		$conn->close();
	}

	function addCourse() {
		$conn = connect();
	}

	function login() {
		$conn = connect();
		$query = "SELECT * FROM advisor WHERE email = '{$_POST['email']}' AND password = '{$_POST['password']}'";
		$result = $conn->query($query);
		$rows = 0;
		while($row = mysqli_fetch_assoc($result)) $rows++;
		if ($rows == 1) {
			echo 1;
		} else {
			echo 0;
		}
		$conn->close();
	}
	function addUser() {
		$conn = connect();
		$query = "INSERT INTO advisor (email, password) VALUES ('{$_POST['email']}', '{$_POST['password']}')";
		if ($conn->query($query))
			echo 1;
		else
			echo 0;
		$conn->close();
	}
?>
