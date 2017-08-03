function momFruitsCollision(){

	if(!data.gameOver){
		for(var i=0; i<fruit.num; i++){
			if(fruit.alive[i]){
				var l = calLength2(mom.x, mom.y, fruit.x[i], fruit.y[i]);
				if(l<300){
					//fruit eated;
					fruit.dead(i);
					data.fruitNum++;
					mom.bodyCount++;
					if(mom.bodyCount>=7){
						mom.bodyCount = 7;
					}
					if(fruit.fruitType[i] == "blue"){
						data.double = 2;
					}else{
						data.double = 1;
					}
				}
			}
		}
	}
	
}

function momBabyCollision(){
	var l = calLength2(mom.x, mom.y, baby.x, baby.y);
	if(l<600){
		if(data.fruitNum && !data.gameOver){
			baby.babyBodyCount = 0;
		    mom.bodyCount = 0;
		    data.addScore();
		}
	}
}