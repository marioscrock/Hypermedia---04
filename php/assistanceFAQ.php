<?php

header('Content-type: text/plain; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$mysqli = new mysqli("localhost", "root", "", "my_hyppolenghiscroccavendra");

if (mysqli_connect_errno()) { //verify connection
    echo "Error to connect to DBMS: ".mysqli_connect_error(); //notify error
    exit(); //do nothing else 
}
else {
    
    $mysqli->set_charset("utf8");
    
    $query = "SELECT id_qa, question, answer FROM assistances, questions_answers_assistance WHERE id_ass = assistance && id_ass =".$_POST["id"]."";
  
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
	
    $result->close();

    $mysqli->close();
  
}

?>