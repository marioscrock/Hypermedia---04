$(document).ready(ready);

function ready(){
    var GET = {};
		var query = window.location.search.substring(1).split("&");
		for (var i = 0, max = query.length; i < max; i++)
		{
				if (query[i] === "") // check for trailing & with no param
						continue;

				var param = query[i].split("=");
				GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
		}
    $.ajax({
        method: "POST",
        dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "/php/productData.php", //Relative or absolute path to file.php file
        data: {id:GET["id_prod"]},
        success: function(response) {
					$(".productTitle").html(response.name);
					$("#imgContainer").prepend("<img src=\x22"+response.img+"\x22 class=\x22img-responsive\x22 alt=\x22Generic placeholder thumbnail \x22>");
					$(".productPrice").html(response.price+"€");
					$("#presentation").html(response.description);
					$("#specifications").html(response.specifications);
        },
        error: function(request,error) 
        {
            console.log("Error");
        }
    });

}