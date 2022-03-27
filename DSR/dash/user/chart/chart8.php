<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once('../db-inc.php');

$sqlQuery = "select COUNT(*)AS num ,added_by AS added FROM(SELECT added_by FROM discharge
                UNION ALL
                SELECT added_by FROM research
                UNION ALL
                SELECT added_by FROM workshop
                UNION ALL
                SELECT added_by FROM training
                UNION ALL
                SELECT added_by FROM journal
                UNION ALL
                SELECT added_by FROM foreign_teacher
                UNION ALL
                SELECT added_by FROM exhibition) foo GROUP BY added_by";

$result = mysqli_query($connect,$sqlQuery);

$data = array();
foreach ($result as $row) {
	$data[] = $row;
}

mysqli_close($connect);

echo json_encode($data);
?>