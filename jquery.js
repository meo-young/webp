$(document).ready(function(){
    $("div.out").mouseover(function(){
        $("div.out p:first").text("mouse over");
        $("div.out p:last").text(++count);
    })

    $("div.out").mouseout(function(){
        $("div.out p:first").text("mouse out");
    })
})

var count = 0;
