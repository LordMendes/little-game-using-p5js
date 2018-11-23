class Boss {
  
	constructor(){
    this.life = 500;
    this.bocaAberta = loadImage('/sprites/Boss/BocaAbertaPx.png');
    this.bocaFechada = loadImage('/sprites/Boss/BocaFechadaPx.png');
    this.caraFeia = loadImage('/sprites/Boss/caraFeiaPx.png');
    this.position = createVector(-100,70);
    this.speed = 10;
    this.aceleracao = 1;
    this.Size = 200;
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
    this.aceleracao += 0.01;
  }
  hit(alvoX, alvoY, canvasHeight){
  	if(alvoX <= this.position.x+this.Size) {
      textSize(50);
      fill(255,0,0);
      stroke(0);
      text("Virou Proteína!", 175, 175);
      noLoop();
    }
    
    else return false;
  }
  
  
}