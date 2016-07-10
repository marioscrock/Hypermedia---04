$(document).ready(ready);

function ready() {

  var GET = {};
  var query = window.location.search.substring(1).split("&");

  for (var i = 0, max = query.length; i < max; i++) {
    if (query[i] === "")
      continue;

    var param = query[i].split("=");
    GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
  }

  $.ajax({
    method: "POST"
    , dataType: "json", //type of data
    crossDomain: true, //localhost purposes
    url: "/php/categoriesIntrodData.php", //Relative or absolute path to file.php file
    data: {
      id: GET["item"]
    }
    , success: function (response) {

      for (var i = 0; i < response.length; i++) {
        if (response[i].id_cat === GET["category"]) {
          $("#titleCategory").html("<img class='titleIcon' src='" + response[i].img + "'><h1 class='sectionTitle'>" + response[i].name + "</h1>");
          document.title = "Assistenza - " + response[i].name;
          break;
        }
      }
    }
    , error: function (request, error) {
      console.log("Error");
    }
  });

  $.ajax({
    method: "POST"
    , dataType: "json", //type of data
    crossDomain: true, //localhost purposes
    url: "/php/assistanceIntroductoryData.php", //Relative or absolute path to file.php file
    data: {
      id: GET["category"]
    }
    , success: function (response) {

      var subcategories = [];
      var subcategory = "";

      for (var i = 0; i < response.length; i++) {
        if (!($.inArray(response[i].name, subcategories) > -1)) {
          subcategories.push(response[i].name);
        }
      }

      for (var i = 0; i < subcategories.length; i++) {

        subcategory += "<div class='col-xs-12 col-sm-6 col-md-6 col-lg-4'><ul class='custom-bullet'><h2>" + subcategories[i].toUpperCase() +
          "</h2>";

        for (var j = 0; j < response.length; j++) {
          if (response[j].name === subcategories[i]) {
            subcategory += "<li><a href='assistenza.html?category=" + GET["category"] + "&assistance=" + response[j].id_ass + "'>" + response[j].title + "</a></li>";
          }
        }
        subcategory += "</ul></div>";
      }

      $("#subcategories").html(subcategory);

    }
    , error: function (request, error) {
      console.log("Error");
    }
  });
}