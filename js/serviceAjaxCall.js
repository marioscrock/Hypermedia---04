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
    buildSidebar("services", GET["id_serv"]);
    $.ajax({
        method: "POST"
        , dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "/php/serviceData.php", //Relative or absolute path to file.php file
        data: {
            id: GET["id_serv"]
        }
        , success: function (response) {
            $(".sectionTitle").html(response[0].name);
            $("#imgContainerTop").prepend("<img class='img-responsive' src=" + response[0].img_top + ">");
            $("#imgContainerBot").prepend("<img class='img-responsive' src=" + response[0].img_bot + ">");
            $("#presentation").html(response[0].par_top);
            $("#specifications").html(response[0].par_bot);
        }
        , error: function (request, error) {
            console.log("Error");
        }
    });
}