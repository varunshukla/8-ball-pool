let sprites = {};
let assetsStillLoading = 0;

function assetsLoadingLogo(callback) {
  if (assetsStillLoading) {
    requestAnimationFrame(assetsLoadingLogo.bind(this, callback));
  } else {
    callback();
  }
}

function loadAssets(callback) {
  function loadSprites(fileName) {
    let spriteImage = new Image();
    spriteImage.src = "./assets/sprites/" + fileName;
    spriteImage.onload = function () {
      assetsStillLoading--;
    };
    return spriteImage;
  }
  sprites.background = loadSprites("spr_background4.png");
  sprites.stick = loadSprites("spr_stick.png");
  sprites.whiteBall = loadSprites("spr_ball2.png");
  sprites.yellowBall = loadSprites("spr_yellowBall2.png");
  sprites.redBall = loadSprites("spr_redBall2.png");
  sprites.blackBall = loadSprites("spr_blackBall2.png");
  assetsLoadingLogo(callback);
}

function getBallSpriteByColor(color) {
  switch (color) {
    case COLOR.RED:
      return sprites.redBall;
    case COLOR.WHITE:
      return sprites.whiteBall;
    case COLOR.YELLOW:
      return sprites.yellowBall;
    case COLOR.BLACK:
      return sprites.blackBall;
  }
}
