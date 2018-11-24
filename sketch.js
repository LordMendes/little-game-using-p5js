//____CRIAÇÃO DE OBJETOS
var player;
var Bg;
var vilao;
var life;
var boss;
var menu;
var burguer
//____POOLS
var itens =[];

//____VARIAVEIS DO JOGO
var FPS = 12;
var dir = -1;
var ground = 360-120;
var gravidade = 15;
var mov = false;

//____VARIVAVEIS BG
var posXBG = 0;
var posYBG = 0;
var canvasWidth = 640, canvasHeight = 360;

//____VARIAVEIS PLAYER
var posXPlayer = canvasWidth/2-100, posYPlayer = ground;


function setup() {
  createCanvas(canvasWidth, canvasHeight);
  player = new Player(posXPlayer,posYPlayer,5);
  vilao = new Halter(ground);
  Bg = new BG(canvasWidth, canvasHeight);
  boss = new Boss();
  menu = new Menu();
  burguer = new Burguer(ground);
  frameRate(FPS);
}

function draw() {

  background(0);  
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
  if(vilao.hit(player.getPositionX(), player.getPositionY(), canvasHeight) == true || boss.hit(player.getPositionX(), player.getPositionY(), canvasHeight) == true){
    player.lifeDrop();
  }
  
  //GERAÇÃO DE ITEMS
  if((frameCount%50)==0 || burguer.getItemFlag()){
    if(burguer.showBurguer()){
      if(burguer.got(player.getPositionX(),10)){ 
        burguer.vanishTomate();
        burguer.feedPool();
      }
    }
  }
  boss.showLife();
  burguer.showPool();
  burguer.attack(boss.getPositionX(), player.getPositionX());
  if(boss.damage(burguer.getDamageFlag())){    
   burguer.setDamageFlag();     
  }if(boss.deadCheck()){
    textStyle(BOLD);
    text("VENCEU", width/2,height/2);
  	noLoop();
  }
  
  player.checkInvu();
  player.lifeCheck();
}