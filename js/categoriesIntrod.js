$(document).ready(ready);

function ready() {
	var title;
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
		url: "/php/StringData.php", //Relative or absolute path to file.php file
		data: {
			id: GET["item"]
		}
		, success: function (response) {
			document.title = response[0].value;
			$("#itemName").html("<strong>" + response[0].value.toUpperCase() + "</strong>");
			console.log(response[0].value);
		}
	});

	$.ajax({
		method: "POST"
		, dataType: "json", //type of data
		crossDomain: true, //localhost purposes
		url: "/php/categoriesIntrodData.php", //Relative or absolute path to file.php file
		data: {
			id: GET["item"]
		}
		, success: function (response) {
			var tiles = "";
			if (GET["item"] === "assistance_categories") {
				for (var i = 0; i < response.length; i++) {
					tiles += "<div id = 'category' class='row col-md-12' style='padding:1px; margin:5px;'><div class='col-md-2'>  <img class='img-responsive' style='margin:0 auto'src=" + response[i].img + "> </div> <div class='col-md-9'> <a href= assistanceIntroductory.html?category=" + response[i].id_cat + "> <h2> <strong>" + response[i].name + "</strong> </h2 > </a> </div> </div> </div>";
				}
			} else {
				for (var i = 0; i < response.length; i++) {
					tiles += "<div id = 'category' class='row col-md-12' style='padding:1px; margin:5px;'><div class='col-md-2'>  <img class='img-responsive' style='margin:0 auto'src=" + response[i].img + "> </div> <div class='col-md-9'> <a href= introductory.html?category=" + response[i].id_cat + "&item=" + GET["item"] + "> <h2> <strong>" + response[i].name + "</strong> </h2 > </a> </div> </div> </div>";
				}
			}
			$("#categories").html(tiles);
		}
		, error: function (request, error) {
			console.log("Error");
		}
	});
}