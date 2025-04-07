function GameWorld() {
  this.balls = CONSTANTS.ballsParams.map((params) => new Ball(...params));

  this.whiteBall = this.balls.find((ball) => ball.color === COLOR.WHITE);
  this.stick = new Stick(
    CONSTANTS.whiteBallInitialPos,
    this.whiteBall.shoot.bind(this.whiteBall)
  );
  this.table = {
    topY: 57,
    rightX: 1443,
    bottomY: 768,
    leftX: 57,
  };
}
GameWorld.prototype.handleCollision = function () {
  for (let i = 0; i < this.balls.length; i++) {
    this.balls[i].handleBallInPocket();
    this.balls[i].collideWithTable(this.table);
    for (let j = i + 1; j < this.balls.length; j++) {
      const firstBall = this.balls[i];
      const secondBall = this.balls[j];
      firstBall.collideWithBall(secondBall);
    }
  }
};

GameWorld.prototype.update = function () {
  this.handleCollision();
  this.stick.update();
  for (let i = 0; i < this.balls.length; i++) {
    this.balls[i].update(CONSTANTS.delta);
  }

  if (!this.ballsMoving() && this.stick.shot) {
    this.stick.reposition(this.whiteBall.position);
  }
};
GameWorld.prototype.draw = function () {
  Canvas.drawImage(sprites.background, { x: 0, y: 0 });
  for (let i = 0; i < this.balls.length; i++) {
    this.balls[i].draw(CONSTANTS.delta);
  }
  this.stick.draw();
};

GameWorld.prototype.ballsMoving = function () {
  let ballsMoving = false;
  for (let i = 0; i < this.balls.length; i++) {
    if (this.balls[i].moving) {
      ballsMoving = true;
      break;
    }
  }
  return ballsMoving;
};
