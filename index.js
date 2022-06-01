const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth / 1.1;
canvas.height = window.innerHeight / 1.2



class Snake {
    constructor() {
        this.position = [
            { x: 170, y: 200 },
        ]

        this.velocity = {
            x: 1,
            y: 0
        }
        this.score = 0
    }


    draw() {
        for (let part of this.position) {
            this.drawPart(part)
        }
    }


    drawPart(part) {
        ctx.fillStyle = 'blue';
        ctx.strokeStyle = 'lightblue';
        ctx.fillRect(part.x, part.y, 10, 10)
        ctx.strokeRect(part.x, part.y, 10, 10)
    }

    move() {
        for (let el of this.position) {
            if (this.velocity.x != 0) {
                return el.x += this.velocity.x

            }
            if (this.velocity.y != 0) {
                return el.y += this.velocity.y
            }
        }
    }

}


class Food {
    constructor() {
        this.position = {
            x: Math.floor(Math.random() * canvas.width - 1),
            y: Math.floor(Math.random() * canvas.height - 1)
        }
    }

    draw() {
        ctx.fillStyle = 'green'
        ctx.fillRect(this.position.x, this.position.y, 10, 10)
    }

    disappear() {
        snake.score++
        this.position.x = Math.floor(Math.random() * canvas.width - 1)
        this.position.y = Math.floor(Math.random() * canvas.height - 1)
    }
}

let snake = new Snake()
let food = new Food()

window.addEventListener(('keydown'), ({ key }) => {
    switch (key) {
        case ('ArrowUp' || 'w'):
            snake.velocity.x = 0
            snake.velocity.y = -1
            break
        case ('ArrowLeft' || 'a'):
            snake.velocity.x = -1
            snake.velocity.y = 0
            break
        case ('ArrowRight' || 'd'):
            snake.velocity.x = 1
            snake.velocity.y = 0
            break
        case ('ArrowDown' || 's'):
            snake.velocity.x = 0
            snake.velocity.y = 1
            break
        default:
            break
    }
})



function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    food.draw()

    if (snake.position[0].x - food.position.x < 2
        && snake.position[0].y - food.position.y < 2) {
        food.disappear()
    }




    snake.move()
    snake.draw()
    window.requestAnimationFrame(loop);
}


window.requestAnimationFrame(loop);
