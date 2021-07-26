var ground, groundImg;
var zombie, zombieImg,zombieEnd;
var edges, sound;
var obstacle,obstacle1, obstacleImg,obstacleImg1;
var obstacleGroup,obstacleGroup1, invisibleGround;
var gameState="play";
var gameOver, gameOverImg;
var score, restart, restartImg;

function preload (){
    groundImg = loadImage("ground.png");
    zombieImg = loadAnimation("zombie0.png","zombie1.png","zombie2.png","zombie3.png","zombie4.png",
    "zombie5.png","zombie6.png","zombie7.png","zombie8.png","zombie9.png");
    obstacleImg = loadAnimation("Images/devil0.png","Images/devil1.png","Images/devil2.png","Images/devil3.png",
    "Images/devil4.png","Images/devil5.png","Images/devil6.png","Images/devil7.png",);
    obstacleImg1=loadImage("obstacle1.png");
    zombieEnd=loadAnimation("zombie0.png")
    sound = loadSound("sound.mp3");
    gameOverImg = loadImage("gameover.png");
    restartImg = loadImage("restart.png");
}

function setup(){
    createCanvas(800, 600);
    ground = createSprite(200,200,800,600);
    ground.addImage(groundImg);
    ground.scale=1.5

    zombie = createSprite(100,450,50,50);
    zombie.addAnimation("running",zombieImg);
    zombie.addAnimation("ending",zombieEnd);
    zombie.scale = 1;
    zombie.debug = false;
    zombie.setCollider("rectangle",0,0,100,250);
    
    invisibleGround = createSprite(100, 550, 800,20);
    invisibleGround.visible = false;

    gameOver = createSprite(400,300);
    gameOver.addImage(gameOverImg);
    gameOver.visible = false;
    gameOver.scale = 1;
    
    restart = createSprite(400,370);
    restart.addImage(restartImg);
    restart.visible = false;
    restart.scale = 0.25;

    edges = createEdgeSprites();
    obstacleGroup = new Group();
    obstacleGroup1 = new Group();

    score = 0;
}

function draw(){
    background(0);
    if(gameState==="play"){
    score = score+Math.round(getFrameRate()/60);
    ground.velocityX = -7;
    if (ground.x<200){
        ground.x = 420
    }
    if (keyDown("right")){
        zombie.x = zombie.x+1
    }
    if (keyDown("left")){
        zombie.x = zombie.x-1
    } 
    if (keyDown("space")&&zombie.y>=100){
        sound.play();
        zombie.velocityY = -12;
    }
    zombie.velocityY = zombie.velocityY+0.5;
    zombie.collide(edges);
    zombie.collide(invisibleGround);
    spawnObstacle();
    spawnObstacle1(); 

    if (obstacleGroup.isTouching(zombie)||obstacleGroup1.isTouching(zombie)){
        gameState="end"
    }
    }else if(gameState === "end"){
        restart.visible = true;
        gameOver.visible = true;
        zombie.velocityX=0;
        zombie.velocityY = 0;
        ground.velocityX = 0;
        obstacleGroup.destroyEach();
        obstacleGroup1.destroyEach();
        zombie.changeAnimation("ending",zombieEnd);

        if (mousePressedOver(restart)){
            reset();
        }
    }
    drawSprites();
    
    stroke("white");
    fill("red");
    textSize(30);
    text("Score: "+score,650,50);
}

function spawnObstacle(){
if (frameCount % 300===0){
    obstacle = createSprite(800, 480, 10, 10);
    obstacle.addAnimation("walking",obstacleImg);
    obstacle.velocityX = -4;
    obstacle.scale = 0.6;
    obstacle.lifetime = 850;
    obstacleGroup.add(obstacle);
    obstacle.debug=false;
    obstacle.setCollider("rectangle",0,0,120,50)
}
}

function spawnObstacle1() {
  if (frameCount % 200 === 0) {
    obstacle1 = createSprite(800, random(450,500), 10, 10);
    obstacle1.addImage("standing", obstacleImg1);
    obstacle1.velocityX = -4;
    obstacle1.scale = 0.5;
    obstacle1.lifetime = 850;
    obstacleGroup1.add(obstacle1);
    obstacle1.debug = false;
  }
}

function reset(){
    gameState = "play";
    gameOver.visible = false;
    restart.visible = false;
    zombie.changeAnimation("running",zombieImg);
    score = 0;

}