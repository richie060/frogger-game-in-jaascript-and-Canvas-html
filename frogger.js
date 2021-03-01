var canvas = document.getElementById('canvas');
var ctx   = canvas.getContext('2d');

var frog = new Image(); frog.src = "icon-frogger-pixel-48x48.png";
var sx = 0;
var sy = 0;
var swidth = 48;
var sheight = 40;
var x = 50;
var y =  444;
var width = 30;
var height = 30;

//keyboard
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

var up = true;
var down = true;
var right = true;
var left = true;

var car = new Image(); car.src = "icon-frogger-pixel-racing-car-128x128.png";
var carX1 = 100;
var carSX1 = 0;
var carY1 = 400;
var carWidth = 60;
var carHeight = 35;
var carX2 = 500;
var carSX2 = 60;
var carY2 = 400;

var carX3 = 460;
var carSX3 = 120;
var carY3  = 355;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
	if(e.keyCode == 39) {rightPressed = true;}
	if(e.keyCode == 37) {leftPressed = true;}
	if(e.keyCode == 38) {upPressed = true;}
	if(e.keyCode == 40) {downPressed = true;}
}
function keyUpHandler(e){
	if(e.keyCode == 39) {rightPressed = false;}
	if(e.keyCode == 37) {leftPressed = false;}
	if(e.keyCode == 38) {upPressed = false;}
	if(e.keyCode == 40) {downPressed = false;}
}

function drawBackground(){
//drawing two strip of grass which are safe zone

ctx.fillStyle = "lime";
ctx.fillRect(0,440,570,45);
ctx.fillRect(0,220,570,45);

//Drawing  a lane boundary for our cars

ctx.beginPath();
ctx.moveTo(0,395);
ctx.lineTo(570,395);
ctx.strokeStyle = "white";
ctx.setLineDash([5]);
ctx.strokeWidth = 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0,350);
ctx.lineTo(570,350);
ctx.strokeStyle = "white";
ctx.setLineDash([0]);
ctx.strokeWidth = 4;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0,305);
ctx.lineTo(570,305);
ctx.strokeStyle = "white";
ctx.setLineDash([5]);
ctx.strokeWidth = 2;
ctx.stroke();

//drawing water

ctx.fillStyle = "blue";
ctx.fillRect(0,0,570,220);
}

function drawFrog(){
	ctx.drawImage(frog, sx, sy, swidth, sheight, x, y, width, height);
}
function drawCars(){
	var carsSX = [carSX1, carSX2, carSX3];
	var carsX = [carX1,carX2, carX3];
	var carsY = [carY1, carY2, carY3];

	for ( i = 0; i < carsX.length; i++) {
		ctx.drawImage(car,  carsSX[i], 0, 60, 35, carsX[i], carsY[i], carWidth, carHeight);

	}


	if (carX1< canvas.width + 100) {
    	carX1 = carX1 + 5;
    }
    else{
    	carX1 = -100;
    	carSX1 = (Math.floor(Math.random() * 4)) * 60;
    }
    // ctx.drawImage(car,  carSX2, 0, 60, 35, carX2, carY2, carWidth, carHeight);
    if (carX2< canvas.width + 100) {
    	carX2 = carX2 + 5;
    }
    else{
    	carX2 = -100;
    	carSX2 = (Math.floor(Math.random() * 4)) * 60;
    }
}
//overlapping
function runOver(){
	var carsX = [carX1, carX2];
	var carsY  = [carY1, carY2];

	for ( i = 0; i < carsX.length; i++) {
		if (carsX[i] <= x + width &&
		carsX[i] + carWidth >= x &&
		carsY[i]  + carHeight >=y &&
		carsY[i]  <= y + height) {
		y=488;
	}


	}
	}

	function moveFrog(){
    //moving frog up
	if (upPressed==true && up==true  && y > 20) {
		y = y - 44;
		up = false;
		sx = 0;
	}
	if (upPressed == false) {
		up = true;
	}
	//moving the frog down
	if (downPressed==true && down==true  && y + height < canvas.height - 80) {
		y = y + 44;
		down = false;
		sx = 0;
	}
	if (downPressed == false) {
		down = true;
	}
	//moving the frog to the right
	if (rightPressed==true && right==true  && x + width < canvas.width-20) {
		x = x + 44;
		right = false;
		
	}
	if (rightPressed == false) {
		right = true;
	}
	//moving the frog to the left
	if (leftPressed==true && left==true && x > 20) {
		x = x - 44;
		left = false;
			}

	if (leftPressed == false) {
		left = true;
	}
}
function draw (){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBackground();
	drawFrog();
	moveFrog();
	drawCars();
	runOver();
	requestAnimationFrame(draw);
}
draw();