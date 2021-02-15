var database;
var position;
var bgImg ;
var balloonAnimation, balloonImg02, balloon ;
var edges ;

function preload(){
  bgImg = loadImage("bgImg.png")
  balloonAnimation = loadAnimation("Balloon01.png", "Balloon02.png", "Balloon03.png")
  balloonImg02 = loadAnimation("Balloon02.png")
}

function setup() {
  database = firebase.database();
  createCanvas(1200,600);

  balloon = createSprite (150,200,100,450)
  balloon.addAnimation("balloon",balloonAnimation )
  balloon.scale = 0.5 ;

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value",readPosition,showError);
}

function draw() {
  background(bgImg); 
  edges = createEdgeSprites();

  if(keyDown(LEFT_ARROW)){
    writePosition(-5,0);
  } 
  else if(keyDown(RIGHT_ARROW)){
    writePosition(5,0);
  } 
  else if(keyDown(UP_ARROW)){
    writePosition(0,-10);
    balloon.scale = balloon.scale -0.01;
  } 
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+10);
    balloon.scale = balloon.scale +0.01;
  }

  balloon.collide(edges);

  drawSprites();

  stroke("black")
  strokeWeight(1)
  fill("black")
  textFont("Shadows Into Light Two")
  textSize(25)
  text("Use arrow keys to move the Hot Air Balloon. Enjoy the ride 😀 !",20,30)
}

function writePosition(x,y){
  database.ref('balloon/position').set({
    'x' : position.x + x,
    'y' :position.y + y
  })
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x ;
  balloon.y = position.y ;
}

function showError(){
  console.log("Error");
}