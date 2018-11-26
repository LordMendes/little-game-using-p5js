/** Classe que define o objeto Boss */

class Boss {
  /** Construtor do objeto Boss
  * @property {imagem} bocaAberta - Imagem do boss com boca aberta
  * @property {imagem} bocaFechada - Imagem do boss com a boca fechada
  * @property {imagem} caraFeia - Imagem do boss fazendo cara feia
  * @property {vetor} position - vetor de posições do boss no plano
  * @property {numero} speed - velocidade do boss
  * @property {numero} aceleracao - aceleração do boss
  * @property {numero} Size - largura do boss
  * @property {vetor} life - vetor de vidas do boss
  */
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
  /** Testa a posição do Background
  * @param {numero} posBG - posição X do Background
  * @return {booleano} um booleano true para par e false para impar
  */
  testePos(posBG){
    var x = posBG%2;
    if(x == 0) return true;
    else return false;
  }
  /** Exibe o objeto no Canvas */
  show(posBG){
    //COLOCAR O IF DO HIT
  	if(this.testePos(posBG)){
      image(this.bocaAberta, this.position.x, this.position.y-10, 300,400);
    }else if (!this.testePos(posBG)) {
      image(this.bocaFechada, this.position.x, this.position.y, 300,350);
    }
	}
  /** Move o objeto do Canvas
  * @param {numero} speed - Velocidade do BG.
  * @param {booleano} mov - Indica existencia de movimento do BG
  */
  move(speed, mov){
 
    if(mov)	this.position.x += speed+this.aceleracao ;
    this.position.x += this.speed+this.aceleracao;
    this.aceleracao += 0.055;
    
  }
  /** Testa se o Boss foi atingido
  * @param {numero} alvoX - posição X do jogador
  * @param {numero} alvoY - posição Y do jogador
  * @return {booleano} um booleano 
  */
  hit(alvoX, alvoY){
  	if(alvoX <= this.position.x+this.Size) {
      textSize(50);
      fill(255,0,0);
      stroke(0);
      strokeWeight(10);
      textStyle(BOLD);
      text("GAME OVER", 175, 175);
      noLoop();
      return true;
    }    
    else return false;
  }
  /** Exibe a vida do boss na tela */
  showLife(){
  	for(var i = 0 ; i < this.life.length; i++){
      fill(255,0,0);
    	rect(20+(i*20), height-20, 20,10);
    }
  }
  /** Causa dano no Chefe, retirando 1 vida da pilha de vida do chefe
  * @param {booleano} flag - Flag que indica que houve dano
  * @return {booleano} um booleano que indica dano.
  */
  damage(flag){
  
  	if(flag){    	
      this.life.shift();
      this.aceleracao =1;
      return true;
    }
    return false;
  
  }
  /** Checa se o Boss morreu
  * @return {booleano} booleano true se morreu e false se não morreu
  */
  deadCheck(){
  
  	if(this.life.length <=0){
    	image(this.caraFeia, this.position.x,this.position.y-100, 350,550);
      return true;
    }
  
  }
  /** Retorna a posição X do boss
  * @return {numero} posição x do boss
  */
  getPositionX(){
  	return this.position.x;
  }
  
  
}