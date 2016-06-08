<?php
$servername = "localhost";
$username = "szmoro";
$password = "Francona";
$dbname = "dbtim";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT p.id_prod, p.name, p.price, c.name 
        FROM products p JOIN product_categories c
        WHERE p.id_prod = 1 AND p.id_prod_cat = c.id_prod_cat";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id_prod"]. " - Name: " . $row["name"]. " " . $row["price"]. $row["name"]."<br>";
    }
} else {
    echo "0 results";
}
$conn->close();
?>