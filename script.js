const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAME_WIDTH  = 800;
const GAME_HEIGHT = 200;

function setScreen() {
  sclaRation = getScaleRatio();

}

function getScaleRatio() {
  const screenHeight = Math.min(
    window.innerHeight,
    document.documentElement,
    clientHeight
  );

  const screenHeight = Math.min(
    window.innerWidth,
    document.documentElement,
    clientWidth
  );

  
}