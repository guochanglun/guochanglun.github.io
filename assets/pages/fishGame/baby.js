var babyObj = function(){
	this.x;
	this.y;
	this.angle;
	this.babyTailTime = 0;
	this.babyTailCount = 0;

	this.babyEyeCount = 0;
	this.babyEyeTime = 0;
	this.babyEyeIntever = 1000;

	this.babyBodyCount = 0;
	this.babyBodyTime = 0;
}

babyObj.prototype.init = function(){
	this.x = canWidth*0.5 - 50 ;
	this.y = canHeight*0.5 + 50 ;
	this.angle = 0;
}
babyObj.prototype.draw = function(){

	//babyTail
	this.babyTailTime += deltaTime;
	if(this.babyTailTime > 40){
		this.babyTailCount = (this.babyTailCount + 1)%8;
		this.babyTailTime = 0;
	}
	var babyTailCount = this.babyTailCount;

	//babyEye
	this.babyEyeTime += deltaTime;
	if(this.babyEyeTime > this.babyEyeIntever){
		this.babyEyeCount = (this.babyEyeCount+1)%2;
		this.babyEyeTime = 0;

		if(this.babyEyeCount == 0){
			this.babyEyeIntever = Math.random()*1500 + 2000;
		}else{
			this.babyEyeIntever = 150;
		}
	}
	var babyEyeCount = this.babyEyeCount;
	//babyBody
	this.babyBodyTime += deltaTime;
	if(this.babyBodyTime > 200){
		this.babyBodyTime = 0;
		this.babyBodyCount++;
		if(this.babyBodyCount >=19){
			this.babyBodyCount = 19;
			data.gameOver = true;
		}
	}
	var babyBodyCount = this.babyBodyCount;
	//lerp
	this.x = lerpDistance(mom.x, this.x, 0.99);
	this.y = lerpDistance(mom.y, this.y, 0.99);

	//angle
	var deltaY = mom.y - this.y;
	var deltaX = mom.x - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;

	//lerp angle
	this.angle = lerpAngle(beta, this.angle, 0.6);

	
	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);
	ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width*0.5+25, -babyTail[babyTailCount].height*0.5);
	ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width*0.5, -babyBody[babyBodyCount].height*0.5);
	ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width*0.5, -babyEye[babyEyeCount].height*0.5);
	ctx1.restore();
}