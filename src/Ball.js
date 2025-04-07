function Ball(position, color) {
  this.position = position;
  this.velocity = new Vector2();
  this.moving = false;
  this.sprite = getBallSpriteByColor(color);
  this.color = color;
  this.visible = true;
}
Ball.prototype.update = function (DELTA) {
  if (!this.visible) {
    return;
  }
  this.position.addTo(this.velocity.mult(DELTA));
  // applying friction
  this.velocity = this.velocity.mult(0.984);
  if (this.velocity.length() < CONSTANTS.minVelocityLength) {
    this.velocity = new Vector2();
    this.moving = false;
  }
};

Ball.prototype.draw = function () {
  if (!this.visible) {
    return;
  }
  Canvas.drawImage(this.sprite, this.position, CONSTANTS.ballOrigin);
};

Ball.prototype.shoot = function (power, rotation) {
  this.velocity = new Vector2(
    power * Math.cos(rotation),
    power * Math.sin(rotation)
  );
  this.moving = true;
};
Ball.prototype.handleBallInPocket = function () {
  if (!this.visible) return;
  let inPocket = CONSTANTS.pockets.some((pocket) => {
    return this.position.distFrom(pocket) < CONSTANTS.pocketRadius;
  });
  if (!inPocket) {
    return;
  }
  this.visible = false;
  this.moving = false;
};

Ball.prototype.collideWithBall = function (ball) {
  if (!this.visible || !ball.visible) {
    return;
  }
  // based on elastic collision doc by Chad Berchek: elastic collision in two dimensions
  // find a normal vector
  const n = this.position.subtract(ball.position);
  //find the distance
  const dist = n.length();
  if (dist > CONSTANTS.ballDiameter) {
    return;
  }
  // find unit normal vector
  const un = n.mult(1 / n.length());

  // find unit tangent vector
  const ut = new Vector2(-un.y, un.x);

  // resolving velocities into normal and tangential components: project velocities onto unit normal and uit tangent vecotrs
  const v1n = un.dot(this.velocity);
  const v1t = ut.dot(this.velocity);
  const v2n = un.dot(ball.velocity);
  const v2t = ut.dot(ball.velocity);

  // find new normal velocities
  let v1ntag = v2n;
  let v2ntag = v1n;

  // convert scaler normal and tangetial velocities into vectors
  v1ntag = un.mult(v1ntag);
  const v1ttag = ut.mult(v1t);
  v2ntag = un.mult(v2ntag);
  const v2ttag = ut.mult(v2t);

  // update velocities
  this.velocity = v1ntag.add(v1ttag);
  ball.velocity = v2ntag.add(v2ttag);

  this.moving = true;
  ball.moving = true;
};

Ball.prototype.collideWithTable = function (table) {
  if (!this.moving || !this.visible) {
    return;
  }

  let collided = false;
  if (this.position.y <= table.topY + CONSTANTS.ballRadius) {
    this.position.y = table.topY + CONSTANTS.ballRadius;
    this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
    collided = true;
  }
  if (this.position.x >= table.rightX - CONSTANTS.ballRadius) {
    this.position.x = table.rightX - CONSTANTS.ballRadius;
    this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
    collided = true;
  }
  if (this.position.y >= table.bottomY - CONSTANTS.ballRadius) {
    this.position.y = table.bottomY - CONSTANTS.ballRadius;
    this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
    collided = true;
  }
  if (this.position.x <= table.leftX + CONSTANTS.ballRadius) {
    this.position.x = table.leftX + CONSTANTS.ballRadius;
    this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
    collided = true;
  }
  if (collided) {
    this.velocity = this.velocity.mult(0.984);
  }
};

Ball.prototype.collideWith = function (object) {
  if (object instanceof Ball) {
    this.collideWithBall(object);
  } else {
    this.collideWithTable(object);
  }
};
