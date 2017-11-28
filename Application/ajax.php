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
		} else if ($_POST['function'] == 'add_entry') {
			return addEntry();
		} else if ($_POST['function'] == 'remove_entry') {
			return removeEntry();
		} else if ($_POST['function'] == 'get_edit_entry') {
			return getEditEntry();
		} else if ($_POST['function'] == 'edit_entry') {
			return editEntry();
		}
		else {
			echo "Error: Invalid function name '{$_POST['function']}'";
		}
	}
	function getSchools() {
		$conn = connect();
		$department = $_POST['department'];
		$query = "SELECT DISTINCT C.school FROM course C, equivalent E WHERE C.course_id = E.external_id";
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
		$query = "SELECT DISTINCT C.department FROM course C, equivalent E WHERE C.course_id = E.external_id";
	 	if ($school != '') $query .= " AND school = '{$school}'";
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
		$query = "SELECT C2.school AS school_external, C2.department AS department_external, C2.course_number AS number_external, E.is_equivalent, C1.school AS school_internal, C1.department AS department_internal, C1.course_number AS number_internal, C2.course_id AS id_external, C1.course_id AS id_internal, E.reason AS reason, E.evaluator AS email FROM course C1, course C2, equivalent E WHERE C1.course_id = E.internal_id AND C2.course_id = E.external_id";
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
	function addCourse($conn, $school, $department, $number) {
		$query = "SELECT * FROM course WHERE school = '{$school}' AND department = '{$department}' AND course_number = '{$number}'";
		$result = $conn->query($query);
		$rows = mysqli_num_rows($result);
		if ($rows == 0) {
			$query = "INSERT INTO course (school, department, course_number) VALUES ('{$school}', '{$department}', '{$number}')";
			if ($conn->query($query) == FALSE) return -1;
		}
		$query = "SELECT course_id FROM course WHERE school = '{$school}' AND department = '{$department}' AND course_number = '{$number}'";
		$result = $conn->query($query);
		$row = mysqli_fetch_assoc($result);
		return $row['course_id'];
	}
	function addEquivalency($conn, $internal, $external, $equivalent, $user, $reason) {
		$query = "INSERT INTO equivalent (internal_id, external_id, is_equivalent, evaluator, reason) VALUES ($internal, $external, $equivalent, '{$user}', '{$reason}')";
		return ($conn->query($query) == FALSE) ? -1 : 1;
	}
	function addEntry() {
		$conn = connect();
		$internal = addCourse($conn, 'Santa Clara University',  $_POST['department_internal'], $_POST['number_internal']);
		if ($internal == -1) {
			echo -1;
			$conn->close();
			return;
		}
		$external = addCourse($conn, $_POST['school_external'], $_POST['department_external'], $_POST['number_external']);
		if ($external == -1) {
			echo -2;
			$conn->close();
			return;
		}
		$equiv = $_POST['equivalent'] == 'Yes' ? 1 : 0;
		$user = $_POST['username'];
		$reason = $_POST['reason'];
		if (addEquivalency($conn, $internal, $external, $equiv, $user, $reason) == -1) {
			echo -3;
			$conn->close();
			return;
		}
		echo 1;
		$conn->close();
	}
	function removeEntry() {
		$conn = connect();
		$query = "DELETE FROM equivalent WHERE internal_id = '{$_POST['internal_id']}' AND external_id = '{$_POST['external_id']}'";
		if ($conn->query($query)) echo 1;
		else echo 0;
		$conn->close();
	}
	function editEntry() {
		$conn = connect();
		$query = "DELETE FROM equivalent WHERE internal_id = '{$_POST['internal_id']}' AND external_id = '{$_POST['external_id']}'";
		if (!$conn->query($query)) {
			echo 0;
			$conn->close();
			return;
		}
		$internal = addCourse($conn, 'Santa Clara University',  $_POST['department_internal'], $_POST['number_internal']);
		if ($internal == -1) {
			echo -1;
			$conn->close();
			return;
		}
		$external = addCourse($conn, $_POST['school_external'], $_POST['department_external'], $_POST['number_external']);
		if ($external == -1) {
			echo -2;
			$conn->close();
			return;
		}
		$equiv = $_POST['equivalent'] == 'Yes' ? 1 : 0;
		$user = $_POST['username'];
		$reason = $_POST['reason'];
		if (addEquivalency($conn, $internal, $external, $equiv, $user, $reason) == -1) {
			echo -3;
			$conn->close();
			return;
		}
		echo 1;
		$conn->close();
	}
	function getEditEntry() {
		$conn = connect();
		$query = "SELECT C2.school AS school_external, C2.department AS department_external, C2.course_number AS number_external, E.is_equivalent, C1.school AS school_internal, C1.department AS department_internal, C1.course_number AS number_internal, E.reason AS reason FROM course C1, course C2, equivalent E WHERE C1.course_id = E.internal_id AND C2.course_id = E.external_id AND C1.course_id = {$_POST['internal_id']} AND C2.course_id = {$_POST['external_id']}";
		$result = $conn->query($query);
		$row = mysqli_fetch_assoc($result);
		print json_encode($row);
		$conn->close();
	}
	function login() {
		$conn = connect();
		$query = "SELECT password FROM adviser WHERE email = '{$_POST['email']}'";
		$result = $conn->query($query);
		if ($result->num_rows > 0) {
				$row = $result->fetch_assoc();
				$password = $_POST['password'];
				$hash = $row['password'];
				if (password_verify($password , $hash)) echo 1;
				else echo 0;
		} else echo -1;
		$conn->close();
	}
	function addUser() {
		$conn = connect();
		$pass = password_hash($_POST['password'], PASSWORD_DEFAULT);
		$query = "INSERT INTO adviser (email, password) VALUES ('{$_POST['email']}', '{$pass}')";
		if ($conn->query($query)) echo 1;
		else echo 0;
		$conn->close();
	}
?>
