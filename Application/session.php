<?php
	if (isset($_POST['function'])) {
		$function = $_POST['function'];
		if ($function == 'set_equivalent') {
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
