const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;

var bg_img;
var food;
var rabbit;

var button;
var bunny;

var blink;
var eat;
var sad;

var background_music;
var sad_sound;
var rope_cut;
var eating_sound;
var soprador;
var botao_soprador;
var mute_botao;
var button2;
var burron3;
var rope2;
var rope3;
var rope2_con;
var rope3_con;
var canvaswidth;
var canvasheight;


function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation('blink_1.png','blink_2.png','blink_3.png');
  eat = loadAnimation('eat_0.png','eat_1.png','eat_2.png','eat_3.png','eat_4.png');
  sad = loadAnimation('sad_1.png','sad_2.png','sad_3.png');
 blink.playing = true
 eat.playing = true
 sad.playing = true
 eat.looping = false
 sad.looping = false

 background_music = loadSound('sound1.mp3');
 sad_sound = loadSound('sad.wav');
 rope_cut = loadSound('rope_cut.mp3');
 eating_sound = loadSound('eating_sound.mp3');
 soprador = loadSound('air.wav');
}

function setup() {
  
  frameRate(80);
  
  var ismobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (ismobile){
   canvaswidth = displayWidth
   canvasheight = displayHeight
   createCanvas(displayWidth,displayHeight);

  
  }
  else {
   canvaswidth = windowWidth
   canvasheight = windowHeight
   createCanvas (windowWidth,windowHeight); 
  }
  

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
  button2 = createImg('cut_btn.png');
  button2.position(330,35);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(360,200);
  button3.size(50,50);
  button3.mouseClicked(drop3);

  botao_soprador = createImg('blower.png')
  botao_soprador.position(10,250);
  botao_soprador.size(150,100);
  botao_soprador.mouseClicked(soprador_de_ar);

 mute_botao = createImg('cut_button.png')
 mute_botao.position(450,20);
 mute_botao.size(50,50);
 mute_botao.mouseClicked(mute);

  background_music.play ();
  background_music.setVolume (0.2);

  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(4,{x:400,y:230});
  
  ground = new Ground(200,canvasheight,600,20);

  blink.frameDelay = 20
  eat.frameDelay = 20
  sad.frameDelay = 20

  bunny = createSprite(230,canvasheight-80,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;
  bunny.addAnimation ("piscando",blink)
  bunny.addAnimation ("comendo",eat)
  bunny.addAnimation ("triste",sad)
  bunny.changeAnimation ("piscando")
  

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  rope2_con = new Link(rope2,fruit);
  rope3_con = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,canvaswidth,canvasheight);
  Engine.update(engine);
  if (fruit){
  image(food,fruit.position.x,fruit.position.y,70,70);
   
 }
  
 if (collide(fruit,bunny)){
bunny.changeAnimation ("comendo");
eating_sound.play ();
}

if (collide(fruit,ground.body)){
 bunny.changeAnimation ("triste");
 sad_sound.play ();
}



  rope.show();
  
  
 rope2.show();
 rope3.show();
 drawSprites ();
}

 



function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
  rope_cut.play ();
}

function collide (objeto1,objeto2){
 if (objeto1!=null){
   var distancia = dist (objeto1.position.x,objeto1.position.y,objeto2.position.x,objeto2.position.y)
   if (distancia <= 80){
   World.remove (world,fruit);
   fruit = null
   return true 
   }
  else {
  return false
  }
  }
 
}

function soprador_de_ar(){
 Body.applyForce (fruit,{x:0,y:0},{x:0.01,y:0})
 soprador.play ()
 
}

function mute(){
 if (background_music.isPlaying()){
   background_music.stop ();
 }
else {
 background_music.play ();
}
}
function drop2()
{
  rope2.break();
  rope2_con.detach();
  rope2_con = null; 
  rope_cut.play ();
}

function drop3()
{
  rope3.break();
  rope3_con.detach();
  rope3_con = null; 
  rope_cut.play ();
}