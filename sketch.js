var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieImg;
var heart1,heart2,heart3;
var heart1Img,heart2Img,heart3Img;
var zombieGroup
var bullet,bulletImg;
var bulletGroup;
var bullets=75;
var gameState="fight"

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")
  heart1Img= loadImage("assets/heart_1.png")
  heart2Img= loadImage("assets/heart_2.png")
  heart3Img= loadImage("assets/heart_3.png")
  bulletImg= loadImage("assets/bullet.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

heart1=createSprite(displayWidth-150,40,20,20);
heart1.visible=false;
heart1.addImage("heart1",heart1Img);
heart2=createSprite(displayWidth-100,40,20,20)
heart2.visible=false;
heart2.addImage("heart2",heart2Img);
heart3=createSprite(displayWidth-150,40,20,20);
heart3.visible=false;
heart3.addImage("heart3",heart3Img)
zombieGroup=new Group()
bulletGroup=new Group()
}

function draw() {
  background(0); 

if(gameState==="fight"){


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if(keyDown("LEFT_ARROW")||touches.length>0){
  player.x = player.x-30
 }
 if(keyDown("RIGHT_ARROW")||touches.length>0){
  player.x = player.x+30
 }



//release bullets and change the image of shooter to shooting position when space is pressed

/*if(keyCode===32||touches.length>0){
  player.y = player.y+30*/

if(keyWentDown("space")){
 bullet=createSprite(displayWidth-1150,player.y-30,20,10)
 bullet.addImage(bulletImg)
  bullet.velocityX=20
  bulletGroup.add(bullet)
  player.depth=bullet.depth;
  player.depth=player.depth+2
  player.addImage(shooter_shooting)
  bullet.scale=0.10
 bullets=bullets-1
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(bullets==0){
  gameState="bullet"
}

if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0; i<zombieGroup.length; i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy();
      bulletGroup.destroyEach()
    }
  }
}


if(zombieGroup.isTouching(player)){
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy()
    }
  }
}
enemy()
}
drawSprites();

if(gameState=="lost"){
  textSize(100);
  fill("blue")
  text("Try Again", 150,150);
  zombieGroup.destroyEach();
  player.destroy()
}
else if(gameState=="won"){
  textSize(100);
  fill("green")
  text("Good Job!",150,150);
  zombieGroup.destroyEach();
  player.destroy()
}
else if(gameState=="bullet"){
  textSize(100);
  fill("red")
  text("You ran out of bullets...",150,150);
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach()
}
}
function enemy(){
  if(frameCount%50===0){
    zombie=createSprite(random(500,1100),random(100,500),40,40);
    zombie.addImage(zombieImg)
    zombie.velocityX=-3;
    zombieGroup.add(zombie)
    zombie.scale=0.15
  }
  
}