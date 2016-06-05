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

	$sql = "SELECT device_id FROM related_device_as WHERE assistance_service_id=" . $id;
	$result = $conn->query($sql);
    $resultsNumber = $result->num_rows;
    $deviceIDS = array();
    

	if ($resultsNumber > 0){
        while($row = $result ->fetch_array(MYSQL_ASSOC)){
        	$deviceIDS[] = $row["device_id"];
        }
    } else {
    	echo json_encode("405");
        exit(1);
    }
    
    $deviceNames = array();
    
    foreach ($deviceIDS as $device_id) {
		$sql = "SELECT id, name, category FROM device WHERE id=" . $device_id;
		$result = $conn->query($sql);
        $resultsNumber = $result->num_rows;
		if ($resultsNumber == 1) {
			$row = $result -> fetch_assoc();
        	$deviceNames[] = $row;
		} else if ($resultsNumber == 0){
    		echo json_encode("405");
            exit(1);
		} else if ($resultsNumber > 1){
    		echo json_encode("406");
            exit(1);
		}
	}
    
    echo json_encode($deviceNames);


    $conn->close();
?>