import Cactus  from "./cactus.js";

export default class Cacti{

  CACTUS_INTERVAL_MIN = 500;
  CACTUS_INTERVAL_MAX = 2000;

  nextCactusInterval = null;
  cacti = [];
  
  constructor(ctx, cactiImages, scaleRatio, speed) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.cactiImages = cactiImages;
    this.scaleRatio  = scaleRatio;
    this.speed = speed;
    
    this.setNextCactusTime();
    
  }

  setNextCactusTime() {
    const num = this.getRandomNumber(this.CACTUS_INTERVAL_MIN, this.CACTUS_INTERVAL_MAX);
    this.nextCactusInterval = num;
  }
  
  getRandomNumber(min,max) {
    return Math.floor( Math.random() * (max - min + 1) + min );
  }

  createCactus() {
    const index = this.getRandomNumber( 0, this.cactiImages.length - 1);
    const cactusImage = this.cactiImages[ index ];
    const x = this.canvas.width * 1.5;
    const y = this.canvas.height - cactusImage.height;
    const cactus = new Cactus(this.ctx, x, y, cactusImage.width, cactusImage.height, cactusImage.image);
    
  }
  
  update(gameSpeed, frameTimeDelta) {
    if (this.nextCactusInterval <= 0) { 
      this.createCactus();
      this.setNextCactusTime(); 
    }
    this.nextCactusInterval -= frameTimeDelta;
    
  }
  
  draw() {
    
  }
  
}