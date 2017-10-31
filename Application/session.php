<?php
	if (isset($_POST['function'])) {
		$function = $_POST['function'];
		if ($function == 'start_session') {
			return startSession();
		} else if ($function == 'set_equivalent') {
			return setEquivalent();
		} else if ($function == 'get_equivalent_internal') {
			return getEquivalentInternal();
		} else if ($function == 'get_equivalent_external') {
			return getEquivalentExternal();
		}

		else {
			echo "Error: Invalid function name '{$_POST['function']}'";
		}
	}

	function startSession() {
		session_start();
	}

	function setEquivalent() {
		$_SESSION['internal_id'] = $_POST['internal_id'];
		$_SESSION['external_id'] = $_POST['external_id'];
	}

	function getEquivalentInternal() {
		echo $_SESSION['internal_id'];
	}

	function getEquivalentExternal() {
		echo $_SESSION['external_id'];
	}
?>
