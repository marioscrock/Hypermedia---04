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
	buildSidebar("products", GET["id"]);
	var orientationFirst = "";
	var orientationSecond = "";
	$.ajax({
		method: "POST"
		, dataType: "json", //type of data
		crossDomain: true, //localhost purposes
		url: "/php/stringData.php", //Relative or absolute path to file.php file
		data: {
			id: "product_categories"
		}
		, success: function (response) {
			orientationFirst += "<li><a href='categorie-item.html?item=product_categories'>" + response[0].value + "</a></li>";
		}
		, error: function (request, error) {
			console.log("Error");
		}
	});
	$.ajax({
		method: "POST"
		, dataType: "json", //type of data
		crossDomain: true, //localhost purposes
		url: "/php/productData.php", //Relative or absolute path to file.php file
		data: {
			id: GET["id"]
		}
		, success: function (response) {
			orientationSecond = "<li><a href='introductory.html?category=" + response[0].category + "&item=product_categories'>" + response[0].category_name + "</a></li><li class='active'>" + response[0].name + "</li>";
			$(".productTitle").html(response[0].name);
			var carousel = "<div id='myCarousel' class='carousel slide' data-ride='carousel'>	<!-- Indicators -->	<ol class='carousel-indicators'>	<li data-target='#myCarousel' data-slide-to='0' class='active'></li>";
			for (var i = 1; i < response.length; i++) {
				carousel += "<li data-target='#myCarousel' data-slide-to='" + i + "'></li>";
			}
			carousel += "</ol> <!-- Wrapper for slides -->	<div class='carousel-inner' role='listbox'>	<div class='item active'>	<img class='img-responsive' src=" + response[0].img + "> </div>";
			for (var i = 1; i < response.length; i++) {
				carousel += "<div class='item'> <img class='img-responsive' src=" + response[i].img + "> </div>";
			}
			carousel += "</div>	<!-- Left and right controls --> <a class='left carousel-control' href='#myCarousel' role='button' data-slide='prev'>	<span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span> <span class='sr-only'>Previous</span>	</a> <a class='right carousel-control' href='#myCarousel' role='button' data-slide='next'> <span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span>	<span class='sr-only'>Next</span>	</a> </div>";
			var buyNowButton = "<button type='button' class='btn btn-primary' onclick=\x22location.href ='form-prodotti.html?id=" + GET["id"] + "'\x22>Acquista ora</button>";
			$("#buyNowButton").html(buyNowButton);
			$("#imgContainer").prepend(carousel);
			$(".productPrice").html(response[0].price + "€");
			$("#presentation").html(response[0].description);
			$("#specifications").html(response[0].specifications);
		}
		, error: function (request, error) {
			console.log("Error");
		}
	});
	$(document).ajaxStop(function () {
		$("#orientation").html(orientationFirst + orientationSecond);
	});
}