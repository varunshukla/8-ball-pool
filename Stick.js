function Stick(position, onShoot) {
  this.position = position;
  this.rotation = 0;
  this.origin = CONSTANTS.stickOrigin.copy();
  this.power = 0;
  this.onShoot = onShoot;
  this.shot = false;
}

Stick.prototype.update = function () {
  if (this.shot) return;
  if (mouse.left.down) {
    this.increasePower();
  } else if (this.power > 0) {
    this.shoot();
  }
  this.updateRotation();
};
Stick.prototype.updateRotation = function () {
  let opposite = mouse.position.y - this.position.y;
  let adjacent = mouse.position.x - this.position.x;
  this.rotation = Math.atan2(opposite, adjacent);
};

Stick.prototype.draw = function () {
  Canvas.drawImage(sprites.stick, this.position, this.origin, this.rotation);
};

Stick.prototype.increasePower = function () {
  if (this.power > CONSTANTS.maxPower) {
    return;
  }
  this.power += CONSTANTS.powerInterval;
  this.origin.x += CONSTANTS.originXInterval;
};

Stick.prototype.shoot = function () {
  this.onShoot(this.power, this.rotation);
  this.power = 0;
  this.origin = CONSTANTS.stickShotOrigin.copy();
  this.shot = true;
};

Stick.prototype.reposition = function (position) {
  this.position = position.copy();
  this.origin = CONSTANTS.stickOrigin.copy();
  this.shot = false;
};
