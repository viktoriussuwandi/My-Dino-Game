import Player from "./controller/player.js";
import Ground from "./controller/ground.js";
import Cacti  from "./controller/cacti.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAME_SPEED_START     = 0.75
const GAME_SPEED_INCREMENT = 0.000001;

const GAME_WIDTH      = 800;
const GAME_HEIGHT     = 200;
const PLAYER_WIDTH    = 88/1.5;
const PLAYER_HEIGHT   = 94/1.5;
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;
const GROUND_WIDTH    = 2400;
const GROUND_HEIGHT   = 24;
const GROUND_AND_CACTUS_SPEED = 0.5;
const CACTI_CONFIG = [
  { width : 48/1.5, height : 100/1.5, image : "images/cactus_1.png" },
  { width : 98/1.5, height : 100/1.5, image : "images/cactus_2.png" },
  { width : 68/1.5, height : 70/1.5,  image : "images/cactus_3.png" },
];

//Objects
let player = null;
let ground = null;
let cacti  = null;

let scaleRatio      = null;
let previousTime    = null;
let gameSpeed       = GAME_SPEED_START;


function createSprites() {
  const playerWidthInGame   = PLAYER_WIDTH * scaleRatio;
  const playerHeightInGame  = PLAYER_HEIGHT * scaleRatio;
  const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
  const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;

  const groundWidthInGame  = GROUND_WIDTH * scaleRatio;
  const groundHeightInGame = GROUND_HEIGHT * scaleRatio;
  
  player = new Player(ctx,playerWidthInGame,playerHeightInGame,minJumpHeightInGame,maxJumpHeightInGame,scaleRatio);
 
  ground = new Ground(ctx, groundWidthInGame, groundHeightInGame, GROUND_AND_CACTUS_SPEED, scaleRatio);

  const cactiImages = CACTI_CONFIG.map( cactus => {
    const image = new Image();
    image.src = cactus.image;
    return {
      image  : image,
      width  : cactus.width  * scaleRatio,
      height : cactus.height * scaleRatio,
    }
  });
  
  cacti = new Cacti(ctx, cactiImages, scaleRatio, GROUND_AND_CACTUS_SPEED);
  
}

function setScreen() {
  scaleRatio = getScaleRatio();
  canvas.width  = GAME_WIDTH  * scaleRatio;
  canvas.height = GAME_HEIGHT * scaleRatio;
  createSprites();
}

setScreen();
window.addEventListener('resize', () => {
  setTimeout(setScreen,500)
});
if(screen.orientation){ screen.orientation.addEventListener("change",setScreen); }

function getScaleRatio() {
  const screenHeight = Math.min(window.innerHeight,document.documentElement.clientHeight);
  const screenWidth = Math.min(window.innerWidth,document.documentElement.clientWidth);
  let window_is_wider = (screenWidth/screenHeight) < (GAME_WIDTH / GAME_HEIGHT)
  return (window_is_wider ? (screenWidth/GAME_WIDTH) : (screenHeight/GAME_HEIGHT))
}

function clearScreen() {
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  
}

function gameLoop(currentTime) {
  if(previousTime == null) {
    previousTime = currentTime;
    requestAnimationFrame(gameLoop);
    return;
  }
  
  const frameTimeDelta = currentTime - previousTime;
  previousTime = currentTime
  clearScreen();

  //update game objects
  ground.update(gameSpeed, frameTimeDelta);
  cacti.update(gameSpeed, frameTimeDelta);
  player.update(gameSpeed, frameTimeDelta);
  
  //draw game objects
  player.draw();
  cacti.draw();
  ground.draw();
  
  requestAnimationFrame(gameLoop);
  
}

requestAnimationFrame(gameLoop);
