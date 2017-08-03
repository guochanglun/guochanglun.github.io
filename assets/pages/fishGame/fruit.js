// JavaScript Document

var fruitObj = function(){
	this.alive = [];
	this.x = [];
	this.y = [];
	this.l = [];
	this.spd = [];
	this.fruitType = [];
	this.orange = new Image();
	this.blue = new Image();
	}

fruitObj.prototype.num = 30;

fruitObj.prototype.init = function(){
	for(var i=0; i<this.num; i++){
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.l[i] = 0;
		this.fruitType[i] = "";
		this.spd[i] = Math.random() * 0.005 + 0.003;
		//this.born(i);
	}
	this.orange.src = "src/fruit.png";
	this.blue.src = "src/blue.png";
}

fruitObj.prototype.draw = function(){
	for (var i = 0; i < this.num; i++) {

		if(this.alive[i]){

			var pic;
			if(this.fruitType[i] == "blue"){
				pic = this.blue;
			}else{
				pic = this.orange;
			}

			if(this.l[i] <= 11){
				this.l[i] += this.spd[i] * deltaTime;
			}else{
				this.y[i] -= this.spd[i] * deltaTime * 7;
			}
			ctx2.drawImage(pic , this.x[i]-this.l[i] * 0.5, this.y[i]-this.l[i] * 0.5, this.l[i], this.l[i]);
			if(this.y[i] <= -10){
				this.alive[i] = false;
			}
		}
		
	}
}

fruitObj.prototype.update = function(){
	var num = 0;
	for(var i=0; i<this.num; i++){
		if(this.alive[i]) num++;
	}
}

fruitObj.prototype.born = function(i){
	var aneid = Math.floor(Math.random() * ane.num);
	this.x[i] = ane.x[aneid];
	this.y[i] = canHeight - ane.len[aneid];
	this.l[i] = 0;
	this.alive[i] = true;
	var ran = Math.random();
	if(ran <= 0.3){
		this.fruitType[i] = "blue";
	}else{
		this.fruitType[i] = "orange";
	}
}

fruitObj.prototype.fruitMonitor = function(){
	var num = 0;
	for(var i = 0; i < fruit.num; i++){
		if(fruit.alive[i]) num++;
	}
	if(num < 15){
		//send fruit
		this.sendFruit();
		return;
	}
}

fruitObj.prototype.sendFruit = function(){
	for(var i=0; i < fruit.num; i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}

fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}