$(document).ready(function(){
    $("input").click(function(){
    	$(this).addClass("searchstyle");
    });
    
    $("input").mouseleave(function(){
    	$(this).removeClass("searchstyle");
    });

    $("input").mouseenter(function(){
    	$(this).addClass("searchstyle");
    });

});