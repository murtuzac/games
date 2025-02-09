const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = "RIGHT";
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};
let gameStarted = false;
let gameInterval = null;
let gameOver = false;

document.addEventListener("keydown", startGame);

document.getElementById("upBtn").addEventListener("click", () => changeDirection({ keyCode: 38 }));
document.getElementById("leftBtn").addEventListener("click", () => changeDirection({ keyCode: 37 }));
document.getElementById("downBtn").addEventListener("click", () => changeDirection({ keyCode: 40 }));
document.getElementById("rightBtn").addEventListener("click", () => changeDirection({ keyCode: 39 }));

function startGame(event) {
    if (!gameStarted) {
        gameStarted = true;
        gameInterval = setInterval(draw, 150);
    }
    changeDirection(event);
}

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== "RIGHT") direction = "LEFT";
    if (key === 38 && direction !== "DOWN") direction = "UP";
    if (key === 39 && direction !== "LEFT") direction = "RIGHT";
    if (key === 40 && direction !== "UP") direction = "DOWN";
}

function draw() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    snake.forEach((segment, index) => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x, segment.y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(segment.x, segment.y, box, box);
        if (index === 0) {
            ctx.fillStyle = "black";
            ctx.fillRect(segment.x, segment.y, box, box);
            ctx.fillStyle = "green";
            ctx.beginPath();
            ctx.arc(segment.x + 6, segment.y + 6, 3, 0, Math.PI * 2);
            ctx.arc(segment.x + 14, segment.y + 6, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    let newX = snake[0].x;
    let newY = snake[0].y;

    if (direction === "LEFT") newX -= box;
    if (direction === "UP") newY -= box;
    if (direction === "RIGHT") newX += box;
    if (direction === "DOWN") newY += box;

    if (newX === food.x && newY === food.y) {
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    if (
        newX < 0 || newY < 0 || newX >= canvas.width || newY >= canvas.height ||
        snake.some(segment => segment.x === newX && segment.y === newY)
    ) {
        clearInterval(gameInterval);
        gameOver = true;
        showGameOver();
        return;
    }

    snake.unshift({ x: newX, y: newY });
}

function showGameOver() {
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", canvas.width / 4, canvas.height / 2);
    document.getElementById("retryBtn").style.display = "inline-block";
}

function restartGame() {
    snake = [{ x: 10 * box, y: 10 * box }];
    direction = "RIGHT";
    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
    gameStarted = false;
    gameOver = false;
    document.getElementById("retryBtn").style.display = "none";
    clearInterval(gameInterval);
    draw();
}

window.onload = function () {
    draw();
};
