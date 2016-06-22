$(document).ready(ready);

function ready(){
    console.log("I'm ready!");
		var id = 1;
    $.ajax({
        method: "POST",
        dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "/php/productsIntroductoryData.php", //Relative or absolute path to file.php file
        data: {id:id},
        success: function(response) {
            var tiles="";
            for(var i=0;i<response.length;i++){
								tiles+="<div class=\x22col-xs-12 col-sm-6 col-md-4 col-lg-3 tileContainer\x22>	<div class=\x22container-fluid tile\x22>	<img src=\x22'+ response[i].img +'\x22 class=\x22img-responsive\x22 alt=\x22Generic placeholder thumbnail 					\x22>	 <div class=\x22item\x22><p>'+ response[i].name +'</p></div> <div class=\x22item itemPrice\x22><p>'+ response[i].price +'€</p></div>	<div 				 class=\x22item \x22><button type =\x22button\x22 id=\x22btn-detail\x22 class=\x22btn btn-primary\x22 onclick=\x22location.href='product.html?id_prod='+response[i].id_prod+'';\x22>Dettagli</button></div> </div> </div>";          
            }
            $("#tiles").html(tiles);
        },
        error: function(request,error) 
        {
            console.log("Error");
        }
    });
}

function getDetails(id){
	
}