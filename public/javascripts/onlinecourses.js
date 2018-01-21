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

    $("li button").on({
        mouseenter : function(){
            $(this).addClass("navstyle");
        },
        mouseleave : function(){
            $(this).removeClass("navstyle");
        }
    });

    $(".intern li a").on({
        mouseenter : function(){
            $(this).addClass("navstyle");
        },
        mouseleave : function(){
            $(this).removeClass("navstyle");
        }
    });

    $("#show").on({
        mouseenter : function(){
            $(this).addClass("navstyle");
        },
        mouseleave : function(){
            $(this).removeClass("navstyle");
        }
    });

});