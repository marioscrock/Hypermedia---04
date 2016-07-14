<?php

header('Content-type: text/plain; charset=utf-8');

//connection to db
$mysqli = new mysqli("localhost", "root", "", "dbtim");
if (mysqli_connect_errno()) { //verify connection
    echo "Error to connect to DBMS: ".mysqli_connect_error(); //notify error
    exit(); //do nothing else 
}
else {
    
		/* change character set to utf8 */
		$mysqli->set_charset("utf8");
    
		switch($_POST["table"]){
			case "products" : 
    		$query = "SELECT products.name, products.id_prod as id FROM assistances JOIN ass_prod JOIN products WHERE assistances.id_ass = ass_prod.id_ass && products.id_prod = ass_prod.id_prod && assistances.id_ass =".$_POST["id"];
				break;
			case "services" :
				$query = "SELECT services.name, services.id_serv as id FROM assistances JOIN ass_serv JOIN services WHERE assistances.id_ass = ass_serv.id_ass && services.id_serv = ass_serv.id_serv && assistances.id_ass =".$_POST["id"];
				break;
		}

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