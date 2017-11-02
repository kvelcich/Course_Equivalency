<?php
require 'database.php';
  //get search term
  $searchTerm = $_GET['term'];

  $connect = connect();

  //select data from department
  $query = "SELECT DINSTINCT department FROM course WHERE department LIKE '%".$searchTerm."%' ORDER BY department";

  $result = $connect->query($query);

  while($row = mysqli_fetch_assoc($result)) {
      $rows[] = $row['department'];
  }
  //return json data
  echo json_encode($rows);
  $connect -> close();
?>
