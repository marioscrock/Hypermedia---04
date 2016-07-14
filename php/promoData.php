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
    
		if($_POST["item"] === "product_categories"){
    $query = "SELECT products.id_prod as id, products.name, products.price, images.img FROM product_images JOIN products JOIN images WHERE(images.id_img = product_images.id_img)&&(products.id_prod=product_images.id_prod)&&(products.promo =1) GROUP BY products.id_prod";
		} else {
			 $query = "SELECT services.id_serv as id, services.name, services.img_bot as img FROM services WHERE (services.promo =1) GROUP BY services.id_serv";
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