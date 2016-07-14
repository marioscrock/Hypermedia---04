<?php

header('Content-type: text/plain; charset=utf-8');

$mysqli = new mysqli("localhost", "root", "", "dbtim");

if (mysqli_connect_errno()) { //verify connection
    echo "Error to connect to DBMS: ".mysqli_connect_error(); //notify error
    exit(); //do nothing else 
}
else {
    
    $mysqli->set_charset("utf8");
    
    $query = "SELECT id_qa, question, answer FROM questions_answers_assistance WHERE id_qa =".$_POST["id"]."";
  
    $result = $mysqli->query($query);
		if($result==FALSE) {
			echo "no result";
		} else {
			if($result->num_rows >0)
			{
				$array = array();
				while($row = $result->fetch_assoc()) {
					$array[]=array_map('utf8_encode',$row);
				}
				echo json_encode($array);
			}
		}
	
    $result->close();

    $mysqli->close();
  
}

?>