<?php
require_once '/db-connect.php';
$meta_results = [];

$query = "SELECT * FROM meta_data";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
    	$query = $conn->query("SELECT url FROM url_data WHERE id=" . $row['url_id']);
    	$url_data = $query->fetch_assoc();
		
        $meta_results[] = [
        	'url' => $url_data['url'],
        	'meta_name' => $row['meta_name'],
        	'meta_value' => $row['meta_value'],
        ];
    }
} else {
    echo "0 results";
}
?>

<!DOCTYPE HTML>
<html>
	<head>
		<meta charset="utf-8">
		<title>Results</title>
		<link rel="stylesheet" type="text/css" href="/assets/style.css">
	</head>
	<body>
		<table>
			<tr>
				<th>Url</th>
				<th>Metatag name</th>
				<th>Metatag value</th>
			</tr>
			<?php
			foreach ($meta_results as $meta_data) {
				echo '<tr>';
				echo '<td>' . $meta_data['url'] . '</td>';
				echo '<td>' . $meta_data['meta_name'] . '</td>';
				echo '<td>' . $meta_data['meta_value'] . '</td>';
				echo '</tr>';
			}
			?>
		</table>
	</body>
</html>
