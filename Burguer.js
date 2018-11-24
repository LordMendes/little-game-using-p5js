class Burguer{
  
	constructor(ground){
    
    this.burguer = false;
    this.tomate = false;    
    this.spritePao = loadImage('/sprites/Burguer/Pão1.png');
    this.spriteCarne = loadImage('/sprites/Burguer/Carne.png');
    this.spriteTomate = loadImage('/sprites/Burguer/Tomate1.png');
    this.spriteBurguer = loadImage('/sprites/Burguer/burguer.png');
    this.pool = [];
    this.ground = ground;
    this.position = createVector(width,this.ground);
    this.itemFlag = false;
    this.attackFlag = false;
    this.attackPos = 0;
    this.damageFlag = false;
    
  }

  showBurguer(){
    if(!(this.burguer)) {
      image(this.spriteBurguer,this.position.x,this.ground,32,32);
      this.itemFlag = true;
      return true;
    }
  }

  got(posX, posY){
  	if(posX+32 >= this.position.x && posX <= this.position.x+32 ){
      return true;
    }
  }
  move(mov, speed){
  
    if(mov)	this.position.x += speed ;
    if(this.position.x < 0){
    	this.position.x = width;
      this.burguer = false;
    }
    
  }

  vanishBurguer(){
    this.burguer = true;
    this.itemFlag = false;
  }
  setItemFlag(){
  	this.itemFlag = !this.itemFlag;  
  }
  getItemFlag(){
  	return this.itemFlag;
  }
  feedPool(){
  	this.pool.push(true);
  }
  showPool(){
  	for(var i = 0 ; i < this.pool.length ; i++){
      if(this.pool[i] == true){
        image(this.spriteBurguer,width - 50, height-(i*50)-100, 32,32)
      }
    }
  }
  
  setDamageFlag(){
  	this.damageFlag = !(this.damageFlag);
  }
  getDamageFlag(){
  	return this.damageFlag;
  }
  
  attack(bossX,playerX){
  	if(this.pool.length == 3){
    	this.pool.shift();
     	this.pool.shift();
      this.pool.shift();
      this.attackFlag = true;
      this.attackPos = playerX;
    }
    
    if(this.attackFlag){
    	image(this.spriteBurguer, this.attackPos, 200, 100,100);
      this.attackPos-=5;
      if(this.attackPos < bossX+250){
      	this.attackFlag = !(this.attackFlag);
        this.damageFlag = true;
      }
    }
  }

}