//global variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var groupCac;
var groupClo;

var gameOver;
var overImage;

var restart;
var button;

var trex_running;
var trex;
var ground;
var groundimage;
var invisibleGround;
var cloud;
var cloudImage;
var cactus;
var cac1;
var cac2;
var cac3;
var cac4;
var cac5;
var cac6;
var crow,crowImage;
var groupCro;

var trex_shocked;

var score =0;
var checkPointSound;
var jump;
var die;

function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png",
  "trex4.png")
  groundimage=loadImage("ground2.png")
  cloudImage=loadImage("cloud.png")
  cac1=loadImage("obstacle1.png")
  cac2=loadImage("obstacle2.png")
  cac3=loadImage("obstacle3.png")
  cac4=loadImage("obstacle4.png")
  cac5=loadImage("obstacle5.png")
  cac6=loadImage("obstacle6.png")
  
  trex_shocked = loadAnimation("trex_collided.png")
  overImage = loadImage("gameOver.png")
  button = loadImage("restart.png")
  
  checkPointSound = loadSound("checkPoint.mp3");
  jump = loadSound("jump.mp3")
  die = loadSound("die.mp3")
  crowImage=loadImage("crow.png")
}

function setup(){
  createCanvas(600,200)
  
  trex = createSprite(60,160,50,50);
  trex.addAnimation("Dino",trex_running);
  trex.addAnimation("Collided",trex_shocked)
  trex.scale=0.5
  //trex.debug=true
  trex.setCollider("circle",0,0,40)
  //trex.setCollider("rectangle",0,0,200,100)
  gameOver = createSprite(300,110,30,10)
  gameOver.addImage(overImage)
  gameOver.scale=0.5
  gameOver.visible=false
 
  ground = createSprite(300,190,600,10)
 ground.addImage(groundimage)
  
  restart = createSprite(300,140,30,10)
  restart.addImage(button)
  restart.scale=0.5
  restart.visible=false

  
  invisibleGround = createSprite(300,196,600,5);
  invisibleGround.visible = false;
  
  groupCac = new Group();
  groupClo = new Group();
  groupCro=new Group();
//explanation of Random numbers
// var kitkat = (random(1,100));
//  console.log(kitkat);
  
 

}

function draw(){
  
  background("tan");
   //local variable
  //var laptop = "samsung";
   // console.log(laptop);
  text("Points   : " + score,500,50)
  
 if(gameState === PLAY){
   
   if(frameCount % 10 ===0){
   score = score +1;
   }
   
   if(score %100 ===0 && score>0){
      checkPointSound.play();
      
      }

      
   if(keyDown("space")&&trex.y>160){
     jump.play();
     trex.velocityY = -17;
     }
   
  trex.velocityY = trex.velocityY +1;
   
    ground.velocityX = -(6+3*score/50);
  if (ground.x < 0){  
      
      ground.x = 300;
      }
  
   
  spawnObstacle();
  spawnClouds();
   spawnCrow();
   if(groupCac.isTouching(trex)||groupCro.isTouching(trex)){
      gameState = END;
     die.play();
     //automatic create
     //trex.velocityY = -12;
     //jump.play();
    
      }
    }
  
  
  else if(gameState === END){
    
    trex.changeAnimation("Collided",trex_shocked);
    
              ground.velocityX = 0;
    
    groupCac.setVelocityXEach(0);
    groupClo.setVelocityXEach(0);
     groupCac.setLifetimeEach(-1)
    groupClo.setLifetimeEach(-1)
    
    restart.visible=true
    gameOver.visible=true
    
    trex.velocityY=0 
          }


  trex.collide(invisibleGround);
  if(mousePressedOver(restart)){
     //console.log("mouse")
    gameState=PLAY
    groupCac.destroyEach()
    groupClo.destroyEach()
    trex.changeAnimation("Dino",trex_running)
    restart.visible=false
    gameOver.visible=false
    score=0;
     }

  drawSprites();

 
}

function spawnClouds(){
  
if (frameCount % 60 === 0 ){
  
  cloud = createSprite(600,10,10,10);
  cloud.y = random(20,120);
  cloud.velocityX = -3;
  cloud.addImage(cloudImage)
  cloud.scale=0.5
  
   // time = 600 / 3;
  cloud.lifetime = 200;

  
  //string Concatenation
  // console.log("The depth of the Trex is :  "   +   trex.depth)
 //console.log("The depth of the cloud is :  "   +   cloud.depth);
 
  
  trex.depth = cloud.depth;
  trex.depth = trex.depth + 1;
 groupClo.add(cloud);
}   
  
}

function spawnObstacle(){
  if(frameCount % 120 === 0 ){
  cactus=createSprite(600,180,10,10)
  cactus.velocityX=-(6+3*score/50)
  cactus.addImage(cac3)
  cactus.scale=0.5
    
  cactus.lifetime=300;
  groupCac.add(cactus);
     var problem = Math.round(random(1,6));
   // console.log (problem);
    switch(problem) {
        
      case 1: cactus.addImage(cac1);
              break;
      case 2: cactus.addImage(cac2);
              break;
      case 3: cactus.addImage(cac3);
              break;
      case 4: cactus.addImage(cac4);
              break;
      case 5: cactus.addImage(cac5);
              break;
      case 6: cactus.addImage(cac6);
              break;
      default: break;
    }
  }
  
}

function spawnCrow(){
if(score>100){
  

if (frameCount % 60 === 0 ){
  
  crow = createSprite(600,10,10,10);
  crow.y = random(20,100);
  crow.velocityX = -3;
  crow.addImage(crowImage)
  crow.scale=0.1
  
   // time = 600 / 3;
  crow.lifetime = 200;

  
  //string Concatenation
  // console.log("The depth of the Trex is :  "   +   trex.depth)
 //console.log("The depth of the cloud is :  "   +   cloud.depth);
 
  
  
 groupCro.add(crow);
}   
} 
}