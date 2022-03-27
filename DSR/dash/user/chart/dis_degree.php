<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once('../db-inc.php');

$sqlQuery = "SELECT COUNT(*) AS num , degree.name AS dename FROM discharge INNER JOIN teacher ON discharge.teacher_id = teacher.id INNER JOIN degree ON teacher.degree_id = degree.id GROUP BY degree.name;";

$result = mysqli_query($connect,$sqlQuery);

$data = array();
foreach ($result as $row) {
	$data[] = $row;
}

mysqli_close($connect);

echo json_encode($data);
?>