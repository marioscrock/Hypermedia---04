var globalId;

function buildSidebar(tablename, id) {
  var GET = {};
  var query = window.location.search.substring(1).split("&");
  for (var i = 0, max = query.length; i < max; i++) {
    if (query[i] === "") // check for trailing & with no param
      continue;
    var param = query[i].split("=");
    GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
  }
  globalId = id;
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
    section1pageurl = "servizio.html?id=";
    section2pageurl = "assistenza.html?id=";
    break;
  case "services":
    phpFileName = "servicesSidebar.php";
    section1table = "products";
    section2table = "assistances";
    section1pageurl = "product.html?id=";
    section2pageurl = "assistenza.html?id=";
    break;
  case "assistances":
    phpFileName = "assistancesSidebar.php";
    section1table = "products";
    section2table = "services";
    section1pageurl = "product.html?id=";
    section2pageurl = "servizio.html?id=";
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
          section1content += "<li><a class='sidebarEntry' href='" + section1pageurl + response[i].id + "&backpage=" + location.pathname.substring(1) + "&backid=" + id + "''>" + response[i].name + "</a></li>";
        }
        section1content += "</ul>	</div>";
      } else {
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
        for (var i = 0; i < response.length; i++) {
          section2content += "<li><a class='sidebarEntry' href='" + section2pageurl + response[i].id + "&backpage=" + location.pathname.substring(1) + "&backid=" + id + "'>" + response[i].name + "</a></li>";
        }
        section2content += "</ul>	</div>";
      } else {
        section2content = "";
      }
    }
  });
  $(document).ajaxStop(function () {
    var sidebar = "";
    if (!(section1content === "")) {
      sidebar += section1title;
      sidebar += section1content;
    }
    if (!(section2content === "")) {
      sidebar += section2title;
      sidebar += section2content;
    }
    if (!(GET["backpage"] === undefined)) {
      sidebar += "<ul class='nav nav-sidebar'> <a id='back' onclick='back()'> <li class='sidebarBack'>Indietro</li> </a></ul>";
    }
    $("#sidebarContainer").append(sidebar);
    $(this).unbind("ajaxStop");
  });
}

function back() {
  var GET = {};
  var query = window.location.search.substring(1).split("&");
  for (var i = 0, max = query.length; i < max; i++) {
    if (query[i] === "") // check for trailing & with no param
      continue;
    var param = query[i].split("=");
    GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
  }
  if (!(GET["backpage"] === "")) {
    var href = GET["backpage"] + "?id=" + GET["backid"];
    href += "&backpage=" + location.pathname.substring(1) + "&backid=" + globalId;
    location.href = href;
  }
}