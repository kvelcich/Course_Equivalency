<?php
require 'database.php';
  $connect = connect();

  //get search term
  $my_data = $_GET['term'];

  //select data from department
  $query = "SELECT DINSTINCT department FROM course WHERE department LIKE '%".$my_data."%' ORDER BY department";

  $result = $connect->query($query);
  
  while($row = mysqli_fetch_assoc($result)){
    $rows[] = $row['department'];
  }

  //return json data
  echo json_encode($rows);
  $connect -> close();
?>
