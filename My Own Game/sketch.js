var runner;
var bg ;
var bgimg;
var runnerimg
var ground
 
var PLAY = 1;
var END = 0;

var stone;
var hurdle;

var gamestate = PLAY;

var score = 0;
var GameOver;
var GameReset;



function preload() {

  bgimg = loadImage("bg.png");
  runnerimg = loadAnimation("boy1.png", "boy2.png", "boy3.png", "boy4.png", "boy5.png", "boy6.png", "boy7.png", "boy8.png");
  stone = loadImage("stone.png");
  hurdle = loadImage("hurdle.png");
  boyStop = loadAnimation("boy6.png");

}



function setup() {
  createCanvas(1280, 720);

  bg = createSprite(300, 350, 1280, 720);
  bg.addImage("bg", bgimg);
  bg.scale = 2;
  
  runner = createSprite(50, 180, 20, 50);
  runner.addAnimation("runner", runnerimg);
  runner.addAnimation("boyStop", boyStop);
  runner.scale = 0.4;
  runner.debug=true;
  
  ground = createSprite(150, 625, 4000,20);
  ground.visible = false;

  obstacleGroup = new Group();
  GameOver = createSprite(640, 250, 50, 50);
  GameReset = createSprite(640, 350, 50, 50);
  GameOver.visible = false;
  GameReset.visible = false; 
}



function draw() {
  background("black"); 

  if (gamestate === PLAY)
   {
    bg.velocityX = -3;
    score = score + Math.round(getFrameRate()/60);

    if(bg.x < 10)
    {
      bg.x = 600
    }

    if(keyDown("space") && runner.y >= 150) 
    
    {
       runner.velocityY = -10;
    }

    runner.velocityY = runner.velocityY + 0.5;
    
    spawnObstacle();

    if(runner.isTouching(obstacleGroup))
    {

      gamestate = END;


    }

  }
  if(gamestate === END)
  {
    bg.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    runner.changeAnimation("boyStop", boyStop);
    GameOver.visible = true;
    GameReset.visible = true; 
    if(mousePressedOver(GameReset)){

      reset();

    }
  }

  

runner.collide(ground);

  drawSprites();
  textSize(25)
  text("Score: " + score, 1000, 30); 

}

function reset(){

  gamestate = PLAY;
obstacleGroup.destroyEach();
score = 0;
GameOver.visible = false;
GameReset.visible = false;
runner.changeAnimation("runner", runnerimg);
}


function spawnObstacle()
{
if(frameCount%200 === 0){

  obstacle = createSprite(1300, 600, 50, 50);
  obstacle.velocityX = -3;
  obstacle.debug=true;
 
  var rand = Math.round(random(1,2));


  switch(rand)
  {
    case 1:obstacle.addImage(hurdle);
    obstacle.scale = 0.3
    obstacle.setCollider("rectangle", 0,0,200,150);
    break;
    
    case 2:obstacle.addImage(stone)
    obstacle.scale = 0.7
    obstacle.setCollider("rectangle", 0,0,150,100);
    break;

  }
  obstacleGroup.add(obstacle);
  obstacle.lifetime = 450;
  
}


}