export default class Player{
  
  constructor(ctx,height,minJumpHeight,maxJumpHeight,scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.height = height;
    this.minJumpHeight = minJumpHeight;
    this.maxJumpHeight = maxJumpHeight;
    this.scaleRatio = scaleRatio;
  }
  
}