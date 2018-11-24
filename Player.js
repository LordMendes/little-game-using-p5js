

class Player{
	constructor(posx, ground){
    this.position = createVector(posx, ground);
    this.puloMax = ground-100;
    this.puloForce = 21;
    this.sprite1 = loadImage('/sprites/boi1.png');
    this.sprite2 = loadImage('/sprites/boi2.png');
    this.sprite1f = loadImage('/sprites/boi1Flip.png');
    this.sprite2f = loadImage('/sprites/boi2Flip.png');
    this.jumpFlag = false;
    this.lifeImg = loadImage('/sprites/life.png');
    this.score = 0;
    this.invuneravel = false;
    this.deltaPos = 0;
    //-------------------
    this.lifeMax = 3;
    this.life = [1, 1, 1];
    //-------------------
    
  }
  testePos(posBG){
    var x = posBG%2;
    if(x == 0) return true;
    else return false;
  }
  show(posBG, dir){
    this.score++;
    if(this.testePos(posBG) && dir == -1) image(this.sprite1,this.position.x,this.position.y);
    else if (!this.testePos(posBG) && dir == -1) image(this.sprite2,this.position.x,this.position.y);
    else if (this.testePos(posBG) && dir == 1) image(this.sprite1f,this.position.x,this.position.y);
    else if (!this.testePos(posBG) && dir == 1) image(this.sprite2f,this.position.x,this.position.y);
  }
  jumpTest(){
    if(this.position.y > this.puloMax && this.jumpFlag == true) {
      return true;
    }
    else {
      this.jumpFlag = false;
      return false;
    }
  }
  jump(){
    this.jumpFlag = true;
    if(this.jumpTest()){
    	this.position.y -= this.puloForce;
    }
  }
  
  getPositionX(){
  	return this.position.x;
  }
  getPositionY(){
  	return this.position.y;
  }
  
  scoreShow(){
    

    fill(0, 102, 153, 51);
  	rect(10,10,200,50);
    fill(0);
    textSize(30);
    text('Score:',15,45);
    textSize(30);
    text(this.score,110,46);
    
    //this.score = this.hit();
  }
  
  lifeStack(){
    if(this.life.length == this.lifeMax) return false;
  	if(this.life.length < this.lifeMax) {
      this.life.push(1);
      return true;
    }
  }
  
  lifeDrop(){
  	if(this.life.length <= 0) return false;
  	if(this.life.length > 0 && !(this.invuneravel)) {
      this.life.shift();
      this.invuneravel = true;
    }
  }
  
  lifeShow(){
  	for(var i = 0 ; i < this.life.length; i++){
      if(this.life[i] == 1){
    		image(this.lifeImg,250+(20*i),30);
      }
    }
  }
  
  checkInvu(deltaPos){
  	if(this.invuneravel == true){
    	this.deltaPos += 15;
      if(this.deltaPos >= 100){
      	this.invuneravel = false;
        this.deltaPos = 0;
      }
    } 
  }
  
  lifeCheck(){
  
  	if(this.life.length == 0) {
      textSize(50);
      fill(255,0,0);
      stroke(0);
      strokeWeight(10);
      textStyle(BOLD);
      text("GAME OVER", 175, 175);
      noLoop();
    }
  
  }

  
}