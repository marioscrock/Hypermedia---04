$(document).ready(function () {
  $("body").append('<footer class="footer"><div class="container-fluid" style="height: inherit"><div class= "row" style="height: inherit"><div class="col-sm-3"></div><h4 class="col-sm-2 col-xs-4 text-Footer"><a href="/chi-siamo.html" style="color:#0b3d86">Chi Siamo</a></h4><h4 class="col-sm-2 col-xs-4 text-Footer">Il Gruppo</h4><h4 class="col-sm-2 col-xs-4 text-Footer">Contatti</a></h4><div class="col-sm-3"><a href="https://www.facebook.com/TimOfficialPage"><img class="pull-right img-footer" height="30" alt=" " src="img/social_icons.png"></div></div></div></footer>');

  $("html").css({
    "position": "relative"
    , "min-height": "100%"
  });

  $("body").css({
    "margin-bottom": "80px"
  });

  $(".footer").css({
    "position": "absolute"
    , "bottom": "0"
    , "width": "100%"
    , "height": "40px"
    , "background-color": "#f5f5f5"
    , "border-top": "2px solid #fe000d"
  });

  $(".text-Footer").css({
    "text-align": "center"
  });

  $(".img-footer").css({
    "padding-right": "20px"
    , "padding-top": "5px"
  });

});