$(document).ready(ready);

function ready() {

  var title = "";
  var sidebarCategories = "";
  var GET = {};
  var query = window.location.search.substring(1).split("&");
  for (var i = 0, max = query.length; i < max; i++) {
    if (query[i] === "") // check for trailing & with no param
      continue;

    var param = query[i].split("=");
    GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
  }

  $.when(

    $.ajax({
      method: "POST"
      , dataType: "json", //type of data
      crossDomain: true, //localhost purposes
      url: "/php/StringData.php", //Relative or absolute path to file.php file
      data: {
        id: GET["item"]
      }
      , success: function (response) {
        title += "<li class='sidebarTitle'>" + response[0].value + "</li>";
      }
      , error: function (request, error) {
        console.log("Error");
      }
    }),

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
            sidebarCategories += "<li><a class='sidebarEntry' style='color: #fe000d'>" + response[i].name + "</a></li>";
          } else {

            if (GET["item"] === "assistance_categories") {
              sidebarCategories += "<li><a class='sidebarEntry' href='assistanceIntroductory.html?category=" + response[i].id_cat + "&item=" + GET["item"] + "'>" + response[i].name + "</a></li>";
            } else {
              sidebarCategories += "<li><a class='sidebarEntry' href='introductory.html?category=" + response[i].id_cat + "&item=" + GET["item"] + "'>" + response[i].name + "</a></li>";
            }

          }
        }
      }
      , error: function (request, error) {
        console.log("Error");
      }
    })

  ).then(function () {
    var toAdd = "";
    toAdd += title;
    toAdd += sidebarCategories;
    $("#sidebarCategories").html(toAdd);
  })
}