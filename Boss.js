class Boss {
  
	constructor(){

    this.bocaAberta = loadImage('/sprites/Boss/BocaAbertaPx.png');
    this.bocaFechada = loadImage('/sprites/Boss/BocaFechadaPx.png');
    this.caraFeia = loadImage('/sprites/Boss/caraFeiaPx.png');
    this.position = createVector(-100,70);
    this.speed = 3;
    this.aceleracao = 0.5;
    this.Size = 200;
    this.life = [true,true,true,true,true,true,true,true,true,true];
  }
  
  testePos(posBG){
    var x = posBG%2;
    if(x == 0) return true;
    else return false;
  }
  
  show(posBG){
    //COLOCAR O IF DO HIT
  	if(this.testePos(posBG)){
      image(this.bocaAberta, this.position.x, this.position.y-10, 300,400);
    }else if (!this.testePos(posBG)) {
      image(this.bocaFechada, this.position.x, this.position.y, 300,350);
    }
	}
  move(speed, mov){
 
    if(mov)	this.position.x += speed+this.aceleracao ;
    this.position.x += this.speed+this.aceleracao;
    this.aceleracao += 0.055;
    
  }
  hit(alvoX, alvoY){
  	if(alvoX <= this.position.x+this.Size) {
      textSize(50);
      fill(255,0,0);
      stroke(0);
      strokeWeight(10);
      textStyle(BOLD);
      text("GAME OVER", 175, 175);
      noLoop();
    }    
    else return false;
  }
  showLife(){
  	for(var i = 0 ; i < this.life.length; i++){
      fill(255,0,0);
    	rect(20+(i*20), height-20, 20,10);
    }
  }
  damage(flag){
  
  	if(flag){    	
      this.life.shift();
      this.aceleracao =1;
      return true;
    }
  
  }
  
  deadCheck(){
  
  	if(this.life.length <=0){
    	image(this.caraFeia, this.position.x,this.position.y-100, 350,550);
      return true;
    }
  
  }
  
  getPositionX(){
  	return this.position.x;
  }
  
  
}