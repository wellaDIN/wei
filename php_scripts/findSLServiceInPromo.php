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
    
	$sql = "SELECT id, name, category, promo FROM sl_service WHERE promo IS NOT NULL and promo <> ''";
	$result = $conn->query($sql);
    $resultsNumber = $result->num_rows;
    $servicePromo = array();
    
	if ($resultsNumber >= 0){
        while($row = $result ->fetch_array(MYSQL_ASSOC)){
        	$servicePromo[] = $row;
        }
    } else {
    	echo json_encode("405");
        exit(1);
    }
    
    echo json_encode($servicePromo);


    $conn->close();
?>