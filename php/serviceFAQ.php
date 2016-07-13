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
    
		# extract results mysqli_result::fetch_array
    $query = " SELECT services.id_serv, services.name , services.img_bot , services.img_top , services.par_top , services.par_bot, service_categories.id_cat as category, service_categories.name as category_name, question_answer_faq.id_faq , question_answer_faq.question ,
    question_answer_faq.answer
							 FROM services JOIN service_categories JOIN question_answer_faq
				 			 WHERE (service_categories.id_cat=services.id_cat_serv)&&(services.id_serv=question_answer_faq.service)&&(services.id_serv=".$_POST["id"].")";
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