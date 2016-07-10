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
    method: "GET"
    , dataType: "json", //type of data
    crossDomain: true, //localhost purposes
    url: "/php/highlights.php", //Relative or absolute path to file.php file
    success: function (response) {

      var highlights = "";

      highlights += "<ul class='custom-bullet-highlights'>";

      for (var i = 0; i < response.length; i++) {
        highlights += "<li><a href='assistenza.html?category=" + response[i].category + "&assistance=" + response[i].id_ass + "'>" + response[i].title + "</a></li>";
      }

      highlights += "</ul>";

      $("#highlights").html(highlights);
    }
    , error: function (request, error) {
      console.log("Error");
    }
  });
}