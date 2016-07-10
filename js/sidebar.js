function buildSidebar(tablename, id) {
	var elements;
	var phpFileName;
	var section1table;
	var section2table;
	var section1content;
	var section2content;
	switch (tablename) {
	case "products":
		phpFileName = "productsSidebar.php";
		section1table = "services";
		section2table = "assistances";
		break;
	case "services":
		phpFileName = "servicesSidebar.php";
		section1table = "products";
		section2table = "assistances";
		break;
	case "assistances":
		phpFileName = "assistancesSidebar.php";
		section1table = "products";
		section2table = "services";
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
			section1content = "<div> <ul class='nav nav-sidebar'> <li class='sidebarTitle'>" + response[0].value + "</li>";
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
					section1content += "<li><a class='sidebarEntry' href='#'>" + response[i].name + "</a></li>";
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
			section2content = "<div> <ul class='nav nav-sidebar'> <li class='sidebarTitle'>" + response[0].value + "</li>";
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
				for (var i = 0; i < response.length; i++) {
					section2content += "<li><a class='sidebarEntry' href='#'>" + response[i].name + "</a></li>";
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
		if (section1content != "") {
			sidebar += section1content;
		}
		if (section2content != "") {
			sidebar += section2content;
		}
		sidebar += "<ul class='nav nav-sidebar'> <a id='back'> <li class='sidebarBack'>Indietro</li> </a> <script type='text/javascript'> $('#back').click(function () { window.history.back(); }); </script> </ul>";
		$("#sidebarContainer").append(sidebar);
	});
}