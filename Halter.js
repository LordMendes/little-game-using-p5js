class Halter{
  
	constructor(ground){  
    this.position = createVector(650, ground);
    this.direcao = 1; //sem uso
    this.puloMax = ground-70;
    this.puloForce = 20;
    this.speed = -1; 
    this.sprite1 = loadImage('/sprites/Halter1.png');
    this.sprite2 = loadImage('/sprites/Halter2.png');
    this.sprite1f = loadImage('/sprites/Halter1Flip.png');
    this.sprite2f = loadImage('/sprites/Halter2Flip.png'); 
    this.halfSize = 32; //METADE DA LARGURA
    this.existFlag = false;
  }
  
  testePos(posBG){
    var x = posBG%2;
    if(x == 0) return true;
    else return false;
  }
  
  setDirection(alvo){
  	if(alvo < this.position.x) return 1;
    else return -1;
  }
  
  show(posBG, dir){
    if(!(this.existFlag)){
      if(this.testePos(posBG+this.position.x) && dir == 1) image(this.sprite1,this.position.x,this.position.y);
      else if (!this.testePos(posBG+this.position.x) && dir == 1) image(this.sprite2,this.position.x,this.position.y);
      else if (this.testePos(posBG+this.position.x) && dir == -1) image(this.sprite1f,this.position.x,this.position.y);
      else if (!this.testePos(posBG+this.position.x) && dir == -1) image(this.sprite2f,this.position.x,this.position.y);
      }
  }
 
  move(speed, dir, mov){
    if(mov)	this.position.x += speed ;
    this.position.x += this.speed*dir;
    if(this.position.x < - 50){
    	this.position.x = width;
    }
  }
  hit(alvoX, alvoY, canvasHeight){
  	if(alvoX+this.halfSize >= this.position.x &&
       alvoX <= this.position.x+this.halfSize &&
       alvoY >= canvasHeight-this.position.y+2*this.halfSize) {
      return true;
    }
    else return false;
  }
  

}