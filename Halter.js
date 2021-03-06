/** Classe que representa o objeto Halter */

class Halter{
  /** Constrói o objeto do Halter
  * @param {numero} ground - posição y do solo
  *
  * @property {Vetor} position - Define a posição do Halter no plano
  * @property {Numero} speed - Define a velocidade do Halter
  * @property {Imagem} sprite1 - Imagem 1 do Halter para esquerda
  * @property {Imagem} sprite2 - Imagem 2 do Halter para esquerda
  * @property {Imagem} sprite1f - Imagem 1 do Halter para direita
  * @property {Imagem} sprite2f - Imagem 1 do Halter para direita
  * @property {Numero} halfSize - Largura do Objeto
  * @property {Booleano} existFlag - Variável booleana que indica existencia do objeto no Canvas
  */
	constructor(ground){  
    this.position = createVector(650, ground);
    this.speed = -1; 
    this.sprite1 = loadImage('/sprites/Halter1.png');
    this.sprite2 = loadImage('/sprites/Halter2.png');
    this.sprite1f = loadImage('/sprites/Halter1Flip.png');
    this.sprite2f = loadImage('/sprites/Halter2Flip.png'); 
    this.halfSize = 32; //METADE DA LARGURA
    this.existFlag = false;
  }
  /** Testa a posição do BG
  * @param {Numero} posBG - posição X do Background
  * @return {booleano} verdadeiro para par e falso para impar
  */
  testePos(posBG){
    var x = posBG%2;
    if(x == 0) return true;
    else return false;
  }
  /** Define a direção do alvo
  * @param {numero} alvo - posição X do alvo.
  */
  setDirection(alvo){
  	if(alvo < this.position.x) return 1;
    else return -1;
  }
  /** Exibe o objeto na tela */
  show(posBG, dir){
    
      if(this.testePos(posBG+this.position.x) && dir == 1) image(this.sprite1,this.position.x,this.position.y);
      else if (!this.testePos(posBG+this.position.x) && dir == 1) image(this.sprite2,this.position.x,this.position.y);
      else if (this.testePos(posBG+this.position.x) && dir == -1) image(this.sprite1f,this.position.x,this.position.y);
      else if (!this.testePos(posBG+this.position.x) && dir == -1) image(this.sprite2f,this.position.x,this.position.y);
      
  }
 /**
 * @param {numero} speed - velocidade do BG
 * @param {numero} dir - Direção do movimento do BG
 * @param {booleano} mov - existencia de movimento do BG
 */
  move(speed, dir, mov){
    if(mov)	this.position.x += speed ;
    this.position.x += this.speed*dir;
    if(this.position.x < - 50){
    	this.position.x = width;
    }
  }
  /** Testa se  objeto tocou o jogador
  * @param {numero} alvoX - Posição X do objeto do jogador
  * @param {numero} alvoY - Posição Y do objeto do jogador
  * @param {numero} canvasHeight - largura do Canvas
  * @return {booleano} um booleano.
  */
  hit(alvoX, alvoY, canvasHeight){
  	if(alvoX+this.halfSize >= this.position.x &&
       alvoX <= this.position.x+this.halfSize &&
       alvoY >= canvasHeight-this.position.y+2*this.halfSize) {
      return true;
    }
    else return false;
  }
  

}