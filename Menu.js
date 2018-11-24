class Menu{
  
  constructor(){
  
    this.img = loadImage('sprites/boss/susto.png');
    this.gameStartFlag = false;
  
  }
 
  setGameStatus(){
  
    this.gameStartFlag  = !this.gameStartFlag;
  	return this.gameStartFlag;
  }
  
  open(){
  	if(!this.gameStartFlag){
      background(0,70,70);
      //-----TEXTOS-----/
      var base = height * 0.25;
      var base2 = height * 0.45;
      var scalar = 0.8; 

      fill(255,0,0);
      strokeWeight(4);
      stroke(255, 204, 0);
      textStyle(BOLD);
      //DEFINE 
      textSize(32); 
      var desc = textDescent() * scalar; 
      line(0, base2 + desc, width/2, base2 + desc);
      text("Bjorn's Saga", 10, base2); 

      textSize(64); 
      desc = textDescent() * scalar; 
      line(40, base + desc, width-70, base + desc);
      text('Jonata Quest:', 40, base); 
      //-----IMAGEM-----//   
      image(this.img,450,50,200,400);

      //-----ENTER----//
      textSize(25);
      text("Press ENTER to start",150,height-100);

      if(keyIsDown(ENTER)) return this.setGameStatus();
    }
  }
  

  
}