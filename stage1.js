export function stageStart1() {
	/* 플레이어 스킬 변수 */
	var qskill = 0;
	var qskill_timer = 30;
	var qskill_repeat;
	var qskill_cooltime = 0;

	/* 보스의 공격이 일정시간마다 진행되기위해 필요한 변수 */
	var timer = 0;
	var time_repeat;
	var attack_time_repeat;
	var attack_time_count = 0;
	var bs_attack = 0;
	var bs_attacked = 0;

	var attack1 = 0;
	var bs_barrier = 0;
	var attack1_img_count = 0;
	var attack1_img = 1;
	var attack1_repeat;

	var attack2 = 0;
	var yplus = 100;
	var attack_x;
	var attack2_repeat;
	var attack2_count = 0;
	var attack2_img_count = 0;
	var attack2_img = 1;


	var attack3 = 0;
	var attack3_img_count = 0;
	var attack3_img = 1;
	var attack3_count = 0;

	/* 스페이스바를 누르면 start_number = 1로 변경 되면서 공이 발사됨 */
	var start_number = 0;
	var keydown_count = 0;
	var esc_count = 0;
	var stop_pattern;
	var qstop_pattern;
	var gold = 0;
	var drawinterval;

	/*canvas 너비, 높이 */
	var cvwd = 600;
	var cvht = 600;

	/* 벽돌의 x,y좌표 */
	var bricks = [0, 0, 0, 0, 0];
	var BRICKWIDTH = 119;
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
	var b_hp = 10;
	//플레이어 이미지

	var bossStanding = document.getElementsByClassName("character");
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
		$("#playerImg1").attr("src", pDefaultStdsrc);
		playerColor = "default";
	}
	else if ($("#pRed").hasClass("equip")) {
		$("#playerImg1").attr("src", pRedStdsrc);
		playerColor = "red";
	}
	else if ($("#pCyan").hasClass("equip")) {
		$("#playerImg1").attr("src", pCyanstdsrc);
		playerColor = "cyan";
	}
	else if ($("#pWhite").hasClass("equip")) {
		$("#playerImg1").attr("src", pWhitestdsrc);
		playerColor = "white";
	}
	else if ($("#pYellow").hasClass("equip")) {
		$("#playerImg1").attr("src", pYellowstdsrc);
		playerColor = "yellow";
	}
	else if ($("#pPurple").hasClass("equip")) {
		$("#playerImg1").attr("src", pPurplestdsrc);
		playerColor = "purple";
	}

	var fireball = new Image();
	fireball.src = "./img/stage1/af1.png";
	var bossImg = new Image(); // in canvas
	bossImg.src = "./img/stage1/boss1.gif";
	var bossshield_Img=new Image();
	bossshield_Img.src="./img/stage1/s1.png";
	var sword_Img=new Image();
	sword_Img.src="./img/stage1/a1.png";
	var paddleImg = new Image();
	paddleImg.src = "./img/player/paddle.png";

	//오디오 소스
	const brickAudio = new Audio('./audio/brickbreak.mp3');
	const swingAudio = new Audio('./audio/swing.mp3');
	const bossAudio=new Audio('./audio/bosshit.mp3');

	pageLoad();
	wait();

	/* 윈도우 창 크기를 변경할 때마다 canvas 크기도 변경 */
	hp();
	init();
	draw();


	function pageLoad(){
		$("#UI1").css({
			"display" : "block"
		});
		$("#PUI1").css({
			"display" : "block"
		});
		var play_button = document.getElementById("play1");
		play_button.onclick = play;
		var exit_button = document.getElementById("exit1");
		exit_button.onclick = exit;
		$(".screen").css({
			"background" : "url(./backimg/back2.gif)"
		});
	}

	function play(){
		$("#boss_UI1").css({
			display : "block"
		});
		$("#player_UI1").css({
			display : "block"
		});
		$("#screen1").css({
			display : "block"
		});
		$("#esc_menu1").css({
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
		else if(stop_pattern == 3){
			attack3 = 1;
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
		$("#boss_UI1").css({
			display : "block"
		});
		$("#player_UI1").css({
			display : "block"
		});
		$("#screen1").css({
			display : "block"
		});
		$("#esc_menu1").css({
			display : "none"
		});
		esc_count = 0;
		keydown_count = 0;
		removeEventListener('keydown', keydown);
		removeEventListener('mousemove', mousemove);
		clearInterval(repeat);
		if(attack1 == 1){
			clearInterval(attack1_repeat);
			attack1 = 0;
			attack1_img_count = 0;
			attack1_img = 1;
		}
		else if(attack2 == 1){
			attack2 = 0;
			yplus = 100;
			attack2_img = 1;
			attack2_img_count = 0;
			clearInterval(attack2_repeat);
			attack2_count = 0;
		}
		else if(attack3 == 1){
			attack3_img = 1;
			attack3_img_count = 0;
			attack3 = 0;
			attack3_count = 0;
			fireball.src = "./img/stage1/af"+attack3_img+".png";
		}
		ballRadius = 10;
		barwidth = 100;
		if(qskill_cooltime== 1){
			clearInterval(qskill_repeat);
			qskill_cooltime = 0;
			qskill = 0;
			qskill_timer = 30;
			$("#qskill1").css({
				"display": "block"
			});
			$("#qtimer1").css({
				"display": "none"
			});
		}
		clearInterval(time_repeat);
		init();
		p_hp = 0;
		b_hp = 10;
		$("#container1").animate({
			"height": b_hp*30 + "px"
		});
		var p_hp_array = $(".state1");
		for(var i=0; i<3; i++){
			p_hp_array[i].src = "./img/player/playerHeartFull_25x25.png";
		}
		
		$("#stage1").removeClass("animateContent2").addClass("animateContent1");  // 스테이지3 esc화면 줄어드는 애니메이션
		setTimeout(function() {
			$("#stage1").removeClass("animateContent1").hide();   // 스테이지3 esc화면 none해주고
			$("#select-stage").show().addClass("animateContent2");         // 다시 스테이지 선택 페이지 나타나게
			setTimeout(function() {
				$("#select-stage").removeClass("animateContent2");
			}, 1000);
		}, 500);
		$(".gold").html(mainGold+gold);//골드 추가 부분
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
		screen = document.getElementById("screen1");
		context = screen.getContext("2d");
		x = barx;
		y = cvht - 20 - ballRadius;
		dx = 0;
		dy = 0;
	}

	function draw() {
		context.clearRect(0, 0, cvwd, cvht);
		/* 보스 공격 관련 조건문 */

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
		boss();
		drawBall();
		drawPaddle();
		collision();
		if (attack1 == 1) {
			bossAttack1();
		}
		else if (attack2 == 1) {
			bossAttack2();
		}
		else if(attack3 == 1){
			bossAttack3();
		}
	}

	/* 공 그리는 함수 */
	function drawBall() {
		context.beginPath();
		context.arc(x, y, ballRadius, 0, Math.PI * 2);
		context.fillStyle = "black";
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
		context.font = 'bold 70px arial';
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
					context.rect(brickx, bricky, BRICKWIDTH, BRICKHEIGHT);
					context.fillStyle = "blue";
					context.fill();
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


	/* 보스를 그려주는 함수 */
	function boss() {
		bossx = (cvwd - bosswd) / 2;
		bossy = 10;
		context.drawImage(bossImg, bossx, bossy, bosswd, bossht);
	}

	function b_hp_decrease() {
		b_hp--;
		bossAudio.play();
		hp();
		var num = b_hp * 30;
		$("#container1").animate({
			"height": num + "px"
		});
		if (b_hp < 0 || b_hp == 0) {
			game_over(1);
		}
		else {
			attackedmotion();
			b_hp_decrease_Img();
		}


	}




	function b_hp_decrease_Img() {
		var playerImg = $("#playerImg1");
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
		var p_hp_array = $(".state1");
		p_hp_array[p_hp].src = "./img/player/playerHeartEmpty_25x25.png";
		p_hp++;

		if(p_hp == 1 || p_hp == 2){
			p_hp_decrease_Img();
		}
		if(p_hp == 3){
			game_over_Img();
			game_over(2);
			removeEventListener('keydown', keydown);
			removeEventListener('mousemove', mousemove);
			setTimeout(function(){
				$("#boss_UI1").css({
					display : "block"
				});
				$("#player_UI1").css({
					display : "block"
				});
				$("#screen1").css({
					display : "block"
				});
				$("#esc_menu1").css({
					display : "none"
				});
				esc_count = 0;
				keydown_count = 0;
				clearInterval(repeat);
				if(attack1 == 1){
					clearInterval(attack1_repeat);
					attack1 = 0;
					attack1_img_count = 0;
					attack1_img = 1;
				}
				else if(attack2 == 1){
					attack2 = 0;
					yplus = 100;
					attack2_img = 1;
					attack2_img_count = 0;
					clearInterval(attack2_repeat);
					attack2_count = 0;
				}
				else if(attack3 == 1){
					attack3_img = 1;
					attack3_img_count = 0;
					attack3 = 0;
					attack3_count = 0;
					fireball.src = "./img/stage1/af"+attack3_img+".png";
				}
				ballRadius = 10;
				barwidth = 100;
				if(qskill_cooltime== 1){
					clearInterval(qskill_repeat);
					qskill_cooltime = 0;
					qskill = 0;
					qskill_timer = 30;
					$("#qskill1").css({
						"display": "block"
					});
					$("#qtimer1").css({
						"display": "none"
					});
				}
				clearInterval(time_repeat);
				init();
				p_hp = 0;
				b_hp = 10;
				$("#container1").animate({
					"height": b_hp*30 + "px"
				});
				var p_hp_array = $(".state1");
				for(var i=0; i<3; i++){
					p_hp_array[i].src = "./img/player/playerHeartFull_25x25.png";
				}
				
				$("#stage1").removeClass("animateContent2").addClass("animateContent1");  // 스테이지3 esc화면 줄어드는 애니메이션
				setTimeout(function() {
					$("#stage1").removeClass("animateContent1").hide();   // 스테이지3 esc화면 none해주고
					$("#select-stage").show().addClass("animateContent2");         // 다시 스테이지 선택 페이지 나타나게
					setTimeout(function() {
						$("#select-stage").removeClass("animateContent2");
					}, 1000);
				}, 500);
			},4000);
		}
	}

	function p_hp_decrease_Img(){
	var playerImg = $("#playerImg1");
	var p_ImgBlankInterval = setInterval(function(){
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
	setTimeout(function(){
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
		clearInterval(attack2_repeat);
		clearInterval(time_repeat);
		context.clearRect(0, 0, cvwd, cvht);
		if (who == 1) {
			drawText("You Win");
			game_over_win_Img();
			deathmotion();
		}
		else if (who == 2) {
			drawText("You Lose");
			game_over_Img();
			winmotion();
			
		}
	}
	function game_over_Img() {
		var playerImg = $("#playerImg1");
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
		var playerImg = $("#playerImg1");
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

/* 플레이어, 보스 체력 출력해주는 함수 */
function hp() {
	$("#bp_num1").text(b_hp);
}

	function game_over_Img() {
		var playerImg = $("#playerImg1");
		playerImg.attr("src", "./img/player/playerLose_32x32.gif");
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
					if (y > bricky + BRICKHEIGHT && y < bricky + BRICKHEIGHT + ballRadius && brickx + BRICKWIDTH > x && brickx < x) { //벽돌의 아래 부분과 충돌
						context.clearRect(brickx, bricky, BRICKWIDTH, BRICKHEIGHT);
						bricks[i] = 0;
						dy = -dy;
						brickAudio.play();
					}
					if (x > brickx - ballRadius - dxf && x < brickx && y < bricky + BRICKHEIGHT + ballRadius && y > bricky - ballRadius) { //벽돌의 왼쪽 부분과 충돌
						context.clearRect(brickx, bricky, BRICKWIDTH, BRICKHEIGHT);
						bricks[i] = 0;
						dx = -dx;
						brickAudio.play();
					}
					if (x < brickx + BRICKWIDTH + ballRadius + dxf && x > brickx + BRICKWIDTH && y < bricky + BRICKHEIGHT + ballRadius && y > bricky - ballRadius) { // 벽돌의 오른쪽 부분과 충돌
						context.clearRect(brickx, bricky, BRICKWIDTH, BRICKHEIGHT);
						bricks[i] = 0;
						dx = -dx;
						brickAudio.play();
					}
					if (brickx + BRICKWIDTH > x && brickx < x && y > bricky - ballRadius && y < bricky) { // 벽돌의 윗 부분과 충돌
						context.clearRect(brickx, bricky, BRICKWIDTH, BRICKHEIGHT);
						bricks[i] = 0;
						dy = -dy;
						brickAudio.play();
					}
				}
			}
		}
		if ((x < bossx & x > bossx - ballRadius - dxf & y < bossy + bossht + ballRadius & y > bossy - ballRadius) || (x < bossx + bosswd + ballRadius + dxf & x > bossx + bosswd & y < bossy + bossht + ballRadius & y > bossy - ballRadius)) { //보스의 왼쪽, 오른쪽에 충돌
			dx = -dx;
			if (bs_barrier == 1) {
				attack1_repeat = setInterval(bossAttack1_attacked,1);
				bs_barrier = 0;
				attack1 = 0;
				attack1_img = 1;
				attack1_img_count = 0;
			}
			else {
				b_hp_decrease();
			}
		}
		else if ((y > bossy + bossht & y < bossy + bossht + ballRadius + yvelocity & x > bossx - ballRadius & x < bossx + bosswd + ballRadius) || (y < bossy & y > bossy - ballRadius - yvelocity & x > bossx - ballRadius & x < bossx + bosswd + ballRadius)) { //보스의 위, 아래에 충돌
			dy = -dy;
			if (bs_barrier == 1) {
				bs_barrier = 0;
				attack1_repeat = setInterval(bossAttack1_attacked,1);
				attack1 = 0;
				attack1_img = 1;
				attack1_img_count = 0;
			}
			else {
				b_hp_decrease();
			}
		}

		if ((y > (cvht - 20 - ballRadius - yvelocity))) {
			if (x > barx + (barwidth / 2 + ballRadius) || x < barx - (barwidth / 2 + ballRadius)) { //바의 영역에서 벗어난 경우
				if (y > (cvht - 20 - yvelocity)) {
					ballRadius = 10;
					init();
					draw();
					p_hp_decrease();
					start_number = 0;
					keydown_count = 0;
				}
			} else if (x > barx - (barwidth / 2 + ballRadius) && x < barx + (barwidth / 2 + ballRadius)) { //바의 영역에 있는 경우	
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







	/*---------------------------------------------------------마우스, 키보드 이벤트리스너---------------------------------------------------------*/

	/* 스페이스바를 누를 경우 공 발사
	스페이스바를 누르면 start_number 변수에 1값이 대입되고, 스킬을 사용할 수 있게 됨 */
	function keydown(event) {
		if(event.keyCode == 27 && esc_count == 0){
			$("#boss_UI1").css({
				display : "none"
			});
			$("#player_UI1").css({
				display : "none"
			});
			$("#screen1").css({
				display : "none"
			});
			$("#esc_menu1").css({
				display : "block"
			});
			esc_count = 1;
			keydown_count = 1;
			removeEventListener('mousemove', mousemove);
			clearInterval(repeat);
			if(attack2 == 1){
				clearInterval(attack2_repeat);
				stop_pattern = 2;
			}
			else if(attack3 == 1){
				attack3 = 0;
				stop_pattern = 3;
			}
			if(qskill_cooltime == 1){
				clearInterval(qskill_repeat);
				qstop_pattern = 1;
			}
			clearInterval(time_repeat);
		}
		else if(event.keyCode == 27 && esc_count == 1){
			$("#boss_UI1").css({
				display : "block"
			});
			$("#player_UI1").css({
				display : "block"
			});
			$("#screen1").css({
				display : "block"
			});
			$("#esc_menu1").css({
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
			else if(stop_pattern == 3){
				attack3 = 1;
			}
			if(qstop_pattern == 1){
				qskill_repeat = setInterval(skill_timer1,1000);
				qstop_pattern = 0;
			}
			stop_pattern = 0;
		}
		if(keydown_count == 0){
			if (start_number == 0) {
				//스페이스바를 누를경우
				if (event.keyCode == 32) {
					if (drawinterval == 0) {
						repeat = setInterval(draw, 1);
					}
					start_number = 1;
					dy = yvelocity;
				}
			}
			else if (start_number == 1) {
				//q를 누를경우
				if (qskill_cooltime == 0 && qskill == 0 && event.keyCode == 81) { //쿨타임이 아니고, 보호막이 활성화되지 않을 때 사용 가능
					qskill = 1; //이 변수가 1일 때 보호막 활성화
					$("#qskill1").css({ //스킬 이미지를 지우고 쿨타임 글씨 영역 활성화
						"display": "none"
					});
					$("#qtimer1").css({
						"display": "block"
					});
					$("#qtimer1").text(qskill_timer); //쿨타임 글씨 활성화
					qskill_repeat = setInterval(skill_timer1, 1000);
					qskill_cooltime = 1;
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
			$("#qskill1").css({
				"display": "block"
			});
			$("#qtimer1").css({
				"display": "none"
			});
			qskill_cooltime = 0;
		}
		$("#qtimer1").text(qskill_timer);
	}


	/* 마우스 움직임에 따라 바를 다시 그리는 함수 */
	//영역 밖을 나갈시 최대 영역으로 바를 그림
	function mousemove(event) {
		barx = event.clientX - wdwd;
	}

	/*---------------------------------------------------------마우스, 키보드 이벤트리스너---------------------------------------------------------*/









	/*---------------------------------------------------------보스 공격패턴 함수---------------------------------------------------------*/

	function timeAttack() {
		timer += 1;
		if(timer % 6 == 4){
			attackmotion();
		}

		if (timer % 6 == 0) {
			var randnum = Math.floor(Math.random())+2;
			if (randnum == 0) { //첫번째 보스 패턴 ( 보스 배리어 )
				attack1 = 1;
				bs_barrier = 1;
			}
			else if (randnum == 1) { //두번째 보스 패턴 ( 1개의 검이 바닥으로 떨어짐 )
				attack_x = Math.floor(Math.random() * 500); // 0 ~ 500 사이의 난수 생성하여 canvas의 x좌표가 50 ~ 550 사이에서 검이 떨어지도록
				attack2 = 1;
				attack2_repeat = setInterval(bossAttack2_timer, 1);
			}
			else if (randnum == 2) { // 세번째 보스 패턴 ( 패들 길이 -50 )
				attack_x = Math.floor(Math.random() * 480);
				attack3 = 1;
			}
			else if (randnum == 3) { // 네번째 보스 패턴 ( 공 반지름 -5 )
				ballRadius = 5;
				setTimeout(bossAttack4, 3000);
			}

		}
		$("#timer1").text(timer);
	}



	function attackmotion(){
		bossStanding[0].src = "./img/stage1/ba.gif";
		setTimeout(function(){
			bossStanding[0].src = "./img/stage1/boss1.gif";
		},1800);
	}

	function attackedmotion(){
		bossStanding[0].src = "./img/stage1/bt.gif";
		setTimeout(function(){
			bossStanding[0].src = "./img/stage1/boss1.gif";
		},1600);
	}

	function deathmotion(){
		bossStanding[0].src = "./img/stage1/bd.gif";
		setTimeout(function(){
			bossStanding[0].src = "./img/stage1/bd2.png";
		},2200);
	}

	function winmotion(){
		bossStanding[0].src = "./img/stage1/bw.gif";
		setTimeout(function(){
			bossStanding[0].src = "./img/stage1/bw2.png";
		},1600);
	}

	/* 보스 보호막 패턴
	보스를 둘러싼 파란색 원이 생김 */
	function bossAttack1() {
		attack1_img_count++;
		if(attack1_img_count % 50 == 0){
			attack1_img++;
			if(attack1_img == 9){
				attack1_img = 4;
			}
			bossshield_Img.src = "./img/stage1/s"+attack1_img+".png"
		}
		context.drawImage(bossshield_Img,bossx -bosswd / 3 + 10, bossy-15, (bosswd + 10)*1.3, (bosswd + 10)*1.3);
	}

	function bossAttack1_attacked(){
		attack1_img_count++;
		if(attack1_img_count % 50 == 0){
			attack1_img++;
			if(attack1_img == 4){
				clearInterval(attack1_repeat);
				attack1_img_count = 0;
				attack1_img = 1;
			}
			bossshield_Img.src = "./img/stage1/ss"+attack1_img+".png"
		}
		context.drawImage(bossshield_Img,bossx -bosswd / 3 + 10, bossy-15, (bosswd + 10)*1.3, (bosswd + 10)*1.3);
	}

	/* 보스 밑으로 파이어볼 공격 */
	function bossAttack2() {
		attack2_img_count++;
		if(attack2_img_count % 30 == 0){
			attack2_img++;
			if(attack2_img == 13){
				attack2_img = 1;
			}
			sword_Img.src = "./img/stage1/a"+attack2_img+".png";
		}
		context.drawImage(sword_Img,attack_x + barwidth / 2 - 15, yplus, 80, 150); // 가로 45 세로 74의 검 생성
	}

	/* 1개의 검이 떨어지는 움직임을 재현해주는 함수 */
	function bossAttack2_timer() {
		yplus = yplus + 2; // Y좌표는 2칸씩 이동
		if (attack2_count == 0 && yplus > cvht - 20 && attack_x + barwidth / 2 - 15 + 80 > barx - barwidth / 2 && attack_x + barwidth / 2 - 15 < barx + barwidth / 2) {
			if (qskill == 1) { //플레이어 보호막이 활성되어 있다면 보호막이 깨짐
				qskill = 0;
			}
			else {
				p_hp_decrease(); // 플레이어 보호막이 없다면 체력 1칸 감소
			}
			attack2_count = 1; //이 변수가 1인 동안은 검에 맞아도 데미지 0
		}
		if (yplus == cvht) { //검이 영역 밖으로 나갔을 경우 함수 종료
			attack2 = 0;
			yplus = 100;
			attack2_img = 1;
			attack2_img_count = 0;
			clearInterval(attack2_repeat);
			attack2_count = 0;
		}
	}

	/* 바닥에서 불꽃이 솟아나는 공격 */
	function bossAttack3() {
		attack3_img_count++;
		if(attack3_img_count % 50 == 0){
			attack3_img++;
			if(attack3_img == 13){
				attack3_img = 1;
				attack3_img_count = 0;
				attack3 = 0;
				attack3_count = 0;
			}
			fireball.src = "./img/stage1/af"+attack3_img+".png";
		}
		context.drawImage(fireball,attack_x,cvht-130, 120, 130);
		if(attack3_img_count >= 300){
			if(attack_x <= barx+barwidth/2 && attack_x+120 >= barx-barwidth/2){
				if(qskill == 1){
					qskill = 0;
				}
				else {
					if(attack3_count == 0){
						attack3_count = 1;
						p_hp_decrease();
					}
				}
			}
		}
	}

	/* 호출시 원래 공 반지름 길이로 복구 */
	function bossAttack4() {
		ballRadius = 10;
	}


	/*---------------------------------------------------------보스 공격패턴 함수---------------------------------------------------------*/
}