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
    
	$sql = "SELECT id, name, price, discountedprice FROM smartphone WHERE promotion=1";
	$result = $conn->query($sql);
    $resultsNumber = $result->num_rows;
    $devicePromo = array();
    
	if ($resultsNumber >= 0){
        while($row = $result ->fetch_array(MYSQL_ASSOC)){
        	$row["category"]="Smartphone";
        	$devicePromo[] = $row;
        }
    } else {
    	echo json_encode("405");
        exit(1);
    }
    
    $sql = "SELECT id, name, price, discountedprice FROM tablet WHERE promotion=1";
	$result = $conn->query($sql);
    $resultsNumber = $result->num_rows;
    
	if ($resultsNumber >= 0){
        while($row = $result ->fetch_array(MYSQL_ASSOC)){
            $row["category"]="Tablet";
        	$devicePromo[] = $row;
        }
    } else {
    	echo json_encode("405");
        exit(1);
    }
    
    $sql = "SELECT id, name, price, discountedprice FROM networking WHERE promotion=1";
	$result = $conn->query($sql);
    $resultsNumber = $result->num_rows;
    
	if ($resultsNumber >= 0){
        while($row = $result ->fetch_array(MYSQL_ASSOC)){
            $row["category"]="Networking";
        	$devicePromo[] = $row;
        }
    } else {
    	echo json_encode("405");
        exit(1);
    }
    
    $sql = "SELECT id, name, price, discountedprice FROM tv_and_smartliving WHERE promotion=1";
	$result = $conn->query($sql);
    $resultsNumber = $result->num_rows;
    
	if ($resultsNumber >= 0){
        while($row = $result ->fetch_array(MYSQL_ASSOC)){
			$row["category"]="Tv";
        	$devicePromo[] = $row;
        }
    } else {
    	echo json_encode("405");
        exit(1);
    }
    
    echo json_encode($devicePromo);


    $conn->close();
?>