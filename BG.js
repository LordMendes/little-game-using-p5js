class BG{

	constructor(canvasWidth,canvasHeight){
    this.BG1 = loadImage('/sprites/BG.png');
    this.BG2 = loadImage('/sprites/BG.png');
    this.BG3 = loadImage('/sprites/BG.png');
    this.backBG1 = loadImage('/sprites/cityBG.gif');
    this.backBG2 = loadImage('/sprites/cityBG.gif');
  	this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.positionBack1 = createVector(0,0);
    this.positionBack2 = createVector(this.canvasWidth,this.positionBack1.y);
    this.position1 = createVector(0,0);
    this.position2 = createVector(this.position1.x+630,this.position1.y);
    this.speed = 15;
  	
  }
  
  setBG(){    
  	image((this.backBG1), this.positionBack1.x, this.positionBack1.y);
    image((this.backBG2), this.positionBack2.x, this.positionBack2.y);
    image((this.BG1), this.position1.x, this.position1.y);
    image((this.BG2), this.position2.x, this.position2.y);
  }
  
  setCarrosel(playerPosition){
  
	  if(this.position1.x <= -this.canvasWidth+10){ //O +10 É SOMENTE UMA CORREÇÃO DO TAMANHO DO SOLO
      this.position1.x = 0;
      this.position2.x += this.position1.x+this.canvasWidth-10
    }
    if(this.positionBack1.x <= -this.canvasWidth+10){ //O +10 É SOMENTE UMA CORREÇÃO DO TAMANHO DO SOLO
      this.positionBack1.x = 0;
      this.positionBack2.x += this.positionBack1.x+this.canvasWidth-10
    }
  }
  
  
  setPosition(dir){
  	this.position1.x += this.speed*dir;
    this.position2.x += this.speed*dir;
    this.positionBack1.x += (this.speed/5)*dir;
    this.positionBack2.x += (this.speed/5)*dir;
  }
  
  getPositionX(){
  	return this.position1.x;
  }
  getSpeed(){
  	return this.speed*dir;
  }
 
}