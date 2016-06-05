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
    
	$sql = "SELECT id, name, category FROM assistance_service WHERE highlight=1";
	$result = $conn->query($sql);
    $resultsNumber = $result->num_rows;
    $serviceHighlight = array();
    
	if ($resultsNumber >= 0){
        while($row = $result ->fetch_array(MYSQL_ASSOC)){
        	$serviceHighlight[] = $row;
        }
    } else {
    	echo json_encode("405");
        exit(1);
    }
    
    echo json_encode($serviceHighlight);


    $conn->close();
?>