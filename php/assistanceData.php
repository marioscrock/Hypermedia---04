<?php

header('Content-type: text/plain; charset=utf-8');

$mysqli = new mysqli("localhost", "root", "", "my_hyppolenghiscroccavendra");

if (mysqli_connect_errno()) { //verify connection
    echo "Error to connect to DBMS: ".mysqli_connect_error(); //notify error
    exit(); //do nothing else 
}
else {
    
    $mysqli->set_charset("utf8");
    
    $query = "SELECT id_ass, title, description, assistances.img, category, assistance_categories.name FROM assistances, assistance_subcategories, assistance_categories WHERE id_ass=".$_POST["id"]." && id_cat = category && subcategory = id_ass_subcat";
  
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