<?php
require database.php;
  $connect = connect();
//get search term
    $searchTerm = $_GET['term'];

    //select data from department
    $query = "SELECT * FROM course WHERE department LIKE '%".$searchTerm."%' ORDER BY department";

    $result = $connect->query($query);

    while($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row['department'];
    }
    //return json data
    echo json_encode($rows);
    $connect -> close();
?>
