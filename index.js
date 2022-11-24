const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth / 1.1;
canvas.height = window.innerHeight / 1.2;

const SNAKE_SPEED = 3;

class Snake {
  constructor() {
    this.position = { x: 170, y: 200 };

    this.velocity = {
      x: SNAKE_SPEED,
      y: 0,
    };
    this.score = 0;
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "lightblue";
    ctx.fillRect(this.position.x, this.position.y, 10, 10);
    ctx.strokeRect(this.position.x, this.position.y, 10, 10);
  }

  move() {
    if (this.velocity.x != 0) {
      return (this.position.x += this.velocity.x);
    }
    if (this.velocity.y != 0) {
      return (this.position.y += this.velocity.y);
    }
  }
}

class Food {
  constructor() {
    this.position = {
      x: Math.floor(Math.random() * canvas.width - 5),
      y: Math.floor(Math.random() * canvas.height - 5),
    };
  }

  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.position.x, this.position.y, 10, 10);
  }

  disappear() {
    snake.score++;
    this.position.x = Math.floor(Math.random() * canvas.width - 1);
    this.position.y = Math.floor(Math.random() * canvas.height - 1);
  }
}

let snake = new Snake();
let food = new Food();

function checkBorders(snake) {
  if (snake.position.x <= 0) {
    snake.position.x = canvas.width - 3;
    snake.velocity.x = -SNAKE_SPEED;
  } else if (snake.position.x >= canvas.width) {
    snake.position.x = 3;
    snake.velocity.x = SNAKE_SPEED;
  } else if ((snake.position.y >= canvas.height)) {
    snake.position.y = 3;
    snake.velocity.y = SNAKE_SPEED;
  } else if ((snake.position.y <= 0)){
    snake.position.y = canvas.height - 3
    snake.velocity.y = -SNAKE_SPEED
  }
}

window.addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "ArrowUp" || "w":
      snake.velocity.x = 0;
      snake.velocity.y = -SNAKE_SPEED;
      break;
    case "ArrowLeft" || "a":
      snake.velocity.x = -SNAKE_SPEED;
      snake.velocity.y = 0;
      break;
    case "ArrowRight" || "d":
      snake.velocity.x = SNAKE_SPEED;
      snake.velocity.y = 0;
      break;
    case "ArrowDown" || "s":
      snake.velocity.x = 0;
      snake.velocity.y = SNAKE_SPEED;
      break;
    default:
      break;
  }
});

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  food.draw();

  if (
    snake.position.x - food.position.x < 2 &&
    snake.position.y - food.position.y < 2
  ) {
    food.disappear();
    snake.score++;
  }

  snake.move();
  snake.draw();
  checkBorders(snake);
  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
