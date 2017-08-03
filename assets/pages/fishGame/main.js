// JavaScript Document
var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;
var lastTime;
var deltaTime;

var babyTail = [];
var babyEye = [];
var babyBody = [];

var bigTail = [];
var bigEye = [];
var momBodyOrange = [];
var momBodyBlue = [];
var mx;
var my;

var bgPic = new Image();

var ane;
var fruit;
var mom;
var baby;
var data;
document.body.onload = game;

function game(){
	init();
	lastTime = Date.now();
	gameloop();
	}
	
function init(){
	can1 = document.getElementById("canvas1");
	ctx1 = can1.getContext('2d');
	canWidth = can1.width;
	canHeight = can1.height;
	can2 = document.getElementById("canvas2");
	ctx2 = can2.getContext('2d');
	
	can1.addEventListener('mousemove', onMouseMove, false);
	bgPic.src = "src/background.jpg";
	
	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

	mx = canWidth*0.5;
	my = canHeight * 0.5;

	baby = new babyObj();
	baby.init();

	for(var i=0; i<8; i++){
		babyTail[i] = new Image();
		babyTail[i].src = "src/babyTail"+i+".png";
		bigTail[i] = new Image();
		bigTail[i].src = "src/bigTail"+i+".png";
	}

	for(var i=0; i<2; i++){
		babyEye[i] = new Image();
		babyEye[i].src = "src/babyEye"+i+".png";

		bigEye[i] = new Image();
		bigEye[i].src = "src/bigEye"+i+".png";
	}

	for(var i=0; i<20; i++){
		babyBody[i] = new Image();
		babyBody[i].src = "src/babyFade"+i+".png";
	}

	data = new dataObj();

	for(var i=0; i<8; i++){
		momBodyBlue[i] = new Image();
		momBodyOrange[i] = new Image();
		momBodyBlue[i].src = "src/bigSwimBlue"+i+".png";
		momBodyOrange[i].src = "src/bigSwim"+i+".png";
	}

	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";
}
	
function gameloop(){
	window.requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	if(deltaTime > 45) deltaTime = 45;
	drawBackground();
	
	ane.draw();
	fruit.draw();
	fruit.fruitMonitor();

	ctx1.clearRect(0, 0, canWidth, canHeight);
	mom.draw();

	momFruitsCollision();
	momBabyCollision();
	baby.draw();
	data.draw();
	}

	function onMouseMove(e){
		if(!data.gameOver){
			if(e.layerX || e.offSetX){
				mx = e.offSetX == undefined ? e.layerX : e.offSetX;
				my = e.offSetY == undefined ? e.layerY : e.offSetY;
			}
		}
		
	}