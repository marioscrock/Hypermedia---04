function buildSidebar(tablename, id) {
	var elements;
	var phpFileName;
	var section1table = "";
	var section2table = "";
	var section1title = "";
	var section2title = "";
	var section1content = "";
	var section2content = "";
	var section1pageurl = "";
	var section2pageurl = "";
	switch (tablename) {
	case "products":
		phpFileName = "productsSidebar.php";
		section1table = "services";
		section2table = "assistances";
		section1pageurl = "servizio.html?id_serv=";
		section2pageurl = "assistenza.html?category=";
		break;
	case "services":
		phpFileName = "servicesSidebar.php";
		section1table = "products";
		section2table = "assistances";
		section1pageurl = "product.html?id_prod=";
		section2pageurl = "assistenza.html?category=";
		break;
	case "assistances":
		phpFileName = "assistancesSidebar.php";
		section1table = "products";
		section2table = "services";
		section1pageurl = "product.html?id_prod=";
		section2pageurl = "servizio.html?id_serv=";
		break;
	}
	//Gets the name of the section from db
	$.ajax({
		method: "POST"
		, dataType: "json", //type of data
		crossDomain: true, //localhost purposes
		url: "/php/stringData.php", //Relative or absolute path to file.php file
		data: {
			id: section1table
		}
		, success: function (response) {
			section1title = "<div> <ul class='nav nav-sidebar'> <li class='sidebarTitle'>" + response[0].value + "</li>";
		}
	}); //gets services related to the product
	$.ajax({
		method: "POST"
		, dataType: "json", //type of data
		crossDomain: true, //localhost purposes
		url: "/php/" + phpFileName, //Relative or absolute path to file.php file
		data: {
			table: section1table
			, id: id
		}
		, success: function (response) {
			if (response.length > 0) {
				for (var i = 0; i < response.length; i++) {
					section1content = "<li><a class='sidebarEntry' href='" + section1pageurl + response[i].id + "''>" + response[i].name + "</a></li>";
				}
				section1content += "</ul>	</div>";
			}
			else {
				section1content = "";
			}
		}
	}); //Gets the name of the section from db
	$.ajax({
		method: "POST"
		, dataType: "json", //type of data
		crossDomain: true, //localhost purposes
		url: "/php/stringData.php", //Relative or absolute path to file.php file
		data: {
			id: section2table
		}
		, success: function (response) {
			section2title = "<div> <ul class='nav nav-sidebar'> <li class='sidebarTitle'>" + response[0].value + "</li>";
		}
	}); //gets assistances related to the product
	$.ajax({
		method: "POST"
		, dataType: "json", //type of data
		crossDomain: true, //localhost purposes
		url: "/php/" + phpFileName, //Relative or absolute path to file.php file
		data: {
			table: section2table
			, id: id
		}
		, success: function (response) {
			if (response.length > 0) {
				var parameters = "";
				for (var i = 0; i < response.length; i++) {
					if (section2table === "assistances") {
						parameters = response[i].category + "&assistance=" + response[i].id
					}
					else {
						parameters = response[i].id;
					}
					section2content = "<li><a class='sidebarEntry' href='" + section2pageurl + parameters + "'>" + response[i].name + "</a></li>";
				}
				section2content += "</ul>	</div>";
			}
			else {
				section2content = "";
			}
		}
	});
	$(document).ajaxStop(function () {
		var sidebar = "";
		sidebar += section1title;
		sidebar += section1content;
		sidebar += section2title;
		sidebar += section2content;
		sidebar += "<ul class='nav nav-sidebar'> <a id='back'> <li class='sidebarBack'>Indietro</li> </a> <script type='text/javascript'> $('#back').click(function () { window.history.back(); }); </script> </ul>";
		$("#sidebarContainer").append(sidebar);
	});
}