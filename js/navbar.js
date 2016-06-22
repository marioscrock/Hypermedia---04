$(document).ready(function () {
  $("body").prepend('<div><h1> </h1></div><nav class="navbar navbar-inverse navbar-fixed-top"><div class="container-fluid"><div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a class="pull-left" href="index.html" style="padding-right: 40px;"><img src="img/white_logo.png" href="/index.html" height="48" alt="Brand"></a></div><div id="navbar" class="navbar-collapse collapse"><ul class="nav navbar-nav"><li id="prodotti" class="dropdown" style="transform: translateY(-3px);"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">PRODOTTI <span id="prodottiArrow" class="glyphicon glyphicon-chevron-right navbarArrow"></span></a><ul class="dropdown-menu"><li><a href="/categorie-prodotti.html">CATEGORIE Prodotti</a></li><li><a href="/promozioni-prodotti.html" style ="color:#fe000d;" >PROMOZIONI</a></li></ul></li><li id="serviziSL" class="dropdown" style="transform: translateY(-3px);"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">SERVIZI SMART LIFE <span id="serviziArrow" class="glyphicon glyphicon-chevron-right navbarArrow"></span></a><ul class="dropdown-menu"><li><a href="/categorie-servizi.html">CATEGORIE Servizi Smart Life</a></li><li><a href="/promozioni-servizi.html" style ="color:#fe000d;" >PROMOZIONI</a></li></ul></li><li id="assistenza" class="dropdown" style="transform: translateY(-3px);"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">SERVIZIO ASSISTENZA <span id="assistenzaArrow" class="glyphicon glyphicon-chevron-right navbarArrow"></span></a><ul class="dropdown-menu"><li><a href="/categorie-assistenza.html">CATEGORIE Servizi Assistenza</a></li><li><a href="/highlights-assistenza.html" style ="color:#fe000d;" >HIGHLIGHTS</a></li></ul></li></ul></div></div></nav>');

  $("body").css({
    "padding-top": "50px"
    , "padding-bottom": "20px"
  });

});

$(function () {
  $('#prodotti').click(function () {
    $('#prodottiArrow').toggleClass("down");
    $('#serviziArrow').toggleClass("down", false);
    $('#assistenzaArrow').toggleClass("down", false);
  });
  $('#serviziSL').click(function () {
    $('#prodottiArrow').toggleClass("down", false);
    $('#serviziArrow').toggleClass("down");
    $('#assistenzaArrow').toggleClass("down", false);
  });
  $('#assistenza').click(function () {
    $('#prodottiArrow').toggleClass("down", false);
    $('#serviziArrow').toggleClass("down", false);
    $('#assistenzaArrow').toggleClass("down");
  });
  $(document).on('click', function (event) {
    if (!$(event.target).closest('#dropdown').length) {
      $('#prodottiArrow').toggleClass("down", false);
      $('#serviziArrow').toggleClass("down", false);
      $('#assistenzaArrow').toggleClass("down", false);
    }
  });
});