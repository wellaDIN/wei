<?php
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
    
	$sql = "SELECT id, name, brand, type, discountedprice, connection FROM tv_and_smartliving";
	$result = $conn->query($sql);
    $resultsNumber = $result->num_rows;    

	if ($resultsNumber > 0){
    	$arrayResult = array();
        while($row = $result ->fetch_array(MYSQL_ASSOC)){
        	$arrayResult[] = $row;
        }
        echo json_encode($arrayResult);
    } else {
    	echo json_encode("405");
        exit(1);
    }
    $conn->close();
?>