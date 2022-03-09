var rocket,rocket_img;
var space,space_img;
var ballGroup,starGroup;
var gameOver,gameOver_img;

var PLAY = 1;
var END = 0;

var score=0;
var gameState= PLAY;

function preload(){

  rocket_img = loadImage("images.jpg");
  space_img = loadImage("space.jpg");
  ball_img = loadImage("ball.jpg");
  star_img = loadImage("star.jpg");
  gameOver_img = loadImage("gameOver.png");

}

function setup() {
  createCanvas(900,800)

  space = createSprite(450,400,50,50);
  space.addImage("space",space_img);
  space.scale = 9
  space.y = space.width /2;
  space.velocityY = -(6 + 3);

  rocket = createSprite(450,700,50,50);
  rocket.addImage("rocket",rocket_img);
  rocket.scale = 0.6;

  gameOver = createSprite(450,400,50,50);
  gameOver.addImage("gameOver",gameOver_img);
  //gameOver.scale = 

  ballGroup = new Group();
  starGroup = new Group();

}

function draw() {
  background(255,25,255)
  text("Score: "+ score, 450,30);

  
  space.velocityY = -(6 + 3);

  if (space.y < 0){
    space.y = space.width/2;
  }

  if(gameState === PLAY){

  gameOver.visible = false;

  Sball();
  Sstar();

  //if(keyDown("UP_ARROW")){
  //  rocket.velocityY = -3;
  //}

  //if(keyDown("DOWN_ARROW")){
  //  rocket.velocityY = 3;
  //}

  if(keyDown("LEFT_ARROW")){
    rocket.velocityX = -3;
  }

  if(keyDown("RIGHT_ARROW")){
    rocket.velocityX = 3;
  }

  starGroup.collide(rocket,invisible)

  if(rocket.isTouching(ballGroup)){
    gameState = END;
  }

 }else if(gameState === END){
    ballGroup.velocityX = 0;
    ballGroup.velocityY = 0;

    starGroup.velocityX = 0;
    starGroup.velocityY = 0;

    gameOver.visible = true;

    text("Press R To Restart",500,200)

    if(keyDown("r")){
      reset();
    }

 }

  //createEdgeSprites(edges);
  //rocket.collide(edges);

  drawSprites();
}

function invisible() {
  starGroup.visible = false;
  score = score+1;
}

function Sball() {
  if(frameCount % 250 === 0) {
    var ball = createSprite(Math.round(random(900)),10,110,310);
    ball.scale = 0.5;
    ball.velocityY = 3;
    imageMode(CENTER)
    ball.addImage(ball_img);
  
    ball.lifetime = 300;
  
    ballGroup.add(ball);
  }

  }

function Sstar() {
  if(frameCount % 180 === 0) {
    var star = createSprite(Math.round(random(900)),10,110,310);
    star.scale = 0.2;
    star.velocityY = 3;
    imageMode(CENTER)
    star.addImage(star_img);
  
    star.lifetime = 300;
  
    starGroup.add(star);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  starGroup.destroyEach();
  ballGroup.destroyEach();
  score = 0;
}