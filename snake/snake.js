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
let touchStartX = 0;
let touchStartY = 0;

// Start the game when a key is pressed
document.addEventListener("keydown", startGame);
canvas.addEventListener("touchstart", handleTouchStart, false);
canvas.addEventListener("touchmove", handleTouchMove, false);

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

function handleTouchStart(event) {
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
}

function handleTouchMove(event) {
    if (!gameStarted) return;
    event.preventDefault();
    const touch = event.touches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0 && direction !== "LEFT") direction = "RIGHT";
        else if (deltaX < 0 && direction !== "RIGHT") direction = "LEFT";
    } else {
        if (deltaY > 0 && direction !== "UP") direction = "DOWN";
        else if (deltaY < 0 && direction !== "DOWN") direction = "UP";
    }
}

function draw() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Draw snake
    ctx.fillStyle = "green";
    snake.forEach((segment, index) => {
        ctx.fillRect(segment.x, segment.y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(segment.x, segment.y, box, box);
        if (index === 0) {
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(segment.x + box / 2, segment.y + box / 2, box / 5, 0, Math.PI * 2);
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
