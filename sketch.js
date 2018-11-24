//____CRIAÇÃO DE OBJETOS
var player; // obj do personagem
var Bg; // obj solo e plano de fundo
var vilao; // obj dos halteres
var boss; // obj do chefão
var burguer // obj do item/hamburguer


//____VARIAVEIS DO JOGO
var FPS = 12; //quantidade de frames por segundo
var dir = -1; // direção inicial
var ground = 240; // definição da altura do chão
var gravidade = 15; //força da gravidade que atua no personagem
var mov = false; // variavel que identifica se existe movimento

//____VARIVAVEIS BG
var posXBG = 0; // posição X inicial do background
var posYBG = 0; // posução X inicial do background
var canvasWidth = 640, canvasHeight = 360; //definição da largura e altura do BG

//____VARIAVEIS PLAYER
var posXPlayer = canvasWidth/2-100;//definição da posição x do personagem
var posYPlayer = ground; // definição da posição y do personagem

//SETUP É ONDE CARREGA TODOS OS OBJETOS E PRÉ-DEFINIÇÕES DO JOGO
function setup() {
  createCanvas(canvasWidth, canvasHeight);//define o tamanho da tela
  player = new Player(posXPlayer,posYPlayer,5);//instancia um objeto do personagem/jogador
  vilao = new Halter(ground);//instancia um objeto do halter/minion/vilao
  Bg = new BG(canvasWidth, canvasHeight);//instancia um objeto do background
  boss = new Boss(); // instancia um objeto do chefão
  burguer = new Burguer(ground);//instancia um objeto que vai criar os hamburguers
  frameRate(FPS);// define o frameRate do jogo
}

function draw() {

  background(0);//define o BG como preto
  //SETA O CENARIO
  Bg.setBG();
  //DEFINE O CARROSSEL DO CENARIO
  Bg.setCarrosel();
  //SETA O JOGADOR
  player.show(Bg.getPositionX(), dir);
  //SETA VILAO
  vilao.show(Bg.getPositionX(),vilao.setDirection(player.getPositionX()));
  //MOSTRA A PONTUAÇÃO
  player.scoreShow();
  //MOSTRA A VIDA
  player.lifeShow();
  //SETA O BOSS
  boss.show(Bg.getPositionX());

  // SE ESTÁ ACIMA DO CHÃO, CAIR DE ACORDO COM A GRAVIDADE
  if(player.position.y < ground && !player.jumpTest()){
    player.position.y += gravidade;
  }else if(keyIsDown(UP_ARROW) || player.jumpTest()){
    player.jump();
    mov = true;
  }
	//MOVIMENTAÇÃO PRA ESQUEDA E DIREITA, SENSAÇÃODE MOVIMENTAÇÃO VEM DO BG
  if(keyIsDown(LEFT_ARROW)){
    dir = (1);
    Bg.setPosition(dir);
    mov = true; //VARIAVEL PRA IDENTIFICAR MOVIMENTO
  }else if(keyIsDown(RIGHT_ARROW)){
    dir = -1;
    Bg.setPosition(dir);
    mov = true;
  }else{
    mov = false;
  }
  //MOVIMENTO DO PESINHO
  vilao.move(Bg.getSpeed(dir), vilao.setDirection(player.getPositionX()), mov);
  //MOVIMENTO DO BOSS
  boss.move(Bg.getSpeed(dir), mov);
  //MOVIMENTO DO ITEM
  burguer.move(mov, Bg.getSpeed(dir));

	//INDENTIFICADOR DE HIT
  if(vilao.hit(player.getPositionX(), player.getPositionY(),canvasHeight) == true || boss.hit(player.getPositionX(), player.getPositionY(), canvasHeight) == true){
    player.lifeDrop();//desenpilha 1 vida em caso de hit
  }
  
  //GERAÇÃO DE ITEMS
  if((frameCount%50)==0 || burguer.getItemFlag()){//gera hamburguer a cada 50 frames ou se o item some da tela
    if(burguer.showBurguer()){										//se sim mostra o hamburguer
      if(burguer.got(player.getPositionX(),10)){  //testa se o player pegou o hamburguer
        burguer.vanishBurguer();									//quando pega o hamburguer some ele da tela
        burguer.feedPool();												//e empilha na pilha de hamburguer
      }
    }
  }
  //MOSTRA A VIDA DO CHEFÃO
  boss.showLife();
  //MOSTRA A PILHA DE HAMBURGUERS
  burguer.showPool();
  //TESTA SE É POSSIVEL ATAQUE E ATACA O CHEFE
  burguer.attack(boss.getPositionX(), player.getPositionX());
  //DANOS DO CHEFE
  if(boss.damage(burguer.getDamageFlag())){//testa através da flag do obj burguer, se houve dano    se sim causa o dano na vida do chefe
   burguer.setDamageFlag(); // volta a flag de dano para falso
  }if(boss.deadCheck()){//checa se a vida do chefe é inferior a 0
    textStyle(BOLD);
    text("VENCEU", width/2,height/2);
  	noLoop();
  }
  
  player.checkInvu();//checa se houve dano e o personagem está brevemente invisível
  player.lifeCheck();//chega se o player ainda tem vida
}