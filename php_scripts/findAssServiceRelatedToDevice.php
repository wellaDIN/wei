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

	$sql = "SELECT assistance_service_id FROM related_device_as WHERE device_id=" . $id;
	$result = $conn->query($sql);
    $resultsNumber = $result->num_rows;
    $serviceIDS = array();
    

	if ($resultsNumber > 0){
        while($row = $result ->fetch_array(MYSQL_ASSOC)){
        	$serviceIDS[] = $row["assistance_service_id"];
        }
    } else {
    	echo json_encode("405");
        exit(1);
    }
    
    $serviceNames = array();
    
    foreach ($serviceIDS as $service_id) {
		$sql = "SELECT id, name, category FROM assistance_service WHERE id=" . $service_id;
		$result = $conn->query($sql);
        $resultsNumber = $result->num_rows;
		if ($resultsNumber == 1) {
			$row = $result -> fetch_assoc();
        	$serviceNames[] = $row;
		} else if ($resultsNumber == 0){
    		echo json_encode("405");
            exit(1);
		} else if ($resultsNumber > 1){
    		echo json_encode("406");
            exit(1);
		}
	}
    
    echo json_encode($serviceNames);


    $conn->close();
?>