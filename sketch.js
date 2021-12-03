
var trex ,trex_running;
var edges;
var solo;
var soloimg;
var soloinvi;
var nuvemimg;
var cactosimg1;
var cactosimg2;
var cactosimg3;
var cactosimg4;
var cactosimg5;
var cactosimg6;
var grpcactos;
var grpnuvens;
var estadodojogo = 'JOGAR'
var objeto
var fim
var sompulo, somcolisao, sompontuacao;
var ptc = 0
var vl = 0
var recaregar,recaregarimg;
function preload(){ // funç~;ao que carregar todas as imagens e animações
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  soloimg = loadImage('ground2.png');

  recaregarimg = loadImage('restart.png')
 
  objeto = loadImage('gameOver.png')
  nuvemimg = loadImage('cloud.png');
  cactosimg1 = loadImage ('obstacle1.png')
  cactosimg2 = loadImage ('obstacle2.png')
  cactosimg3= loadImage ('obstacle3.png')
  cactosimg4 = loadImage ('obstacle4.png')
  cactosimg5 = loadImage ('obstacle5.png')
  cactosimg6 = loadImage ('obstacle6.png')

  sompulo = loadSound('jump.mp3')
  somcolisao = loadSound('die.mp3')
  sompontuacao = loadSound('checkPoint.mp3')
}

function setup(){ // todas as configuraçoes dos objetos
  createCanvas(600,200)
  
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running",trex_running);
  trex.scale = 0.5;

  edges = createEdgeSprites();
 
  solo = createSprite(300,190,600,20);
  solo.addImage(soloimg);

  soloinvi = createSprite(300,200,600,10);
  soloinvi.visible = false
  grpcactos = new Group()
  grpnuvens = new Group()

  fim = createSprite(300,100)
  fim.addImage(objeto)
  fim.visible = false

  recaregar = createSprite(300,130)
  recaregar.addImage(recaregarimg)
  recaregar.visible = false
  recaregar.scale = 0.5
  trex.setCollider('circle', 0,0,35)
 // trex.debug = true
}


function draw(){
  background("white");
  text('pontuação: '+ptc,500,30)

if(ptc%100 === 0){
  sompontuacao.play()
  vl+=1
}
  

  trex.collide(soloinvi)
  
  drawSprites();
 
  if(estadodojogo === 'JOGAR'){ 
    if(keyDown("space") && trex.y > 160){
      trex.velocityY = -12;
      sompulo.play()

    }
    ptc +=1
    trex.velocityY = trex.velocityY + 0.5; // gravidade
    
    solo.velocityX = -2
  if(solo.x <0){
    solo.x = 300
  }
  
  drawnuvems();
  drawcactos(); 
  if(trex.isTouching(grpcactos)){
    estadodojogo = 'ENCERRAR'
    somcolisao.play()
  }
  }
  else if(estadodojogo === 'ENCERRAR'){
    solo.velocityX = 0
    grpcactos.setVelocityXEach(0)
    grpnuvens.setVelocityXEach(0)

    grpcactos.setLifetimeEach(-1)
    grpnuvens.setLifetimeEach(-1)

    fim.visible = true
    trex.velocityY = 0
    //trex.y = 174
    recaregar.visible = true

    if(mousePressedOver(recaregar)){
      estadodojogo = 'JOGAR'
      grpcactos.destroyEach()
      grpnuvens.destroyEach()
      fim.visible = false
      recaregar.visible = false
      ptc = 0
    }
  }
}

function  drawnuvems(){
  if(frameCount%60 === 0){
    var nuvens = createSprite(600,20,15,15)
    nuvens.addImage(nuvemimg)
  nuvens.velocityX = -3
  nuvens.y = Math.round(random(20,100))
    nuvens.lifetime = 250
    grpnuvens.add(nuvens)
    nuvens.depth = trex.depth -1
}

}

function drawcactos(){
  if(frameCount%60 === 0){

  var cactos = createSprite(600,178,15,30)
  cactos.velocityX = -(4+vl)
  var cactospc = Math.round(random(1,6))
  switch(cactospc){
case 1:cactos.addImage(cactosimg1)
break

case 2:cactos.addImage(cactosimg2)
break
case 3:cactos.addImage(cactosimg3)
break
case 4:cactos.addImage(cactosimg4)
break
case 5:cactos.addImage(cactosimg5)
break
case 6:cactos.addImage(cactosimg6)
break


}
  cactos.scale = 0.5
  cactos.lifetime = 250
  grpcactos.add(cactos)
}

}
