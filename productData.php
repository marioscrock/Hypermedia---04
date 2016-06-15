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
    //echo "Successful connection"; // connection ok

    # extract results mysqli_result::fetch_array
    $query = " SELECT * FROM products WHERE id_prod = 1  ";
    //query execution
    $result = $mysqli->query($query);
		if($result==FALSE) {
			echo "la query va ammmerda";
		} else {
			echo $result->num_rows;
			$array = array();
			$array = $result->fetch_array(MYSQL_ASSOC);
			
			echo $array["specifications"];
			echo json_encode($array);
		}
    //if there are data available
		if($result!=FALSE){
			if($result->num_rows >0)
			{
				$myArray = array();//create an array
				 while($row = $result->fetch_array(MYSQL_ASSOC)) {
            $myArray[] = $row;
        }
				echo json_encode($myArray);
			}
		}
    //free result
    $result->close();

    //close connection
    $mysqli->close();
}

?>