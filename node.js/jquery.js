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
        $("#note_form").addClass("pop-up");
        change_position($(".pop-up"));
        $("#note_form").show(1000);
    })

    $("#add_note").click(function(){
        var title = $("#note_title").val();
        var date = $("#note_date").val();
        var content = $("#note_content").val();
        $("#note").append("제목 : "+title+"<br>");
        $("#note").append("날짜 : "+date+"<br>");
        $("#note").append("내용 : "+content+"<br><br>");
        $("#note_form").hide(1000);

    })

    $("#moving_button").click(function(){
        $("#moving_box").animate({
            "right" : "0px",
            "height" : "+=50px",
            "width" : "+=50px"
        })

        $("#animation_test").animate({
            "height" : "+=50px"
        })
    })

    $(window).resize(function(){
        change_position($(".pop-up"));
    })

    /*$(".accordion").each(function(){
        var dl = $(this);
        var alldd = dl.find("dd");
        var alldt = dl.find("dt");
        alldd.hide();
        alldt.css({
            "cursor" : "pointer"
        });

        alldt.click(function(){
            alldd.hide();
            var dt = $(this);
            var dd = dt.next();
            dd.show();
            alldt.css({
                "cursor" : "pointer"
            });
            dt.css({
                "cursor" : "default"
            })
        })
    })*/

    $(".accordion").each(function(){
        var dl = $(this);
        var allDt = dl.find("dt");
        var allDd = dl.find("dd");

        function closeAll(){
            allDd.addClass("closed");
            allDt.addClass("closed");
        }

        function open(dt,dd){
            dt.removeClass("closed");
            dd.removeClass("closed");
        }
        closeAll();
        allDt.click(function(){
            var dt = $(this);
            var dd = dt.next();
            closeAll();
            open(dt,dd);
        })

    })

    var interval = 4000;
    $(".slideshow").each(function(){
        var timer;
        var container = $(this);
        function switchImg(){
            var imgs = container.find('img');
            var first = imgs.eq(0);
            var second = imgs.eq(1);
            first.appendTo(container).fadeOut(2000);
            second.fadeIn();
        }
        function startTimer(){
            timer = setInterval(switchImg,interval);
        }
        function stopTimer(){
            clearInterval(timer);
        }
        startTimer();
        container.hover(stopTimer,startTimer);
    })

    /* 1 번째 버전. 텍스트 파일을 가져온 후 json 객체로 변환
    $("#getText").click(function(){
        $("#textbox").text("글자 입력 테스트");
        var req = $.ajax("data.txt");
        req.done(function (data,status){
            var students = JSON.parse(data);
            for(var i =0; i<students.length; i++){
                var str = "<br>"+students[i].name;
                $("#textbox").append(str);
            }
        })
    });
    */
    /* 2번째 버전. json 파일을 가져온 것을 그대로 사용.
    $("#getText").click(function(){
        $("#textbox").text("글자 입력 테스트");
        var req = $.ajax("data.json");
        req.done(function (data,status){
            for(var i =0; i<data.length; i++){
                var str = "<br>"+data[i].name;
                $("#textbox").append(str);
            }
        })
    });
    */
     //3번째 버전. txt파일의 데이터 타입을 json으로 가져옴.
    $("#getText").click(function(){
        $("#textbox").text("글자 입력 테스트");
        var req = $.ajax({
            url : "data.txt",
            dataType : "json"
        });
        req.done(function (data,status){
            for(var i =0; i<data.length; i++){
                var str = "<br>"+data[i].name;
                $("#textbox").append(str);
            }
        })
    });
    
     $("#getT").click(function(){
        var tb = $("<table/>");
        var row = $("<tr/>").append(
            $("<th/>").text("이름"),
            $("<th/>").text("아이디"),
            $("<th/>").text("학과"),
            $("<th/>").text("수강과목")
        );
        tb.append(row);
       $("#textbox").text("글자 입력 테스트");
        var req = $.ajax({
            url : "data.txt",
            dataType : "json"
        });
        req.done(function (data,status){
            for(var i =0; i<data.length; i++){
                var name = data[i].name;
                var id = data[i].id;
                var department = data[i].department;
                var cl = data[i].class;
                row = $("<tr/>").append(
                $("<td/>").text(name),
                $("<td/>").text(id),
                $("<td/>").text(department),
                $("<td/>").text(cl)
                );
                tb.append(row);
            }
            $("#textbox").html(tb);

        })
    });


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

function change_position(e){
    var l = ($(window).width()-e.width())/2;
    var t = ($(window).height()-e.height())/2;
    e.css({
        top :t,
        left : l
    });
}

