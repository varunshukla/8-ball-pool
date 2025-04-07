function Game() {}

Game.prototype.init = function () {
  this.gameWorld = new GameWorld();
};

Game.prototype.start = function () {
  poolGame.init();
  poolGame.mainLoop();
};

Game.prototype.mainLoop = function () {
  Canvas.clear();
  poolGame.gameWorld.draw();
  poolGame.gameWorld.update();
  mouse.reset();
  requestAnimationFrame(poolGame.mainLoop);
};

let poolGame = new Game();
