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
        url: "/php/stringData.php", //Relative or absolute path to file.php file
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
        url: "/php/serviceData.php", //Relative or absolute path to file.php file
        data: {
            id: GET["id"]
        }
        , success: function (response) {
            orientationSecond = "<li><a href='introductory.html?category=" + response[0].category + "&item=service_categories'>" + response[0].category_name + "</a></li><li class='active'>" + response[0].name + "</li>";
            $(".sectionTitle").html(response[0].name);
            $("#imgContainerTop").prepend("<img class='img-responsive' src=" + response[0].img_top + ">");
            $("#servizioss").html(response[0].name);
            $("#img_btn").html("<img class='img-responsive img-center' src=" + response[0].img_bot + ">");
            $("#presentation").html(response[0].par_top);
            $("#specifications").html(response[0].par_bot);

            $("#btn-form").html("<button type =\x22button\x22 class=\x22btn btn-primary center-block\x22 onclick=\x22location.href = 'form-servizi.html?id=" + response[0].id_serv + "'\x22 >Sottoscrivi Servizio<br> Maggiori Informazioni</button>");
        }
        , error: function (request, error) {
            console.log("Error");
        }
    });
    $.ajax({
        method: "POST"
        , dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "/php/serviceFAQ.php", //Relative or absolute path to file.php file
        data: {
            id: GET["id"]
        }
        , success: function (response) {
            if (response[0].answer.length >= 0) {
                var button = "";
                button = "<div><button type =\x22button\x22 id=\x22btn-detail\x22 class=\x22btn btn-primary \x22 style=\x22margin-top:20px; \x22 onclick=\x22location.href = 'FAQ.html?id=" + response[0].id_serv + "'\x22 > FAQ </button></div>";
            }

            $("#optionalFAQBUTTON").html(button);
        }
        , error: function (request, error) {
            console.log("Error");
        }
    });
    $(document).ajaxStop(function () {
        $("#orientation").html(orientationFirst + orientationSecond);
    });
}