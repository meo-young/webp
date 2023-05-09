$(document).ready(function(){
    $("#imgAlbum").attr("src", imgArray[0]);

    $("div.out").mouseover(function(){
        $("div.out p:first").text("mouse over");
        $("div.out p:last").text(++count);
    })

    $("div.out").mouseout(function(){
        $("div.out p:first").text("mouse out");
    })

    $("#b1").on("click",
    {url:"http://www.google.com",
    winattributes: "resize=1, scrollbars=1, status=1"},
    max_open);

    $("#bind").click(function(){
        $("#theone").on("click", flash).text("Can Click!");
    })

    $("#unbind").click(function(){
        $("#theone").off("click", flash).text("Does nothing...");
    })

    $("#trigger_test button:first").click(function(){
        update($("#trigger_test span:first"))
    });

    $("#trigger_test button:last").click(function(){
        $("#trigger_test button:first").trigger("click");
        update($("#trigger_test span:last"));
    })

    $("#image").click(function(){
        if($("#image").attr("src")=="img1.jpg"){
            $("#image").attr("src", "img2.jpg");
        }
        else{
            $("#image").attr("src", "img1.jpg");
        }
    })

    $("#imgAlbum").click(function(){
        $("#imgAlbum").attr("src",imgArray[index++]);
        if(index == 5){
            index = 0;
        }
    })

    $(".main-menu").mouseover(function(){
        $(this).css({
            "font-size" : "20px",
            "background-color" : "green"
        });
    })

    $(".main-menu").mouseout(function(){
        $(this).css({
            "font-size" : "1em",
            "background" : "none"
        });
    })

    $("#add_img").click(function(){
        $("#note_form").show();
        $("#note_form").addClass("pop-up");
    })

    $("#add_note").click(function(){
        var title = $("#note_title").val();
        var date = $("#note_date").val();
        var content = $("#note_content").val();
        $("#note").append("제목 : "+title+"<br>");
        $("#note").append("날짜 : "+date+"<br>");
        $("#note").append("내용 : "+content+"<br><br>");
        $("#note_form").hide();
        $("#note_form").removeClass("pop-up");

    })

})

var count = 0;
var index = 1;
var imgArray = ["album1.jpeg","album2.jpg","album3.jpg","album4.jpg","album5.jpg"];


function max_open(event){
    var maxwindow = window.open(event.data.url, "_blank", event.data.winattributes);
    maxwindow.moveTo(0,0);
    maxwindow.resizeTo(screen.availWidth,screen.availHeight);
}

function flash(){
    $("#off_test").show().fadeOut("slow");
}

function update(j){
    var i = parseInt(j.text(), 10);
    j.text(i+1);
}