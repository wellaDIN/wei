<?php
	header("Access-Control-Allow-Origin: http://weigroup.altervista.org");

	$servername = "localhost";
	$username = "weigroup";
	$password = "caccacacca";
	$dbname = "my_weigroup";
    
    // Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
    	die("Connection failed: " . $conn->connect_error);
	} 
    
    $id = $_POST["id"];

	$sql = "SELECT * FROM assistance_service WHERE id=".$id;
	$result = $conn->query($sql);
    $resultsNumber = $result->num_rows;

	if ($resultsNumber == 1) {
		$row = $result -> fetch_assoc();
        echo json_encode($row);
	} else if ($resultsNumber == 0){
    	echo json_encode("405");
	} else if ($resultsNumber > 1){
    	echo json_encode("406");
	}
    
    $conn->close();
?>