<?php


header('Content-type: text/plain; charset=utf-8');
header('Access-Control-Allow-Origin: *');

//connection to db
$mysqli = new mysqli("localhost", "root", "", "my_hyppolenghiscroccavendra");
if (mysqli_connect_errno()) { //verify connection
    echo "Error to connect to DBMS: ".mysqli_connect_error(); //notify error
    exit(); //do nothing else 
}
else {
    
		/* change character set to utf8 */
		$mysqli->set_charset("utf8");
    
    $query = " SELECT * FROM strings WHERE key_string ='". $_POST["id"] ."'";
  
		//query execution
    $result = $mysqli->query($query);
		if($result==FALSE) {
			echo "no result";
		} else {
			if($result->num_rows >0)
			{
				$array = array();
				while($row = $result->fetch_assoc()) {
					array_push($array, $row);
				}
				echo json_encode($array);
			}
		}
	
    //free result
    $result->close();

    //close connection
    $mysqli->close();
}

?>