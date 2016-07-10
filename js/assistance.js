$(document).ready(ready);

function ready() {

  var orientationFirst = "";
  var orientationSecond = "";
  var GET = {};
  var query = window.location.search.substring(1).split("&");
  for (var i = 0, max = query.length; i < max; i++) {
    if (query[i] === "") // check for trailing & with no param
      continue;

    var param = query[i].split("=");
    GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
  }

  buildSidebar("assistances", GET["assistance"]);

  $.when(

    $.ajax({
      method: "POST"
      , dataType: "json", //type of data
      crossDomain: true, //localhost purposes
      url: "/php/stringData.php", //Relative or absolute path to file.php file
      data: {
        id: "assistance_categories"
      }
      , success: function (response) {
        orientationFirst += "<li><a href='categorie-item.html?item=assistance_categories'>" + response[0].value + "</a></li>";
      }
      , error: function (request, error) {
        console.log("Error");
      }
    }),

    $.ajax({
      method: "POST"
      , dataType: "json", //type of data
      crossDomain: true, //localhost purposes
      url: "/php/assistanceData.php", //Relative or absolute path to file.php file
      data: {
        id: GET["assistance"]
      }
      , success: function (response) {

        var mainContainer = "";

        document.title = response[0].title;
        $("#titleAssistance").html("<h1 class='sectionTitle'>" + response[0].title + "</h1>");

        orientationSecond += "<li><a href='assistanceIntroductory.html?category=" + GET["category"] + "&item=assistance_categories'>" + response[0].name + "</a></li><li class='active'>" + response[0].title + "</li>";

        if (!(response[0].img === "")) {
          mainContainer += "<div class='col-md-6'><p id='presentation' align='left'>" + response[0].description + "</p></div><div class='col-md-6'><img style='display: block; margin: 0 auto;' class='img-responsive' src='" + response[0].img + "'></div>";
        } else {
          mainContainer += "<div class='col-md-12'><p id='presentation' align='left'>" + response[0].description + "</p></div>";
        }

        $("#mainContainer").html(mainContainer);

      }
      , error: function (request, error) {
        console.log("Error");
      }
    })

  ).then(function () {
    $("#orientation").html(orientationFirst + orientationSecond);
  })

  $.ajax({
    method: "POST"
    , dataType: "json", //type of data
    crossDomain: true, //localhost purposes
    url: "/php/assistanceFAQ.php", //Relative or absolute path to file.php file
    data: {
      id: GET["assistance"]
    }
    , success: function (response) {

      var questions = "";

      for (var i = 0; i < response.length; i++) {

        questions += "<div class='row col-md-12'><div style='background-color: #0b3d86;' class='redDivider'></div><div class='col-md-12  placeholder'><h3 align='left'><strong>" + response[i].question + "</strong></h3><p align ='left'><br>" + response[i].answer + "</p></div></div>";
      }

      $("#questions").html(questions);

    }
    , error: function (request, error) {
      console.log("Error");
    }
  })

}