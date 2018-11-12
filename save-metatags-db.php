<?php
require_once '/db-connect.php';

$meta_data = $_POST['meta_data'];
$url_value = $_POST['url_value'];

$sql = "INSERT INTO url_data (url) VALUES('" . $url_value . "');";

if ($conn->query($sql) === TRUE) {
    $insert_id = $conn->insert_id;

	foreach ($meta_data as $meta_name => $meta_value) {
		$sql = "INSERT INTO meta_data (meta_name, meta_value, url_id) VALUES('" . $meta_name . "', '" . $meta_value . "', '" . $insert_id . "');";
		$conn->query($sql);
	}

    $result = [
    	'status' => TRUE,
    	'message' => "All data are saved",
    ];
} else {
    $result = [
    	'status' => FALSE,
    	'message' => "Error: " . $conn->error,
    ];
}

echo(json_encode($result));
?>
