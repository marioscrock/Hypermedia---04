$(document).ready(ready);

function get() {
  var GET = {};
  var query = window.location.search.substring(1).split("&");
  for (var i = 0, max = query.length; i < max; i++) {
    if (query[i] === "") // check for trailing & with no param
      continue;
    var param = query[i].split("=");
    GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
  }
  return GET;
}

function ready() {
  var GET = get();
  var orientationFirst = "";
  var orientationSecond = "";
  var phpFileName = "";
  var itemType = "";
  if (location.pathname.includes("form-prodotti.html")) {
    phpFileName = "productData.php";
    itemType = "product_categories";
  } else {
    phpFileName = "serviceData.php";
    itemType = "service_categories";
  }
  $.ajax({
    method: "POST"
    , dataType: "json", //type of data
    crossDomain: true, //localhost purposes
    url: "http://hyppolenghiscroccavendra.altervista.org/php/stringData.php", //Relative or absolute path to file.php file
    data: {
      id: itemType
    }
    , success: function (response) {
      orientationFirst += "<li><a href='categorie-item.html?item=" + itemType + "'>" + response[0].value + "</a></li>";
    }
    , error: function (request, error) {
      console.log("Error");
    }
  });
  $.ajax({
    method: "POST"
    , dataType: "json", //type of data
    crossDomain: true, //localhost purposes
    url: "http://hyppolenghiscroccavendra.altervista.org/php/" + phpFileName, //Relative or absolute path to file.php file
    data: {
      id: GET["id"]
    }
    , success: function (response) {
      orientationSecond = "<li><a href='introductory.html?category=" + response[0].category + "&item=" + itemType + "'>" + response[0].category_name + "</a></li><li class='active'>" + response[0].name + "</li><li class='active'>Form</li>";
      $("#title").html("<strong>" + response[0].name + "</strong>");
      $("#price").html("<strong>" + response[0].price + "€</strong>");
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
      if (response.length >= 0) {
        $("#optionalFAQBUTTON").html("<button name='button3id' class='btn btn-inverse' onclick=\x22location.href='FAQ.html?id=" + GET["id"] + "'\x22 style='width: 100%; margin-top: 10px;'>FAQ</button>");
      }
    }
    , error: function (request, error) {
      console.log("Error");
    }
  });
  $(document).ajaxStop(function () {
    $("#orientation").html(orientationFirst + orientationSecond);
  });
}

function back() {
  var GET = get();
  if (location.pathname.substring(1) === "form-prodotti.html") {
    location.href = "product.html?id=" + GET["id"];
  } else {
    location.href = "servizio.html?id=" + GET["id"];
  }
}