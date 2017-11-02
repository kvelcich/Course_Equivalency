<?php
require 'database.php';
  
  //get search term
  $searchTerm = $_GET['term'];

  $connect = connect();
  //get matched data from schools
  $query = "SELECT DISTINCT school FROM course WHERE school LIKE '%".$searchTerm."%' ORDER BY school";
  $result = $connect->query($query);

  while($row = mysqli_fetch_assoc($result)) {
      $rows[] = $row['school'];
  }
  //return json data
  echo json_encode($rows);
  $connect -> close();
?>
