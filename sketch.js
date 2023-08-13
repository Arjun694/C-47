var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieImg, zombieGroup;
var bullet = 100, bulletImg
var heart1, heart2, heart3, heart1Img, heart2Img, heart3Img;
var score;
var gameState = "play";
var life = 3;
var explosionSound, loseSound, winSound;
//var topEdge, bottomEdge;
var edges
var ground


function preload(){
  
  bulletImg = loadImage("/assets/bullet.png");
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  zombieImg = loadImage("assets/zombie.png");
  bgImg = loadImage("assets/bg.jpeg");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");
  explosionSound = loadSound("assets/explosion.mp3");
  loseSound = loadSound("assets/lose.mp3");
  winSound = loadSound("assets/win.mp3")
}

function setup() {

  createCanvas(windowWidth,windowHeight);

  edges = createEdgeSprites();

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  
  //creating the player's hearts
heart1 = createSprite(688, 901, 20, 20);
heart1.addImage("heart1",heart1Img);
heart1.visible = false

heart2 = createSprite(688, 901, 20, 20);
heart2.addImage("heart2",heart2Img);
heart2.visible = false

heart3 = createSprite(688, 901, 20, 20);
heart3.addImage("heart3",heart3Img);
heart3.visible = false

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

zombieGroup = new Group()
bulletGroup = new Group()
}

function draw() {
  background(0); 

  player.collide(edges[2])

  ground = createSprite(217,958,150,40)
  ground.visible = false
  player.bounceOff(ground)

  if (gameState === "end"){

  }
  if(gameState === "play"){
    if(life === 3){
      heart1.visible = false;
      heart2.visible = false;
      heart3.visible = true;
    }
    if(life === 2){
      heart1.visible = false;
      heart2.visible = true;
      heart3.visible = false;
    }
    if(life === 1){
      heart1.visible = true;
      heart2.visible = false;
      heart3.visible = false;
    }
    if(life === 0){
      gameState = "lost";
    }
    if(score == 100){
      gameState = "won";
      winning.play();
    }


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet = createSprite(player.position.x,player.position.y, 20, 7);
  bullet.addImage(bulletImg)
  bullet.scale = 0.1
  bullet.velocityX = 6
  bulletGroup.add(bullet);
  bullet.lifetime = 310
  player.addImage(shooter_shooting)
  
}
//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(zombieGroup.isTouching(bulletGroup)){
  //zombie.visible = false
  //bullet.visible = false
  for(var i=0; i<zombieGroup.length; i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
zombieGroup[i].destroy()
bulletGroup.destroyEach()
winSound.play()
score += 1
    }
  }
}

if(zombieGroup.isTouching(player)){
   for (var i=0; i<zombieGroup.length; i++){
if(zombieGroup[i].isTouching(player)){
  life = life-1
  zombieGroup[i].destroy()
  explosionSound.play()
}
  }
}
spawnEnemy();
drawSprites();
text("score = "+ score, 1627, 160);
text("bullets = "+ bullet, displayWidth-200, displayHeight/2-220);
text("life = "+ life, displayWidth-190, displayHeight/2-220);
textSize(50)
text(mouseX + "," + mouseY, mouseX, mouseY)
  }
}

function spawnEnemy(){
  if(frameCount%50 === 0){
    zombie = createSprite(random(500,1100),random(100,500),40,40)
    zombie.addImage(zombieImg);
    zombie.scale = 0.13
    zombie.velocityX = -5
    zombie.lifetime = 235
    zombieGroup.add(zombie)
  }
}

if(life === 0){
  loseSound.play()
}