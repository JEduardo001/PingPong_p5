let ball;
let leftPaddle;
let rightPaddle;
let leftScore = 0;
let rightScore = 0;
let maxScore = 10;

function setup() {
  createCanvas(600, 400);
  ball = new Ball();
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
}

function draw() {
  background(0);
  ball.show();
  ball.update();
  ball.checkCollision(leftPaddle);
  ball.checkCollision(rightPaddle);
  leftPaddle.show();
  leftPaddle.update();
  rightPaddle.show();
  rightPaddle.update();
  textSize(32);
  fill(255);
  text(leftScore, width / 4, 50);
  text(rightScore, 3 * width / 4, 50);

  if (leftScore >= maxScore) {
    textSize(64);
    textAlign(CENTER, CENTER);
    fill(0, 255, 0);
    text('¡Jugador 1 gana!', width / 2, height / 2);
    noLoop();
  } else if (rightScore >= maxScore) {
    textSize(64);
    textAlign(CENTER, CENTER);
    fill(0, 255, 0);
    text('¡Jugador 2 gana!', width / 2, height / 2);
    noLoop();
  }
}

class Ball {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.diameter = 20;
    this.xSpeed = random(2, 4);
    this.ySpeed = random(2, 4);
    this.xSpeed *= random() > 0.5 ? 1 : -1;
    this.ySpeed *= random() > 0.5 ? 1 : -1;
  }

  show() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.diameter);
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }

    if (this.x < 0) {
      rightScore++;
      this.reset();
    } else if (this.x > width) {
      leftScore++;
      this.reset();
    }
  }

  checkCollision(paddle) {
    if (this.x - this.diameter / 2 < paddle.x + paddle.width && 
        this.x + this.diameter / 2 > paddle.x &&
        this.y > paddle.y && 
        this.y < paddle.y + paddle.height) {
      this.xSpeed *= -1;

      if (this.xSpeed > 0) {
        this.xSpeed += 0.5;
      } else {
        this.xSpeed -= 0.5;
      }

      if (this.ySpeed > 0) {
        this.ySpeed += 0.5;
      } else {
        this.ySpeed -= 0.5;
      }
    }
  }
}

class Paddle {
  constructor(isLeft) {
    this.isLeft = isLeft;
    this.width = 20;
    this.height = 100;
    this.y = height / 2 - this.height / 2;
    this.x = isLeft ? 0 : width - this.width;
  }

  show() {
    fill(255);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
  }

  update() {
    if (this.isLeft) {
      if (keyIsDown(87) && this.y > 0) {
        this.y -= 5;
      }
      if (keyIsDown(83) && this.y < height - this.height) {
        this.y += 5;
      }
    } else {
      if (keyIsDown(UP_ARROW) && this.y > 0) {
        this.y -= 5;
      }
      if (keyIsDown(DOWN_ARROW) && this.y < height - this.height) {
        this.y += 5;
      }
    }
  }
}
