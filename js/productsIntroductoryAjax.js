$(document).ready(ready);

function ready() {
	var GET = {};
	var query = window.location.search.substring(1).split("&");
	for (var i = 0, max = query.length; i < max; i++) {
		if (query[i] === "") // check for trailing & with no param
			continue;
		var param = query[i].split("=");
		GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
	}
	$.ajax({
		method: "POST"
		, dataType: "json", //type of data
		crossDomain: true, //localhost purposes
		url: "http://hyppolenghiscroccavendra.altervista.org/php/productsIntroductoryData.php", //Relative or absolute path to file.php file
		data: {
			id: GET["category"]
			, item: GET["item"]
		}
		, success: function (response) {
			console.log(response[0].name);
			var tiles = "";
			if (GET["item"] === "product_categories") {
				for (var i = 0; i < response.length; i++) {
					tiles += "<div class=\x22col-xs-12 col-sm-6 col-md-4 col-lg-3 tileContainer same-height \x22>	<div class=\x22container-fluid tile \x22 ><div class='wrapperTop'><div class='semiContainer'><img src=\x22" + response[i].img + "\x22 class=\x22img-responsive\x22 style=\x22margin:auto;\x22 alt=\x22Generic placeholder thumbnail\x22>	</div></div><div class='wrapperBot'><div class='semiContainer'><div class='btContainer'> <div class=\x22item\x22><p>" + response[i].name + "</p></div> <div class=\x22item itemPrice\x22>" + response[i].price + "€</div>	<div class=\x22item \x22><button type =\x22button\x22 id=\x22btn-detail\x22 class=\x22btn btn-primary\x22 onclick=\x22location.href = 'product.html?id=" + response[i].id + "'\x22 > Dettagli </button></div></div></div> </div></div> </div>";
				}
			}
			else {
				for (var i = 0; i < response.length; i++) {
					tiles += "<div class=\x22col-xs-12 col-sm-6 col-md-4 col-lg-3 tileContainer \x22>	<div class=\x22container-fluid tile same-height\x22><div class='wrapperTop'><div class='semiContainer'>	<img src=\x22" + response[i].img + "\x22 class=\x22img-responsive\x22 style=\x22margin:auto;\x22 alt=\x22Generic placeholder thumbnail \x22> </div></div> <div class='wrapperBot'><div class='semiContainer'>	<div class='btContainer'> <div class=\x22item\x22><p><b>" + response[i].name + "</b></p></div> <div class=\x22item \x22><button type =\x22button\x22 id=\x22btn-detail\x22 class=\x22btn btn-primary\x22 onclick=\x22location.href = 'servizio.html?id=" + response[i].id + "'\x22 > Dettagli </button></div> </div></div></div></div> </div>";
				}
			}
			$("#tiles").html(tiles);
			$("#title").html("<img class='titleIcon' src=" + response[0].category_img + "> <h1 class='sectionTitle'> " + response[0].category.toUpperCase() + "</h1>");
		}
		, error: function (request, error) {
			console.log("Error");
		}
	});
}