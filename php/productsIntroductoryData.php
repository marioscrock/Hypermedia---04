<?php


header('Content-type: text/plain; charset=utf-8');


//get all the course from db and reply using json structure

//echo "I'm the php";

//connection to db
$mysqli = new mysqli("localhost", "root", "", "dbtim");
if (mysqli_connect_errno()) { //verify connection
    echo "Error to connect to DBMS: ".mysqli_connect_error(); //notify error
    exit(); //do nothing else 
}
else {
    
		/* change character set to utf8 */
		$mysqli->set_charset("utf8");
    
		
    $query = "SELECT products.id_prod, products.name, products.price, images.img, product_categories.name as category, product_categories.img as category_img FROM product_images JOIN products JOIN images JOIN product_categories WHERE(images.id_img = product_images.id_img)&&(products.id_prod=product_images.id_prod)&&(products.id_prod_cat=".$_POST["id"].")&&(product_categories.id_cat =products.id_prod_cat) GROUP BY products.id_prod";
    
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