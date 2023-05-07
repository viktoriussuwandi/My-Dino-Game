import Player from "./controller/player.js"


const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAME_WIDTH    = 800;
const GAME_HEIGHT   = 200;
const PLAYER_WIDTH  = 88/1.5;
const PLAYER_HEIGHT = 94/1.5;
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;

//Objects
let player        = null;
let scaleRatio    = null;
let previousTime  = null;

function createSprites() {
  const playerWidthInGame   = PLAYER_WIDTH * scaleRatio;
  const playerHeightInGame  = PLAYER_HEIGHT * scaleRatio;
  const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
  const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;

  player = new Player(ctx,playerWidthInGame,playerHeightInGame,minJumpHeightInGame,maxJumpHeightInGame,scaleRatio)
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
  previousTime - currentTime
  clearScreen();

  //update game objects
  player.draw()
  
  //draw game objects

  
  requestAnimationFrame(gameLoop);
  
}

requestAnimationFrame(gameLoop);