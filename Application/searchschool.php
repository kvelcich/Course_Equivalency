<?php
require database.php;
  $connect = connect();
  //get search term
  $searchTerm = $_GET['term'];

  //get matched data from schools
  $query = $db->query("SELECT DISTINCT school FROM course WHERE school LIKE '%".$searchTerm."%' ORDER BY school");
  $result = $conn->query($query);
  $rows = array();
  while($row = mysqli_fetch_assoc($result)) {
      $rows[] = $row;
  }
  //return json data
  echo json_encode($data);
  $connect -> close();
?>
