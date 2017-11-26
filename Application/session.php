<?php
	if (isset($_POST['function'])) {
		$function = $_POST['function'];
		if ($function == 'set_equivalent') {
			return setEquivalent();
		} else if ($function == 'get_equivalent_internal') {
			return getEquivalentInternal();
		} else if ($function == 'get_equivalent_external') {
			return getEquivalentExternal();
		} else if ($function == 'set_username') {
			return setUsername();
		} else if ($function == 'get_username') {
			return getUsername();
		} else if ($function == 'logout') {
			return logout();
		}
		else {
			echo "Error: Invalid function name '{$_POST['function']}'";
		}
	}

	function logout() {
		session_start();
		$_SESSION['username'] = 'username - invalid';
	}

	function setUsername() {
		session_start();
		$_SESSION['username'] = $_POST['username'];
		$_SESSION['logged_in'] = 1;
	}

	function getUsername() {
		session_start();
		if (isset($_SESSION['username'])) echo $_SESSION['username'];
		else echo 'username - invalid';
	}

	function setEquivalent() {
		session_start();
		$_SESSION['internal_id'] = $_POST['internal_id'];
		$_SESSION['external_id'] = $_POST['external_id'];
	}

	function getEquivalentInternal() {
		session_start();
		echo $_SESSION['internal_id'];
	}

	function getEquivalentExternal() {
		session_start();
		echo $_SESSION['external_id'];
	}
?>
