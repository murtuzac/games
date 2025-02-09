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

// Start the game on key press
document.addEventListener("keydown", (event) => {
    if (!gameStarted) {
        gameStarted = true;
        gameInterval = setInterval(draw, 150);
    }
    handleDirection(event.keyCode);
});

// Handle on-screen button presses
function changeDirection(dir) {
    if (dir === "LEFT" && direction !== "RIGHT") direction = "LEFT";
    if (dir === "UP" && direction !== "DOWN") direction = "UP";
    if (dir === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
    if (dir === "DOWN" && direction !== "UP") direction = "DOWN";
}

// Handle keyboard input
function handleDirection(keyCode) {
    if (keyCode === 37) changeDirection("LEFT");
    if (keyCode === 38) changeDirection("UP");
    if (keyCode === 39) changeDirection("RIGHT");
    if (keyCode === 40) changeDirection("DOWN");
}

// Draw the game
function draw() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Draw snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "black" : "green";
        ctx.fillRect(segment.x, segment.y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(segment.x, segment.y, box, box);

        // Draw snake head eyes
        if (index === 0) {
            ctx.fillStyle = "green";
            ctx.beginPath();
            ctx.arc(segment.x + 6, segment.y + 6, 3, 0, Math.PI * 2);
            ctx.arc(segment.x + 14, segment.y + 6, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    // Move snake
    let newX = snake[0].x;
    let newY = snake[0].y;

    if (direction === "LEFT") newX -= box;
    if (direction === "UP") newY -= box;
    if (direction === "RIGHT") newX += box;
    if (direction === "DOWN") newY += box;

    // Check collision with food
    if (newX === food.x && newY === food.y) {
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    // Check collision with walls or itself
    if (
        newX < 0 || newY < 0 || newX >= canvas.width || newY >= canvas.height ||
        snake.some(segment => segment.x === newX && segment.y === newY)
    ) {
        clearInterval(gameInterval);
        gameOver = true;
        showGameOver();
        return;
    }

    // Add new head
    snake.unshift({ x: newX, y: newY });
}

// Show Game Over
function showGameOver() {
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", canvas.width / 4, canvas.height / 2);
    document.getElementById("retryBtn").style.display = "inline-block";
}

// Restart game
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

// Run initial draw
window.onload = function () {
    draw();
};
