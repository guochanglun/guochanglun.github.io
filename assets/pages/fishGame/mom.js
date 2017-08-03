var momObj = function(){
	this.x;
	this.y;
	this.angle;
	this.bigTailTime = 0;
	this.bigTailCount = 0;
	this.bigEyeCount = 0;
	this.bigEyeTime = 0;
	this.bigEyeIntever = 0;
	this.bodyCount = 0;
}

//init
momObj.prototype.init = function(){
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
}

momObj.prototype.draw = function(){

	//bigEye
	this.bigEyeTime += deltaTime;
	if(this.bigEyeTime > this.bigEyeIntever){
		this.bigEyeCount = (this.bigEyeCount+1)%2;
		this.bigEyeTime = 0;

		if(this.bigEyeCount == 0){
			this.bigEyeIntever = Math.random()*1500 + 2000;
		}else{
			this.bigEyeIntever = 150;
		}
	}
	var bigEyeCount = this.bigEyeCount;
	//lerp
	this.x = lerpDistance(mx, this.x, 0.97);
	this.y = lerpDistance(my, this.y, 0.97);

	//angle
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;

	//lerp angle
	this.angle = lerpAngle(beta, this.angle, 0.6);

	//bigTail
	this.bigTailTime += deltaTime;
	if(this.bigTailTime > 50){
		this.bigTailCount = (this.bigTailCount + 1)%8;
		this.bigTailTime = 0;
	}
	var bigTailCount = this.bigTailCount;

	var bodyCount = this.bodyCount;
	var bodyImage;
	if(data.double == 1){
		bodyImage = momBodyOrange[bodyCount];
	}else{
		bodyImage = momBodyBlue[bodyCount];		
	}
	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);
	ctx1.drawImage(bigTail[bigTailCount], -bigTail[bigTailCount].width*0.5+30, -bigTail[bigTailCount].height*0.5);
	ctx1.drawImage(bodyImage, -bodyImage.width*0.5, -bodyImage.height*0.5);
	ctx1.drawImage(bigEye[bigEyeCount], -bigEye[bigEyeCount].width*0.5, -bigEye[bigEyeCount].height*0.5);
	ctx1.restore();
}