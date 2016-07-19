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
  buildSidebar("services", GET["id"]);
  var orientationFirst = "";
  var orientationSecond = "";
  $.ajax({
    method: "POST"
    , dataType: "json", //type of data
    crossDomain: true, //localhost purposes
    url: "http://hyppolenghiscroccavendra.altervista.org/php/stringData.php", //Relative or absolute path to file.php file
    data: {
      id: "service_categories"
    }
    , success: function (response) {
      orientationFirst += "<li><a href='categorie-item.html?item=service_categories'>" + response[0].value + "</a></li>";
    }
    , error: function (request, error) {
      console.log("Error");
    }
  });

  $.ajax({
    method: "POST"
    , dataType: "json", //type of data
    crossDomain: true, //localhost purposes
    url: "http://hyppolenghiscroccavendra.altervista.org/php/serviceFAQ.php", //Relative or absolute path to file.php file
    data: {
      id: GET["id"]
    }
    , success: function (response) {

      orientationSecond = "<li><a href='introductory.html?category=" + response[0].category + "&item=service_categories'>" + response[0].category_name + "</a></li> <li><a href='servizio.html?id=" + response[0].id_serv + "&item=service_categories'>" + response[0].name + "</a></li> <li class='active'>FAQ " + response[0].name + "</li>";
      $(".sectionTitle").html("FAQ di " + response[0].name);


      var questions = "";
      for (var i = 0; i < response.length; i++) {
        questions += "<div class='row col-md-12'></div><div class='col-md-12  placeholder'><a align='left' style='font-size: 20px;' onclick='question(this," + response[i].id_faq + "," + GET["id"] + ")'><strong>" + response[i].question + "</strong></a></div></div>";
      }
      $("#questions").html(questions);
    }
    , error: function (request, error) {
      console.log("Error");
    }
  });
  $(document).ajaxStop(function () {
    $("#orientation").html(orientationFirst + orientationSecond);
  });
}

function question(e, id_faq, service) {

  var element = e;

  $.ajax({
    method: "POST"
    , dataType: "json", //type of data
    crossDomain: true, //localhost purposes
    url: "http://hyppolenghiscroccavendra.altervista.org/php/servicesingleFAQ.php", //Relative or absolute path to file.php file
    data: {
      id: id_faq
    }
    , success: function (response) {

      $(element).css({
        "color": "#0b3d86"
      });
      $(element).parent().append("<p align ='left'><br>" + response[0].answer + "<br><br></p><div style='background-color: #0b3d86;' class='redDivider'></div>");
      element.onclick = function () {
        return false;
      }

    }
    , error: function (request, error) {
      console.log("Error");
    }
  });
  return false; // return false so the browser will not scroll your page
}