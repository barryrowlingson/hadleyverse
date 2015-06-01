$.fn.filterByData = function(prop, val) {
    return this.filter(
        function() { return $(this).data(prop)==val; }
    );
}

var current=1;
var nslides;

var switchSlide = function(newSlide){
    if(newSlide < 1){
	return;
    }
    if(newSlide > nslides){
	return;
    };
    if(newSlide == current){
	$("div.slide").filterByData("slide",current).fadeIn();
    }else{
	$("html, body").animate({ scrollTop: 0 }, "fast");
	$("div.slide").filterByData("slide",current).fadeOut();
	current = newSlide;
	$("div.slide").filterByData("slide",current).fadeIn();
    };
    $("#counter")[0].innerHTML=current + "/" + nslides;
    location.hash=current;
}

var nextSlide = function(){
    switchSlide(current + 1);
};

var prevSlide = function(){
    switchSlide(current - 1);
};

$(function(){
    $("div.clickshow").css({opacity: 0.1}).click(function(){
	$(this).css({opacity: 1})
    });
    // number the slides
    var slides = $("div.slide")
    nslides = slides.length;
    slides.each(function(i, e){
	$(e).data("slide",i+1);
	var h1 = $(e).find("h1").html()
        $("#index ul").append('<li><a href="javascript:switchSlide('+(i+1)+')">'+(i+1)+' '+h1+'</a></li>');
    });
    $("#index").hide();
    $("#counter").click(function(){
	$("#index").show();
	});
    $("#index").click(function(){$("#index").hide()});
    current = 1;
    if(parseInt(location.hash.substring(1))){
	current = parseInt(location.hash.substring(1));
    }else{
	current = 1;
    };
    if(current > nslides){
	current = nslides;
    };
    location.hash=current;
    switchSlide(current);
//    $("div.slide").filterByData("slide",current).show();
    $( "body" ).keydown(function(event) {
	if(event.keyCode == 39){
	    nextSlide();
	};
	if(event.keyCode == 37){
	    prevSlide();
	};
    });
});
