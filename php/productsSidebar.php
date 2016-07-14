<?php

header('Content-type: text/plain; charset=utf-8');

//connection to db
$mysqli = new mysqli("localhost", "root", "", "hyppolenghiscroccavendra");
if (mysqli_connect_errno()) { //verify connection
    echo "Error to connect to DBMS: ".mysqli_connect_error(); //notify error
    exit(); //do nothing else 
}
else {
    
		/* change character set to utf8 */
		$mysqli->set_charset("utf8");
    
		switch($_POST["table"]){
			case "assistances" : 
    		$query = "SELECT assistances.title as name, assistances.id_ass as id, assistance_subcategories.category FROM products JOIN ass_prod JOIN assistances JOIN assistance_subcategories WHERE products.id_prod = ass_prod.id_prod && assistances.id_ass = ass_prod.id_ass && products.id_prod =" .$_POST["id"]." &&assistances.subcategory=assistance_subcategories.id_ass_subcat";
				break;
			case "services" :
				$query = "SELECT services.name, services.id_serv as id FROM products JOIN prod_serv JOIN services WHERE products.id_prod = prod_serv.id_prod && services.id_serv = prod_serv.id_serv && products.id_prod =".$_POST["id"];
				break;
		}
	
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