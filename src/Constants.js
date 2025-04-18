const CONSTANTS = {
  ballsParams: [
    [new Vector2(1022, 413), COLOR.YELLOW], //1
    [new Vector2(1056, 393), COLOR.YELLOW], //2
    [new Vector2(1056, 433), COLOR.RED], //3
    [new Vector2(1090, 374), COLOR.RED], //4
    [new Vector2(1090, 413), COLOR.BLACK], //5
    [new Vector2(1090, 452), COLOR.YELLOW], //6
    [new Vector2(1126, 354), COLOR.YELLOW], //7
    [new Vector2(1126, 393), COLOR.RED], //8
    [new Vector2(1126, 433), COLOR.YELLOW], //9
    [new Vector2(1126, 472), COLOR.RED], //10
    [new Vector2(1162, 335), COLOR.RED], //11
    [new Vector2(1162, 374), COLOR.RED], //12
    [new Vector2(1162, 413), COLOR.YELLOW], //13
    [new Vector2(1162, 452), COLOR.RED], //14
    [new Vector2(1162, 491), COLOR.YELLOW], //15
    [new Vector2(413, 413), COLOR.WHITE],
  ],
  delta: 1 / 177,
  stickOrigin: new Vector2(970, 11),
  stickShotOrigin: new Vector2(950, 11),
  maxPower: 7500,
  powerInterval: 120,
  originXInterval: 5,

  whiteBallInitialPos: new Vector2(413, 413),
  ballOrigin: new Vector2(25, 25),
  ballDiameter: 38,
  ballRadius: 19,
  minVelocityLength: 5,

  pocketRadius: 46,
  pockets: [
    new Vector2(750, 32),
    new Vector2(750, 794),
    new Vector2(62, 62),
    new Vector2(1435, 62),
    new Vector2(62, 762),
    new Vector2(1435, 762),
  ],
};
