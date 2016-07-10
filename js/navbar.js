$(document).ready(function () {
	$("body").prepend('<div><h1> </h1></div><nav class="navbar navbar-inverse navbar-fixed-top"><div class="container-fluid"><div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a class="pull-left" href="index.html" style="padding-right: 40px;"><img src="img/white_logo.png" href="/index.html" height="48" alt="Brand"></a></div><div id="navbar" class="navbar-collapse collapse"><ul class="nav navbar-nav"><li id="prodotti" class="dropdown" style="transform: translateY(-3px);"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">PRODOTTI <span id="prodottiArrow" class="glyphicon glyphicon-chevron-right navbarArrow"></span></a><ul class="dropdown-menu"><li><a href="/categorie-item.html?item=product_categories">CATEGORIE Prodotti</a></li><li><a href="/promo.html?item=product_categories" style ="color:#fe000d;" >PROMOZIONI</a></li></ul></li><li id="serviziSL" class="dropdown" style="transform: translateY(-3px);"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">SERVIZI SMART LIFE <span id="serviziArrow" class="glyphicon glyphicon-chevron-right navbarArrow"></span></a><ul class="dropdown-menu"><li><a href="/categorie-item.html?item=service_categories">CATEGORIE Servizi Smart Life</a></li><li><a href="/promo.html?item=service_categories" style ="color:#fe000d;" >PROMOZIONI</a></li></ul></li><li id="assistenza" class="dropdown" style="transform: translateY(-3px);"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">SERVIZIO ASSISTENZA <span id="assistenzaArrow" class="glyphicon glyphicon-chevron-right navbarArrow"></span></a><ul class="dropdown-menu"><li><a href="/categorie-item.html?item=assistance_categories">CATEGORIE Servizi Assistenza</a></li><li><a href="/highlights-assistenza.html" style ="color:#fe000d;" >HIGHLIGHTS</a></li></ul></li></ul></div></div></nav>');
	$("body").css({
		"padding-top": "50px"
		, "padding-bottom": "20px"
	});
	$("body").append('<footer class="footer"><div class="container-fluid" style="height: inherit"><div class= "row" style="height: inherit"><div class="col-sm-3"></div><h4 class="col-sm-2 col-xs-4 text-Footer"><a href="/chi-siamo.html" style="color:#0b3d86">Chi Siamo</a></h4><h4 class="col-sm-2 col-xs-4 text-Footer">Il Gruppo</h4><h4 class="col-sm-2 col-xs-4 text-Footer">Contatti</a></h4><div class="col-sm-3"><a href="https://www.facebook.com/TimOfficialPage"><img class="pull-right img-footer" height="30" alt=" " src="img/social_icons.png"></div></div></div></footer>');
	$("html").css({
		"position": "relative"
		, "min-height": "100%"
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