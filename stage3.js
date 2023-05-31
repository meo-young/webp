
export function stageStart3(mainGold) {
	/* 플레이어 스킬 변수 */
	var qskill = 0;
	var qskill_timer = 30;
	var qskill_repeat;
	var qskill_cooltime = 0;

	var wskill = 0;
	var wskill_timer = 10;
	var wskill_repeat;
	var wskill_repeat2;
	var wskill_cooltime = 0;
	var ypl = 480;
	var wskill_count = 0;
	var attack_x;
	var wskill_img_count = 0;
	var wskill_img = 1;

	var eskill = 0;
	var eskill_cooltime = 15;
	var eskill_timer;
	var eskill_count = 0;
	var eskill_repeat;
	var eskill_state = 0;

	/* 보스의 공격이 일정시간마다 진행되기위해 필요한 변수 */
	var timer = 0;
	var time_repeat;

	var attack1 = 0;
	var coordinate; //attack1 수행시 필요한 플레이어의 직전의 좌표 변수
	var attack1_timer = 0;
	var attack1_repeat;
	var check = 0;
	var attack1_img =1;
	var attack1_repeat2;
	var attack1_img_count = 0;

	var attack2 = 0;

	var attack3 = 0;
	var xmemory;
	var ymemory;
	var attack3_timer = 0;
	var attack3_repeat;
	var attack3_count = 0;
	var stop_state = 0;


	var attack4 = 0;
	var attack_bricks = [0, 0, 0, 0, 0];
	var rand;
	var attack4_timer;
	var attack4_count = 0;
	var yplus = 0;
	var attack4_img = 1;
	var attack4_img_count=0;
	/* 스페이스바를 누르면 start_number = 1로 변경 되면서 공이 발사됨 */
	var start_number = 0;
	var keydown_count = 0;
	var esc_count = 0;
	var stop_pattern;
	var qstop_pattern;
	var wstop_pattern;
	var estop_pattern;
	var gold = 0;

	/*canvas 너비, 높이 */
	var cvwd = 600;
	var cvht = 600;

	/* 벽돌의 x,y좌표 */
	var bricks = [0, 0, 0, 0, 0];
	var BRICKWIDTH = 120;
	var BRICKHEIGHT = 29;

	/* 게임시작 후 카운트 세주는 변수 */
	var count = 3;

	/* setinterval 입력받는 변수 */
	var repeat;

	/* canvas, context 선언 */
	var screen;
	var context;

	/* 공의 반지름 */
	var ballRadius = 10;

	/* 공의 이동속도 */
	var xvelocity = 2;
	var yvelocity = 2;
	var dx;
	var dy;

	/* 공의 x,y좌표. */
	var x;
	var y;

	/* 바(bar)의 x좌표 */
	var barx = cvwd / 2;
	var barwidth = 100;
	var barheight = 10;

	/* window 높이 ,너비 */
	var wdht;
	var wdwd;

	/* boss의 x,y좌표*/
	var bossx;
	var bossy;
	var bosswd = 80;
	var bossht = 80;

	/*플레이어, 보스 체력 */
	var p_hp = 0;
	var b_hp = 20;

	//플레이어 이미지
	var pDefaultStdsrc = "./img/player/playerStanding_32x32.gif";
	var pRedStdsrc = "./img/player/playerStanding_red_32x32.gif";
	var pCyanstdsrc = "./img/player/playerStanding_cyan_32x32.gif";
	var pWhitestdsrc = "./img/player/playerStanding_white_32x32.gif";
	var pYellowstdsrc = "./img/player/playerStanding_yellow_32x32.gif";
	var pPurplestdsrc = "./img/player/playerStanding_purple_32x32.gif";

	var pDefaultAttacksrc = "./img/player/playerAttack1_32x32.gif";
	var pRedAttacksrc = "./img/player/playerAttack1_red_32x32.gif";
	var pCyanAttacksrc = "./img/player/playerAttack1_cyan_32x32.gif";
	var pWhiteAttacksrc = "./img/player/playerAttack1_white_32x32.gif";
	var pYellowAttacksrc = "./img/player/playerAttack1_yellow_32x32.gif";
	var pPurpleAttacksrc = "./img/player/playerAttack1_purple_32x32.gif";

	var pDefaultHitsrc = "./img/player/playerHit_default.png";
	var pRedHItsrc = "./img/player/playerHit_red.png";
	var pCyanHitsrc = "./img/player/playerHit_cyan.png";
	var pWhiteHitsrc = "./img/player/playerHit_white.png";
	var pYellowHitsrc = "./img/player/playerHit_yellow.png";
	var pPurpleHitsrc = "./img/player/playerHit_purple.png";

	
	var playerColor ="";
	// 착용중인 캐릭터 이미지로 변경
	if ($("#pDefault").hasClass("equip")) {
		$("#playerImg3").attr("src", pDefaultStdsrc);
		playerColor = "default";
	}
	else if ($("#pRed").hasClass("equip")) {
		$("#playerImg3").attr("src", pRedStdsrc);
		playerColor = "red";
	}
	else if ($("#pCyan").hasClass("equip")) {
		$("#playerImg3").attr("src", pCyanstdsrc);
		playerColor = "cyan";
	}
	else if ($("#pWhite").hasClass("equip")) {
		$("#playerImg3").attr("src", pWhitestdsrc);
		playerColor = "white";
	}
	else if ($("#pYellow").hasClass("equip")) {
		$("#playerImg3").attr("src", pYellowstdsrc);
		playerColor = "yellow";
	}
	else if ($("#pPurple").hasClass("equip")) {
		$("#playerImg3").attr("src", pPurplestdsrc);
		playerColor = "purple";
	}

	var blood_img = new Image();
	blood_img.src = "./img/stage3/blood1.png";
	var blood_repeat;

	var bossattacked = new Image();
	bossattacked.src = "./img/stage3/bat.png";
	var bossImg = new Image(); // in canvas
	bossImg.src = "./img/stage3/boss3.gif";
	var bsimg = new Image();
	bsimg.src = "./img/stage3/ba1.png";
	//이미지들
	var wskill_Img = new Image();
	wskill_Img.src = "./img/stage3/blast1.png";
	var brick_Img=new Image();
	brick_Img.src="./img/stage3/brick.png";
	var razer_Img=new Image();
	razer_Img.src="./img/stage3/l2.png";
	var falling_attack_Img=new Image();
	falling_attack_Img.src="./img/stage3/m1.png";
	var iceball_Img=new Image();
	iceball_Img.src="./img/stage3/아이스볼.png";
	var paddleImg = new Image();
	paddleImg.src = "./img/player/paddle.png";
	var drawinterval=1;

	//오디오들
	const brickAudio = new Audio('./audio/brickbreak.mp3');
	const swingAudio = new Audio('./audio/swing.mp3');
	const bossAudio=new Audio('./audio/bosshit.mp3');

	wait();
	windowsize();
	pageLoad();
	/* 윈도우 창 크기를 변경할 때마다 canvas 크기도 변경 */
	$(window).resize(windowsize);
	hp();
	init();
	draw();

	function pageLoad(){
		var play_button = document.getElementById("play3");
		play_button.onclick = play;
		var exit_button = document.getElementById("exit3");
		exit_button.onclick = exit;
		$(".screen").css({
			"background" : "url(./backimg/back3.gif)"
		});
	}

	function play(){
		$("#boss_UI3").css({
			display : "block"
		});
		$("#player_UI3").css({
			display : "block"
		});
		$("#screen3").css({
			display : "block"
		});
		$("#esc_menu3").css({
			display : "none"
		});
		esc_count = 0;
		keydown_count = 0;
		addEventListener('mousemove', mousemove);
		repeat = setInterval(draw,1);
		time_repeat = setInterval(timeAttack,1000);
		if(stop_pattern == 2){	
			attack2_repeat = setInterval(bossAttack2_timer, 1);
		}
		if(qstop_pattern == 1){
			qskill_repeat = setInterval(skill_timer1,1000);
			qstop_pattern = 0;
		}
		stop_pattern = 0;
	}

	function exit(){
			// if (effectOn) {
			// 	clickSound.play();   // 버튼 클릭 효과음
			// }
			$("#boss_UI3").css({
				display : "block"
			});
			$("#player_UI3").css({
				display : "block"
			});
			$("#screen3").css({
				display : "block"
			});
			$("#esc_menu3").css({
				display : "none"
			});
			esc_count = 0;
			keydown_count = 0;
			removeEventListener('keydown', keydown);
			removeEventListener('mousemove', mousemove);
			clearInterval(repeat);
			if(attack1 == 1){
				attack1 = 0;
				check = 0;
				attack1_timer = 0;
				attack1_img_count = 0;
				attack1_img = 1;
				bsimg.src = "./img/stage3/ba"+attack1_img+".png";
				razer_Img.src = "./img/stage3/l2.png";
				clearInterval(attack1_repeat);
			}
			else if(attack3 == 1){
				attack3 = 0;
				clearInterval(attack3_repeat);
				attack3_timer = 0;
				attack3_count = 0;
			}
			else if (attack4 == 1){
				attack4 = 0;
				attack4_count = 0;
				clearInterval(attack4_timer);
				attack4_img_count = 0;
				attack4_img = 1;
				yplus = 0;
				for (var r = 0; r < attack_bricks.length; r++) {
					attack_bricks[r] = 0;
				}
			}
			if(qskill_cooltime == 1){
				clearInterval(qskill_repeat);
				qskill_cooltime = 0;
				qskill = 0;
				qskill_timer = 30;
				$("#qskill3").css({
					"display": "block"
				});
				$("#qtimer3").css({
					"display": "none"
				});
			}

			if(wskill_cooltime == 1){
				clearInterval(wskill_repeat);
				clearInterval(wskill_repeat2);
				wskill_cooltime = 0;
				wskill = 0;
				wskill_count = 0;
				wskill_timer = 10;
				wskill_Img.src = "./img/stage3/blast1.png";
				wskill_img_count = 0;
				wskill_img = 1;
				$("#wskill3").css({
					"display": "block"
				});
				$("#wtimer3").css({
					"display": "none"
				});
			}
			if(eskill_state == 1){
				clearInterval(eskill_repeat);
				clearInterval(eskill_timer);
				eskill = 0;
				eskill_count = 0;
				eskill_cooltime = 15;
				eskill_state = 0;
				$("#eskill3").css({
					"display": "block"
				});
				$("#etimer3").css({
					"display": "none"
				});
			}
			clearInterval(time_repeat);
			init();
			p_hp = 0;
			b_hp = 20;
			$("#container3").animate({
				"height": b_hp*15 + "px"
			});
			var p_hp_array = $(".state3");
			for(var i=0; i<3; i++){
				p_hp_array[i].src = "./img/player/playerHeartFull_25x25.png";
			}
			
			$("#stage3").removeClass("animateContent2").addClass("animateContent1");  // 스테이지3 esc화면 줄어드는 애니메이션
			setTimeout(function() {
				$("#stage3").removeClass("animateContent1").hide();   // 스테이지3 esc화면 none해주고
				$("#select-stage").show().addClass("animateContent2");         // 다시 스테이지 선택 페이지 나타나게
				setTimeout(function() {
					$("#select-stage").removeClass("animateContent2");
				}, 1000);
			}, 500);
			$(".screen").css({
				"background" : "url(./backimg/back1.gif)"
			});
			$(".gold").html(mainGold+gold);//골드 추가 부분
	}


	/* window size 변경 해주는 함수 */
	function windowsize() {
		var screen = document.getElementById("screen3");
		var bossui = document.getElementById("boss_UI3");
		var playerui = document.getElementById("player_UI3");
		wdht = (window.outerHeight - cvht) / 4;
		wdwd = (window.outerWidth - cvwd) / 2;
		//var buwd = ((window.outerWidth) / 2);
		screen.style.top = wdht + "px";
		screen.style.left = wdwd + "px";
		//button.style.left = buwd - 150 + "px";
		bossui.style.left = (wdwd - 200) + "px";
		bossui.style.top = wdht + "px";
		playerui.style.left = (wdwd + cvwd) + "px";
		playerui.style.top = (wdht) + "px";
	}


	/*---------------------------------------------------------게임시작 관련 함수---------------------------------------------------------*/
	/* 게임시작 버튼 눌렀을 때 동작하는 함수 */
	function wait() {
		repeat = setInterval(start, 1000);
	}

	function start() {
		context.clearRect(0, 0, cvwd, cvht);
		drawText(count);
		count--;
		if (count == -1) {
			clearInterval(repeat);
			count = 3;
			repeat = setInterval(draw,1);
			time_repeat = setInterval(timeAttack, 1000);
			addEventListener('mousemove', mousemove);
			addEventListener("keydown", keydown);
		}
	}

	/*---------------------------------------------------------게임시작 관련 함수---------------------------------------------------------*/






	/*---------------------------------------------------------그리는것 관련 함수---------------------------------------------------------*/
	/* 공의 x,y좌표 초기값을 설정 */
	function init() {
		screen = document.getElementById("screen3");
		context = screen.getContext("2d");
		x = barx;
		y = cvht - 20 - ballRadius-5;
		dx = 0;
		dy = 0;
	}

	function draw() {
		context.clearRect(0, 0, cvwd, cvht);
		$("#gold3").text("gold : "+gold);
		/* 보스 공격 관련 조건문 */
		if (eskill == 0) {
			if (attack1 == 1) {
				bossAttack1();
			}
			if (attack4 != 0) {
				bossAttack4();
			}
		}
		if (attack2 != 0) {
			bossAttack2();
		}
		/* drawPaddle 관련 위치 조건문 */
		if (barx > (cvwd - barwidth / 2)) {
			barx = cvwd - barwidth / 2;
		}
		else if (barx < barwidth / 2) {
			barx = barwidth / 2;
		}
		else {
		}

		/* 스페이스바 유무 관련 조건문 */
		if (start_number == 0) {
			x = barx;
		}

		/* 스킬 관련 조건문 */
		if (qskill == 1) {
			drawshield();
		}
		if (wskill == 1) {
			drawsword();
		}

		boss();
		drawBall();
		drawPaddle();
		collision();
	}

	/* 공 그리는 함수 */
	function drawBall() {
		context.beginPath();
		context.arc(x, y, ballRadius, 0, Math.PI * 2);
		if (attack3_count == 1) {
			context.fillStyle = "blue";
			context.drawImage(iceball_Img,x-ballRadius*2, y-ballRadius*2, ballRadius*5, ballRadius*5);
		}
		else {
			context.fillStyle = "black";
		}
		context.fill();
	}

	/* 바(bar) 그리는 함수 */
	function drawPaddle() {
		context.beginPath();
		context.rect((barx - barwidth / 2), cvht - 20, barwidth, barheight);
		context.fillStyle = "transparent";
		context.fill();
		context.drawImage(paddleImg, (barx - barwidth / 2), cvht - 20, barwidth, barheight);
	}

	/* 글씨 기본 설정 해주는 함수 */
	function drawText(text) {
		context.font = 'bold 100px arial';
		context.fillStyle = 'dodgerblue';
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillText(text, cvwd / 2, cvht / 2);
	}

	/* 벽돌 그려주는 함수 */
	function drawbrick() {
		var brickx;
		var bricky;
		for (var i = 0; i < cvwd / 120; i++) {
			brickx = i * 120;
			for (var j = 1; j < 2; j++) {
				bricky = j * 220;
				if (bricks[i] == 1) {
					context.beginPath();
					//context.rect(brickx, bricky, BRICKWIDTH, BRICKHEIGHT);
					context.drawImage(brick_Img,brickx, bricky, BRICKWIDTH, BRICKHEIGHT);
					//context.fillStyle = "blue";
					context.fill();
				}
			}
		}
	}

	function drawbrick2() {
		var brickx;
		var bricky;
		var wd = 120;
		var ht = 70;
		for (var i = 0; i < cvwd / 120; i++) {
			if (i == rand) {
				continue;
			}
			brickx = i * 120;
			for (var j = 1; j < 2; j++) {
				bricky = j * 300 + yplus;
				if (bricky > cvht) {
					if (rand == 0) {
						if (barx + barwidth / 2 < 120) {
						}
						else {
							if (qskill == 1) {
								qskill = 0;
							}
							else {
								p_hp_decrease();
							}
						}
					} else if (rand == 4) {
						if (barx - barwidth / 2 > 120 * (rand - 1) + wd) {
						}
						else {
							if (qskill == 1) {
								qskill = 0;
							}
							else {
								p_hp_decrease();
							}
						}
					}
					else {
						if (barx - barwidth / 2 > (rand - 1) * 120 + wd && barx + barwidth / 2 < (rand + 1) * 120) {
						} else {
							if (qskill == 1) {
								qskill = 0;
							}
							else {
								p_hp_decrease();
							}
						}
					}
					clearInterval(attack4_timer);
					attack4_img = 1;
					attack4 = 0;
					yplus = 0;
					falling_attack_Img.src = "./img/stage3/m1.png";

					for (var r = 0; r < attack_bricks.length; r++) {
						attack_bricks[r] = 0;
					}
					break;
				}
				if (attack_bricks[i] == 1) {
					context.drawImage(falling_attack_Img,brickx, bricky, wd, ht);
			}
		}
	}
}


	function drawshield() {
		context.beginPath();
		context.arc(barx, cvht - 20, barwidth / 2, Math.PI, 0);
		context.strokeStyle = "yellow";
		context.stroke();
	}

	/*w키를 누르면 검격이 나가게 보여주는 함수 */
	function drawsword() {
		context.drawImage(wskill_Img, attack_x - 15, ypl, 30, 100);
	}


	/* 보스를 그려주는 함수 */
	function boss() {
		bossx = (cvwd - bosswd) / 2;
		bossy = 10;
		context.beginPath();
		context.rect(bossx, bossy, bosswd, bossht);
		if (eskill == 1) {
			context.fillStyle = "blue";
		}
		else {
			context.fillStyle = "transparent";
		}
		context.fill();


		context.drawImage(bossImg, bossx, bossy, bosswd, bossht);

	}

	function b_hp_decrease() {
		var num = b_hp * 15;
		if(b_hp != 0){
			document.getElementsByClassName('character')[4].src = bossattacked.src;
			setTimeout(function(){
				document.getElementsByClassName('character')[4].src = "./img/stage3/boss3.gif";
			},1000);
		}
		$("#container3").animate({
			"height": num + "px"
		});
		bossAudio.play();
		if (b_hp < 0 || b_hp == 0) {
			game_over(1);
			game_over_win_Img();
		}
		else{
			b_hp_decrease_Img();
		}
	}

	//보스 체력 감소시 플레이어 공격모션
	function b_hp_decrease_Img() {
		var playerImg = $("#playerImg3");
		if(playerColor == "default"){
			playerImg.attr("src", pDefaultAttacksrc);
		}
		else if(playerColor == "red"){
			playerImg.attr("src", pRedAttacksrc);
		}
		else if(playerColor == "cyan"){
			playerImg.attr("src", pCyanAttacksrc);
		}
		else if(playerColor == "purple"){
			playerImg.attr("src", pPurpleAttacksrc);
		}	
		else if(playerColor == "yellow"){
			playerImg.attr("src", pYellowAttacksrc);
		}
		else if(playerColor == "white"){
			playerImg.attr("src", pWhiteAttacksrc);
		}
	
		setTimeout(function () {
		
			if(playerColor == "default"){
				playerImg.attr("src", pDefaultStdsrc);
			}
			else if(playerColor == "red"){
				playerImg.attr("src", pRedStdsrc);
			}
			else if(playerColor == "cyan"){
				playerImg.attr("src", pCyanstdsrc);
			}
			else if(playerColor == "purple"){
				playerImg.attr("src", pPurplestdsrc);
			}	
			else if(playerColor == "yellow"){
				playerImg.attr("src", pYellowstdsrc);
			}
			else if(playerColor == "white"){
				playerImg.attr("src", pWhitestdsrc);
			}
		
		}, 1000);
	}

	function p_hp_decrease() {
		var p_hp_array = $(".state3");
		p_hp_array[p_hp].src = "./img/player/playerHeartEmpty_25x25.png";
		p_hp++;


		if (p_hp == 1 || p_hp == 2) {
			p_hp_decrease_Img();
		}
		if (p_hp == 3) {
			game_over_Img();
			game_over(2);
			clearInterval(repeat);
			removeEventListener('keydown', keydown);
			removeEventListener('mousemove', mousemove);
			setTimeout(function(){
				$("#boss_UI3").css({
					display : "block"
				});
				$("#player_UI3").css({
					display : "block"
				});
				$("#screen3").css({
					display : "block"
				});
				$("#esc_menu3").css({
					display : "none"
				});
				esc_count = 0;
				keydown_count = 0;
				if(attack1 == 1){
					attack1 = 0;
					check = 0;
					attack1_timer = 0;
					attack1_img_count = 0;
					attack1_img = 1;
					bsimg.src = "./img/stage3/ba"+attack1_img+".png";
					razer_Img.src = "./img/stage3/l2.png";
					clearInterval(attack1_repeat);
				}
				else if(attack3 == 1){
					attack3 = 0;
					clearInterval(attack3_repeat);
					attack3_timer = 0;
					attack3_count = 0;
				}
				else if (attack4 == 1){
					attack4 = 0;
					attack4_count = 0;
					clearInterval(attack4_timer);
					attack4_img_count = 0;
					attack4_img = 1;
					yplus = 0;
					for (var r = 0; r < attack_bricks.length; r++) {
						attack_bricks[r] = 0;
					}
				}
				if(qskill_cooltime == 1){
					clearInterval(qskill_repeat);
					qskill_cooltime = 0;
					qskill = 0;
					qskill_timer = 30;
					$("#qskill3").css({
						"display": "block"
					});
					$("#qtimer3").css({
						"display": "none"
					});
				}
	
				if(wskill_cooltime == 1){
					clearInterval(wskill_repeat);
					clearInterval(wskill_repeat2);
					wskill_cooltime = 0;
					wskill = 0;
					wskill_count = 0;
					wskill_timer = 10;
					wskill_Img.src = "./img/stage3/blast1.png";
					wskill_img_count = 0;
					wskill_img = 1;
					$("#wskill3").css({
						"display": "block"
					});
					$("#wtimer3").css({
						"display": "none"
					});
				}
				if(eskill_state == 1){
					clearInterval(eskill_repeat);
					clearInterval(eskill_timer);
					eskill = 0;
					eskill_count = 0;
					eskill_cooltime = 15;
					eskill_state = 0;
					$("#eskill3").css({
						"display": "block"
					});
					$("#etimer3").css({
						"display": "none"
					});
				}
				clearInterval(time_repeat);
				init();
				p_hp = 0;
				b_hp = 20;
				$("#container3").animate({
					"height": b_hp*15 + "px"
				});
				var p_hp_array = $(".state3");
				for(var i=0; i<3; i++){
					p_hp_array[i].src = "./img/player/playerHeartFull_25x25.png";
				}
				
				$("#stage3").removeClass("animateContent2").addClass("animateContent1");  // 스테이지3 esc화면 줄어드는 애니메이션
				setTimeout(function() {
					$("#stage3").removeClass("animateContent1").hide();   // 스테이지3 esc화면 none해주고
					$("#select-stage").show().addClass("animateContent2");         // 다시 스테이지 선택 페이지 나타나게
					setTimeout(function() {
						$("#select-stage").removeClass("animateContent2");
					}, 1000);
				}, 500);
				$(".screen").css({
					"background" : "url(./backimg/back1.gif)"
				});
				
			}, 4000);
		}
	}

	function p_hp_decrease_Img() {
		var playerImg = $("#playerImg3");

		
		var p_ImgBlankInterval = setInterval(function () {
			if(playerColor == "default"){
				if (playerImg.attr("src") === pDefaultStdsrc) {
					playerImg.attr("src", pDefaultHitsrc);
				}
				else {
					playerImg.attr("src", pDefaultStdsrc);
				}
			}
			else if(playerColor == "red"){
				if (playerImg.attr("src") === pRedStdsrc) {
					playerImg.attr("src", pRedHItsrc);
				}
				else {
					playerImg.attr("src", pRedStdsrc);
				}
			}
			else if(playerColor == "cyan"){
				if (playerImg.attr("src") === pCyanstdsrc) {
					playerImg.attr("src", pCyanHitsrc);
				}
				else {
					playerImg.attr("src", pCyanstdsrc);
				}
			}
			else if(playerColor == "purple"){
				if (playerImg.attr("src") === pPurplestdsrc) {
					playerImg.attr("src", pPurpleHitsrc);
				}
				else {
					playerImg.attr("src", pPurplestdsrc);
				}
			}	
			else if(playerColor == "yellow"){
				if (playerImg.attr("src") === pYellowstdsrc) {
					playerImg.attr("src", pYellowHitsrc);
				}
				else {
					playerImg.attr("src", pYellowstdsrc);
				}
			}
			else if(playerColor == "white"){
				if (playerImg.attr("src") === pWhitestdsrc) {
					playerImg.attr("src", pWhiteHitsrc);
				}
				else {
					playerImg.attr("src", pWhitestdsrc);
				}
			}



			
		}, 100);
		setTimeout(function () {
			clearInterval(p_ImgBlankInterval);
			if(playerColor == "default"){
				playerImg.attr("src", pDefaultStdsrc);
			}
			else if(playerColor == "red"){
				playerImg.attr("src", pRedStdsrc);
			}
			else if(playerColor == "cyan"){
				playerImg.attr("src", pCyanstdsrc);
			}
			else if(playerColor == "purple"){
				playerImg.attr("src", pPurplestdsrc);
			}	
			else if(playerColor == "yellow"){
				playerImg.attr("src", pYellowstdsrc);
			}
			else if(playerColor == "white"){
				playerImg.attr("src", pWhitestdsrc);
			}

		}, 500);
	}

	function game_over(who) {
		keydown_count = 1;
		removeEventListener('mousemove', mousemove);
		clearInterval(repeat);
		clearInterval(attack1_repeat);
		clearInterval(attack3_repeat);
		clearInterval(attack4_timer);
		clearInterval(time_repeat);
		context.clearRect(0, 0, cvwd, cvht);
		if (who == 1) {
			drawText("You Win");
			$(".gold").html(mainGold+gold);//골드 추가 부분
		}
		else if (who == 2) {
			drawText("You Lose");
		}
	}
	/* 플레이어, 보스 체력 출력해주는 함수 */
	function hp() {
		var t1 = "player의 체력 : " + p_hp;
		$("#ptext3").text(t1);
		$("#bp_num3").text(b_hp);
	}

	function game_over_Img() {
		var playerImg = $("#playerImg3");
		if(playerColor == "default"){
			playerImg.attr("src",  "./img/player/playerLose_32x32.gif");
		}
		else if(playerColor == "red"){
			playerImg.attr("src",  "./img/player/playerLose_red_32x32.gif");
		}
		else if(playerColor == "cyan"){
			playerImg.attr("src",  "./img/player/playerLose_cyan_32x32.gif");
		}
		else if(playerColor == "purple"){
			playerImg.attr("src",  "./img/player/playerLose_purple_32x32.gif");
		}	
		else if(playerColor == "yellow"){
			playerImg.attr("src",  "./img/player/playerLose_yellow_32x32.gif");
		}
		else if(playerColor == "white"){
			playerImg.attr("src", "./img/player/playerLose_white_32x32.gif");
		}
	}

	function game_over_win_Img(){
		var playerImg = $("#playerImg3");
		if(playerColor == "default"){
			playerImg.attr("src",  "./img/player/playerWin_default.gif");
		}
		else if(playerColor == "red"){
			playerImg.attr("src",  "./img/player/playerWin_red.gif");
		}
		else if(playerColor == "cyan"){
			playerImg.attr("src", "./img/player/playerWin_cyan.gif");
		}
		else if(playerColor == "purple"){
			playerImg.attr("src",  "./img/player/playerWin_purple.gif");
		}	
		else if(playerColor == "yellow"){
			playerImg.attr("src",  "./img/player/playerWin_yellow.gif");
		}
		else if(playerColor == "white"){
			playerImg.attr("src", "./img/player/playerWin_white.gif");
		}

	}

	/*---------------------------------------------------------그리는것 관련 함수---------------------------------------------------------*/


	/* 충돌 감지 */
	function collision() {
		var brickx;
		var bricky;
		var dxf = dx;
		if (dxf < 0) {
			dxf = -dxf;
		}

		for (var i = 0; i < cvwd / 120; i++) {
			brickx = i * 120;
			for (var j = 1; j < 2; j++) {
				bricky = j * 220;
				if (bricks[i] == 1) {
					if(wskill == 1){
						if(ypl <= bricky + BRICKHEIGHT && ypl+100 >= bricky &&attack_x + 30 >= brickx && attack_x <= brickx + BRICKWIDTH){
							ypl = 480;
							clearInterval(wskill_repeat2);
							wskill_count = 0;
							wskill = 0;
							wskill_Img.src = "./img/stage3/blast1.png";
							wskill_img_count = 0;
							wskill_img = 1;
							blood(brickx);
							context.clearRect(brickx, bricky, BRICKWIDTH, BRICKHEIGHT);
							bricks[i] = 0;
												
						}
					}
					if (y > bricky + BRICKHEIGHT && y < bricky + BRICKHEIGHT + ballRadius && brickx + BRICKWIDTH > x && brickx < x) { //벽돌의 아래 부분과 충돌
						context.clearRect(brickx, bricky, BRICKWIDTH, BRICKHEIGHT);
						bricks[i] = 0;
						dy = -dy;
						brickAudio.play();
						blood(brickx);
					}
					if (x > brickx - ballRadius - dxf && x < brickx && y < bricky + BRICKHEIGHT + ballRadius && y > bricky - ballRadius) { //벽돌의 왼쪽 부분과 충돌
						context.clearRect(brickx, bricky, BRICKWIDTH, BRICKHEIGHT);
						bricks[i] = 0;
						dx = -dx;
						brickAudio.play();
						blood(brickx);
					}
					if (x < brickx + BRICKWIDTH + ballRadius + dxf && x > brickx + BRICKWIDTH && y < bricky + BRICKHEIGHT + ballRadius && y > bricky - ballRadius) { // 벽돌의 오른쪽 부분과 충돌
						context.clearRect(brickx, bricky, BRICKWIDTH, BRICKHEIGHT);
						bricks[i] = 0;
						dx = -dx;
						brickAudio.play();		
						blood(brickx);
					}
					if (brickx + BRICKWIDTH > x && brickx < x && y > bricky - ballRadius && y < bricky) { // 벽돌의 윗 부분과 충돌
						context.clearRect(brickx, bricky, BRICKWIDTH, BRICKHEIGHT);
						bricks[i] = 0;
						dy = -dy;
						brickAudio.play();				
						blood(brickx);
					}
				}
			}
		}
	
		
		if ((x < bossx & x > bossx - ballRadius - dxf & y < bossy + bossht + ballRadius & y > bossy - ballRadius) || (x < bossx + bosswd + ballRadius + dxf & x > bossx + bosswd & y < bossy + bossht + ballRadius & y > bossy - ballRadius)) { //보스의 왼쪽, 오른쪽에 충돌
			dx = -dx;
			b_hp--;
			hp();
			b_hp_decrease();
		}
		else if ((y > bossy + bossht & y < bossy + bossht + ballRadius + yvelocity & x > bossx - ballRadius & x < bossx + bosswd + ballRadius) || (y < bossy & y > bossy - ballRadius - yvelocity & x > bossx - ballRadius & x < bossx + bosswd + ballRadius)) { //보스의 위, 아래에 충돌
			dy = -dy;
			b_hp--;
			hp();
			b_hp_decrease();

		}

		if ((y > (cvht - 20 - ballRadius - yvelocity))) {
			if (x > barx + (barwidth / 2 + ballRadius) || x < barx - (barwidth / 2 + ballRadius) && start_number == 1) { //바의 영역에서 벗어난 경우
				if (y > (cvht - 20 - yvelocity)) {
					ballRadius = 10;
					init();
					draw();
					p_hp_decrease();
					start_number = 0;
					keydown_count = 0;
				}
			} else if (x > barx - (barwidth / 2 + ballRadius) && x < barx + (barwidth / 2 + ballRadius)&&start_number == 1) { //바의 영역에 있는 경우	
				if(dy > 0){
					gold += 5;
					swingAudio.play();
				}
				dx = xvelocity * (x - barx) / (barwidth + ballRadius / 2);
				dy = -dy;
			} else { //바의 영역의 마지노선에 맞닿는 경우
				if(dy > 0){
					gold += 5;
					swingAudio.play();
				}
				dy = -dy;
				dx = -dx;
			}
		}
		else if (y < ballRadius) { //위쪽 벽면에 부딪히는 경우
			dy = -dy;
		}

		if (x < ballRadius) { // 왼쪽 벽면에 부딪히는 경우
			dx = -dx;
		}
		else if (x > cvwd - ballRadius) { // 오른쪽 벽면에 부딪히는 경우
			dx = -dx;
		}
		y += dy;
		x += dx;

	}


	function blood(index){
		blood_repeat = setInterval(function(){
			context.drawImage(blood_img,index,160,154, 140);
		},1);
		blood_img.src = "./img/stage3/blood2.png";
		setTimeout(function(){
			blood_img.src = "./img/stage3/blood3.png";
			setTimeout(function(){
				blood_img.src = "./img/stage3/blood4.png";
				setTimeout(function(){
					blood_img.src = "./img/stage3/blood5.png";
					setTimeout(function(){
						blood_img.src = "./img/stage3/blood6.png";
						setTimeout(function(){
							blood_img.src = "./img/stage3/blood7.png";
							setTimeout(function(){
								blood_img.src = "./img/stage3/blood8.png";
								setTimeout(function(){
									blood_img.src = "./img/stage3/blood1.png";
									clearInterval(blood_repeat);	
								},20);
							},20);
						},20);
					},20);
				},20);
			},20);
		},20);
	}





	/*---------------------------------------------------------마우스, 키보드 이벤트리스너---------------------------------------------------------*/

	/* 스페이스바를 누를 경우 공 발사
	스페이스바를 누르면 start_number 변수에 1값이 대입되고, 스킬을 사용할 수 있게 됨 */
	function keydown(event) {
		if(event.keyCode == 27 && esc_count == 0){
			$("#boss_UI3").css({
				display : "none"
			});
			$("#player_UI3").css({
				display : "none"
			});
			$("#screen3").css({
				display : "none"
			});
			$("#esc_menu3").css({
				display : "block"
			});
			esc_count = 1;
			keydown_count = 1;
			removeEventListener('mousemove', mousemove);
			clearInterval(repeat);
			if(attack1 == 1){
				clearInterval(attack1_repeat);
				stop_pattern = 1;
			}
			else if(attack3 == 1){
				clearInterval(attack3_repeat);
				stop_pattern = 3;
			}
			else if (attack4 == 1){
				clearInterval(attack4_timer);
				stop_pattern = 4;
			}
			if(qskill_cooltime == 1){
				clearInterval(qskill_repeat);
				qstop_pattern = 1;
			}

			if(wskill_cooltime == 1){
				clearInterval(wskill_repeat);
				clearInterval(wskill_repeat2);
				wstop_pattern = 1;
			}
			if(eskill_state == 1){
				clearInterval(eskill_repeat);
				clearInterval(eskill_timer);
				estop_pattern = 1;
			}
			clearInterval(time_repeat);
		}
		else if(event.keyCode == 27 && esc_count == 1){
			$("#boss_UI3").css({
				display : "block"
			});
			$("#player_UI3").css({
				display : "block"
			});
			$("#screen3").css({
				display : "block"
			});
			$("#esc_menu3").css({
				display : "none"
			});
			esc_count = 0;
			keydown_count = 0;
			addEventListener('mousemove', mousemove);
			repeat = setInterval(draw,1);
			time_repeat = setInterval(timeAttack,1000);
			if(stop_pattern == 1){	
				attack1_repeat = setInterval(bossAttack1_timer, 1000);
			}
			else if(stop_pattern == 3){
				attack3_repeat = setInterval(bossAttack3_timer, 1000); 
			}
			else if(stop_pattern == 4){
				attack4_timer = setInterval(bossAttack4_timer, 200);
			}
			if(qstop_pattern == 1){
				qskill_repeat = setInterval(skill_timer1,1000);
				qstop_pattern = 0;
			}
			if(wstop_pattern == 1){
				wskill_repeat = setInterval(skill_timer2, 1000);
				wskill_repeat2 = setInterval(wskill_time, 1);
				wstop_pattern = 0;
			}
			if(estop_pattern == 1){
				eskill_timer = setInterval(eskill_time, 1000);
				eskill_repeat = setInterval(skill_timer3, 1000);
				estop_pattern = 0;
			}
			stop_pattern = 0;
		}
		if(keydown_count == 0){
			if (start_number == 0) {
				//스페이스바를 누를경우
				if (event.keyCode == 32) {
					start_number = 1;
					dy = -yvelocity;
					if (drawinterval == 0) {
						repeat = setInterval(draw, 1);
					}
				}
			}
			else if (start_number == 1) {
				//q를 누를경우
				if (qskill_cooltime == 0 && qskill == 0 && event.keyCode == 81) { //쿨타임이 아니고, 보호막이 활성화되지 않을 때 사용 가능
					qskill = 1; //이 변수가 1일 때 보호막 활성화
					$("#qskill3").css({ //스킬 이미지를 지우고 쿨타임 글씨 영역 활성화
						"display": "none"
					});
					$("#qtimer3").css({
						"display": "block"
					});
					$("#qtimer3").text(qskill_timer); //쿨타임 글씨 활성화
					qskill_repeat = setInterval(skill_timer1, 1000);
					qskill_cooltime = 1;
				}
				else if (wskill_cooltime == 0 && wskill == 0 && event.keyCode == 87) {
					wskill = 1; //이 변수가 1일 때 보호막 활성화
					wskill_count = 0;
					attack_x = barx;
					$("#wskill3").css({ //스킬 이미지를 지우고 쿨타임 글씨 영역 활성화
						"display": "none"
					});
					$("#wtimer3").css({
						"display": "block"
					});
					$("#wtimer3").text(wskill_timer); //쿨타임 글씨 활성화
					wskill_repeat = setInterval(skill_timer2, 1000);
					wskill_cooltime = 1;
					wskill_repeat2 = setInterval(wskill_time, 1);
				}
				else if (event.keyCode == 69 && eskill == 0 && eskill_cooltime == 15) {
					eskill = 1;
					eskill_count = 0;
					eskill_timer = setInterval(eskill_time, 1000);
					eskill_repeat = setInterval(skill_timer3, 1000);
					eskill_state = 1;
					$("#eskill3").css({ //스킬 이미지를 지우고 쿨타임 글씨 영역 활성화
						"display": "none"
					});
					$("#etimer3").css({
						"display": "block"
					});
					$("#etimer3").text(eskill_cooltime); //쿨타임 글씨 활성
				}
			}
		}
	}

	function skill_timer1() {
		qskill_timer--;
		if (qskill_timer == 28) {
			qskill = 0;
		}
		else if (qskill_timer == -1) {
			qskill_timer = 30;
			clearInterval(qskill_repeat);
			$("#qskill3").css({
				"display": "block"
			});
			$("#qtimer3").css({
				"display": "none"
			});
			qskill_cooltime = 0;
		}
		$("#qtimer3").text(qskill_timer);
	}

	function skill_timer2() {
		wskill_timer--;
		if (wskill_timer == -1) {
			wskill_timer = 10;
			clearInterval(wskill_repeat);
			$("#wskill3").css({
				"display": "block"
			});
			$("#wtimer3").css({
				"display": "none"
			});
			wskill_cooltime = 0;
		}
		$("#wtimer3").text(wskill_timer);
	}

	function skill_timer3() {
		eskill_cooltime--;
		if (eskill_cooltime == -1) {
			eskill_cooltime = 15;
			eskill_state = 0;
			$("#eskill3").css({
				"display": "block"
			});
			$("#etimer3").css({
				"display": "none"
			});
			clearInterval(eskill_repeat);
		}
		$("#etimer3").text(eskill_cooltime);
	}

	/* 1개의 검이 떨어지는 움직임을 재현해주는 함수 */
	function wskill_time() {
		ypl = ypl - 2; // Y좌표는 2칸씩 이동
		wskill_img_count++;
		if(wskill_img_count % 50 ==0){
			wskill_img++;
			if(wskill_img > 3){
				wskill_Img.src = "./img/stage3/blast3.png";
			}
			else{
				wskill_Img.src = "./img/stage3/blast"+wskill_img+".png";
			}
		}
		if (wskill_count == 0 && ypl < bossy + bossht && attack_x + 30 >= bossx && attack_x <= bossx + bosswd) {
			b_hp_decrease();
			wskill_count = 1;
			wskill = 0;
			wskill_Img.src = "./img/stage3/blast1.png";
			wskill_img_count = 0;
			wskill_img = 1;
		}

		if (ypl + 100 == 0) { //검이 영역 밖으로 나갔을 경우 함수 종료
			ypl = 480;
			clearInterval(wskill_repeat2);
			wskill_count = 0;
			wskill = 0;
			wskill_Img.src = "./img/stage3/blast1.png";
			wskill_img_count = 0;
			wskill_img = 1;
		}
	}

	function eskill_time() {
		eskill_count++;
		if (eskill_count == 4) {
			eskill = 0;
			clearInterval(eskill_timer);
		}
	}

	/* 마우스 움직임에 따라 바를 다시 그리는 함수 */
	//영역 밖을 나갈시 최대 영역으로 바를 그림
	function mousemove(event) {
		barx = event.clientX - wdwd;
	}

	/*---------------------------------------------------------마우스, 키보드 이벤트리스너---------------------------------------------------------*/









	/*---------------------------------------------------------보스 공격패턴 함수---------------------------------------------------------*/

	function timeAttack() {
		if (eskill != 1) {
			timer += 1;
			if (timer % 6 == 0) {
				var randnum = Math.floor(Math.random()*4);
				if (randnum == 0) {
					attack1 = 1;
					attack1_repeat = setInterval(bossAttack1_timer, 1000);
				}
				else if (randnum == 1) {
					for (var i = 0; i < bricks.length; i++) {
						bricks[i] = 1;
					}
					attack2 = 1;
				}
				else if (randnum == 2) {
					attack3 = 1;
					bossAttack3();
					attack3_repeat = setInterval(bossAttack3_timer, 1000);
					attack3_count = 1;
				}
				else if (randnum == 3) {
					attack4 = 1;
					attack4_count = 0;
					rand = Math.floor(Math.random() * 5);
					for (var i = 0; i < attack_bricks.length; i++) {
						if (i == rand) {
							continue;
						}
						attack_bricks[i] = 1;
					}
					drawbrick2();
					attack4_timer = setInterval(bossAttack4_timer, 200);
				}

			}
		}
		else {
			if (attack1 == 1) {
				attack1 = 0;
				check = 0;
				attack1_timer = 0;
				attack1_img_count = 0;
				attack1_img = 1;
				bsimg.src = "./img/stage3/ba"+attack1_img+".png";
				razer_Img.src = "./img/stage3/l2.png";
				clearInterval(attack1_repeat);
			}
			else if (attack3 == 1) {
				attack3 = 0;
				clearInterval(attack3_repeat);
				attack3_timer = 0;
				attack3_count = 0;
			}
			else if (attack4 == 1) {
				attack4 = 0;
				attack4_count = 0;
				clearInterval(attack4_timer);
				attack4_img_count = 0;
				attack4_img = 1;
				yplus = 0;
				for (var r = 0; r < attack_bricks.length; r++) {
					attack_bricks[r] = 0;
				}
			}
		}
		$("#timer3").text(timer);
	}

	function bossAttack1_timer() {
		attack1_timer += 1;
	}

	/* 레이저 공격 */
	function bossAttack1() {
		if (attack1_timer == 3) { //3초 후에 사용자의 직전의 x좌표에 1초동안 머무름.
			context.drawImage(bsimg,coordinate,100,60,72);
			if(attack1_img_count == 1){
				context.drawImage(razer_Img,coordinate,150,60,cvht-150);
			}
		}
		else if (attack1_timer == 4) { //1초 경과시 패들이 위치에 존재하면 사용자의 hp --
			context.drawImage(bsimg,coordinate,100,60,72);
			context.drawImage(razer_Img ,coordinate, 150, 60, cvht-150);
			if (check == 0 && barx - barwidth / 2 < coordinate && barx + barwidth / 2 > coordinate) {
				if (qskill == 1) {
					qskill = 0;
				}
				else {
					p_hp_decrease();
				}
				check = 1;
			}
		}
		else if (attack1_timer == 5) {
			attack1 = 0;
			check = 0;
			attack1_timer = 0;
			attack1_img_count = 0;
			attack1_img = 1;
			bsimg.src = "./img/stage3/ba"+attack1_img+".png";
			razer_Img.src = "./img/stage3/l2.png";
			clearInterval(attack1_repeat);
		}
		else{ //3초동안 사용자의 패들의 x좌표를 따라감
			context.drawImage(bsimg,barx-30,100,60,72);
			coordinate = barx-30;
			if(attack1_img_count == 1){
				context.drawImage(razer_Img,barx-30,150,60,cvht-150);
			}
		}

		if(attack1_timer == 1 && attack1_img_count == 0){
			setTimeout(function(){
				attack1_repeat2 = setInterval(lazerimage,200);
			},600);
			attack1_img_count = 1;
		}
	}

	function lazerimage(){
		attack1_img++;
		if(attack1_img == 14){
			clearInterval(attack1_repeat2);
		}
		razer_Img.src = "./img/stage3/l"+(attack1_img+1)+".png";
		bsimg.src = "./img/stage3/ba"+attack1_img+".png";
	}

	/* 벽돌 소환으로 방어 */
	function bossAttack2() {
		drawbrick();
	}

	/* 공 정지 공격 */
	function bossAttack3_timer() {
		attack3_timer += 1;
		if (attack3_timer == 3) {
			attack3_timer = 0;
			dx = xmemory;
			dy = ymemory;
			attack3 = 0;
			attack3_count = 0;
			clearInterval(attack3_repeat);
		}
	}

	function bossAttack3() {
			xmemory = dx;
			ymemory = dy;
			dx = 0;
			dy = 0;
			stop_state = 1;
	}

	/* 벽돌 내려오면서 공격 */
	function bossAttack4_timer() {
		yplus = yplus*2 + 1;
	}

	function bossAttack4() {
		drawbrick2();
		attack4_img_count++;
		if(attack4_img_count % 10 ==0){
			attack4_img++;
			if(attack4_img == 25){
				attack4_img = 17;
				falling_attack_Img.src = "./img/stage3/m24.png";
			}
			else{
				falling_attack_Img.src = "./img/stage3/m"+attack4_img+".png"; 
			}
		}
	}
	/*---------------------------------------------------------보스 공격패턴 함수---------------------------------------------------------*/
	


	/*---------------------------------------------------------효과음 함수---------------------------------------------------------*/

	}

