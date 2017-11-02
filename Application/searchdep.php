<?php
require database.php;
  $connect = connect();
//get search term
    $searchTerm = $_GET['term'];

    //select data from department
    $query = "SELECT DISTINCT department FROM course WHERE department LIKE '%".$searchTerm."%' ORDER BY department";

    $result = $conn->query($query);
    $rows = array();
    while($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
    //return json data
    echo json_encode($row);
    $connect -> close();
?>
